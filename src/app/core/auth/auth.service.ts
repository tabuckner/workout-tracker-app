import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { AuthResponse } from './AuthData.model';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private cachedRequests: Array<HttpRequest<any>> = [];
  private baseUrl: string = 'http://localhost:3000/api'; // TODO: Move to env var.
  private userId: string;
  private isAuthenticated = false;
  private tokenExpired = false; // FIXME: Use JWT refreshes.
  private refreshTokenExpired = false;
  private refreshTokenPeriod = 7; // # of Days FIXME: Don't Hardcode this. Put in auth response.
  private token: string;
  private authStatusListener = new Subject<boolean>();
  private tokenTimer: NodeJS.Timer;
  private tokenWarningTimer: NodeJS.Timer;
  private refreshTokenDate: Date;

  constructor(
    private http: HttpClient,
    private router: Router,
    private snacks: MatSnackBar
  ) { }

  getToken() {
    if (this.token) {
      return this.token;
    } else {
      return localStorage.getItem('token');
    }
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  getTokenExpired() {
    return this.tokenExpired;
  }

  getRefreshTokenExpired() {
    this.setRefreshTokenExpired();
    return this.refreshTokenExpired;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getUserId() {
    return this.userId;
  }

  collectFailedRequest(request: HttpRequest<any>) { // TODO: Remove if we dont use.
    this.cachedRequests.push(request);
  }

  createUser(email: string, password: string) {
    // Some Shit...
  }

  logIn(email: string, password: string) {
    const endpoint = `${this.baseUrl}/users/login`;
    const creds = { email, password };
    this.http
      .post<{ message: string, token: string, refreshToken: string, expiresIn: number, userId: string }>(endpoint, creds)
      .subscribe(response => {
        if (response.token) {
          const message = response.message;
          this.showDialog(message);
          this.setAuthData(response);
          this.setAuthTimer(response);
          this.setAuthWarningTimer(5, response);
          this.setRefreshTokenDate();
          this.isAuthenticated = true;
          this.tokenExpired = false;
          this.authStatusListener.next(true); // Notify observers.
          this.storeAuthData(response);
          this.router.navigate(['/']); // TODO: Research if this is what we want for the UX.
        }
      }, error => {
        this.authStatusListener.next(false) // Notify observers.
      });
  }

  logOut() {
    this.authStatusListener.next(false);
    this.clearAuthData();
    this.router.navigate(['/']);
    clearTimeout(this.tokenTimer);
    const message = 'Successfully logged out.';
    this.showDialog(message);
  }

  refreshTokens(): Observable<any> {
    const endpoint = `${this.baseUrl}/users/refresh`;
    const expiredToken = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken || !expiredToken) {
      return;
    }
    const body = { refreshToken };
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${expiredToken}`);
    this.http.post<{ message: string, token: string, refreshToken: string, expiresIn: number, userId: string }>(endpoint, body, { headers })
      .subscribe(response => {
        if (response.token) {
          this.setNewTokens(response)
        } else {
          const message = 'Unable to re-authenticate automatically due to session inactivity. Please log in from the menu.';
          this.showDialog(message, 5);
        }
      });
  }

  setNewTokens(response: AuthResponse) {
    console.log('Setting new Auth Tokens');
    const message = response.message;
    this.showDialog(message);
    this.setAuthData(response);
    this.setAuthTimer(response);
    this.setAuthWarningTimer(5, response);
    this.setRefreshTokenDate();
    this.isAuthenticated = true;
    this.tokenExpired = false;
    this.authStatusListener.next(true); // Notify observers.
    this.storeAuthData(response);
  }

  promptExpiredToken() {
    this.tokenExpired = true;
    const message = 'Your session expired. Please log in.';
    this.showDialog(message, 10000);
    clearTimeout(this.tokenTimer);
  }

  warnExpiredToken() {
    const message = 'Your session will expire soon. Please save any work.';
    this.showDialog(message, 10000);
    clearTimeout(this.tokenWarningTimer);
  }

  private setAuthTimer(response: AuthResponse, expiryTime?: number) {
    if (!expiryTime) {
      console.log('Expires in ', response.expiresIn * 1000);
      this.tokenTimer = setTimeout(() => {
        // this.logOut(); // FIXME: JWT Refreshes
        this.promptExpiredToken();
        console.log('expired');
      }, response.expiresIn * 1000); // Server returns an expiry *duration* of seconds (3600s => 1h)
    } else if (expiryTime) {
      this.tokenTimer = setTimeout(() => {
        this.logOut(); // FIXME: JWT Refreshes
        this.promptExpiredToken();
      }, expiryTime);
    }
  }

  private setAuthWarningTimer(warningWindowMin: number, response: AuthResponse, expiryTime?: number) {
    const warningDuration = warningWindowMin * 60000;
    if (!expiryTime) {
      this.tokenWarningTimer = setTimeout(() => {
        this.warnExpiredToken();
      }, (response.expiresIn * 1000) - warningDuration); // Server returns an expiry *duration* of seconds (3600s => 1h)
    } else if (expiryTime) {
      this.tokenWarningTimer = setTimeout(() => {
        this.warnExpiredToken();
      }, expiryTime - warningDuration);
    }
  }

  private setRefreshTokenDate() {
    this.refreshTokenDate = new Date();
    this.refreshTokenDate.setDate(this.refreshTokenDate.getDate() + this.refreshTokenPeriod);
    console.log(this.refreshTokenDate);
  }

  private setAuthData(response: AuthResponse) {
    this.userId = response.userId;
    this.token = response.token
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token && !expiration) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expiration),
      userId: userId,
    };
  }

  private storeAuthData(response: AuthResponse) {
    const now = new Date();
    const expirationDate = new Date(now.getTime() + response.expiresIn * 1000);
    localStorage.setItem('token', response.token);
    localStorage.setItem('refreshToken', response.refreshToken);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', response.userId);
  }

  private clearAuthData() {
    this.token = null;
    this.isAuthenticated = false;
    this.userId = null; // A Magick Buff Expires
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  public checkAuthData() { // TODO: Reorder public/private
    const storedAuthData = this.getAuthData();
    if (!storedAuthData) {
      return;
    }
    const now = new Date();
    const expiresIn = storedAuthData.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = storedAuthData.token;
      this.userId = storedAuthData.userId;
      this.setAuthTimer(null, expiresIn);
      this.setAuthWarningTimer(5, null, expiresIn);
      const sessionExpiresMinutes = expiresIn / 1000 / 60;
      const message = `Your session will expire in roughly ${Math.floor(sessionExpiresMinutes) - 5} minutes.`;
      setTimeout(() => {
        this.authStatusListener.next(true); // TODO: Why do I have to wait for this next call to work?
        this.showDialog(message, 3000)
      }, 3000)
    } else if (this.getRefreshTokenExpired() === false){
      this.tokenExpired = true;
      const message = 'Your session token has expired. Attempting to refresh.';
      setTimeout(() => {
        this.showDialog(message, 3000);
      });
      this.refreshTokens();
    }
  }

  public setRefreshTokenExpired() {
    const now = new Date();
    this.refreshTokenExpired = now > this.refreshTokenDate;
  }

  private showDialog(message: string, duration: number = 1500) {
    this.snacks.open(message, 'Dismiss', { duration: duration });
  }
}
