import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthResponse } from './AuthData.model';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = 'http://localhost:3000/api'; // TODO: Move to env var.
  private userId: string;
  private isAuthenticated = false;
  private tokenExpired = false; // FIXME: Use JWT refreshes.
  private token: string;
  private authStatusListener = new Subject<boolean>();
  private tokenTimer: NodeJS.Timer;

  constructor(
    private http: HttpClient,
    private router: Router,
    private snacks: MatSnackBar
  ) { }

  getToken() {
    return this.token;
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  getTokenExpired() {
    return this.tokenExpired;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getUserId() {
    return this.userId;
  }

  createUser(email: string, password: string) {
    // Some Shit...
  }

  logIn(email: string, password: string) {
    const creds = { email, password };
    this.http
      .post<{ message: string, token: string, expiresIn: number, userId: string }>(`${this.baseUrl}/users/login`, creds)
      .subscribe(response => {
        if (response.token) {
          const message = response.message;
          this.showDialog(message);
          this.setAuthData(response);
          this.setAuthTimer(response);
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

  promptExpiredToken() {
    this.tokenExpired = true;
    const message = 'Your session expired. Please log in.';
    this.showDialog(message, 10000);
    clearTimeout(this.tokenTimer);
  }

  private setAuthTimer(response: AuthResponse) {
    this.tokenTimer = setTimeout(() => {
      this.logOut(); // FIXME: JWT Refreshes
      this.promptExpiredToken();
      }, response.expiresIn * 1000); // Server returns an expiry *duration*
    }

  private setAuthData(response: AuthResponse) {
    this.userId = response.userId;
    this.token = response.token
  }

  private storeAuthData(response: AuthResponse) {
    const now = new Date();
    const expirationDate = new Date(now.getTime() + response.expiresIn * 1000);
    localStorage.setItem('token', response.token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', response.userId);
  }

  private clearAuthData() {
    this.token = null;
    this.isAuthenticated = false;
    this.userId = null; // A Magick Buff Expires
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  private showDialog(message: string, duration: number = 1500) {

    this.snacks.open(message, 'Dismiss', { duration: duration });
  }
}
