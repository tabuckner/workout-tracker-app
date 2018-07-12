import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { throwError, Observable } from "rxjs";
import { catchError, mergeMap } from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  maxRetryAttempts = 3;
  attemptCount = 0;

  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    const isQuote = req.url.includes('random-quote-generator');
    const isImage = req.url.includes('unsplash');
    const refreshIsExpired = this.auth.getRefreshTokenExpired();

    if (isQuote || isImage) {
      return next.handle(req);
    }
    if (!refreshIsExpired) {
      return next.handle(this.addHeaderToken(req, this.auth.getToken())).pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse && error.status === 401 && this.canRetry) {
            this.attemptCount++;
            return this.auth.getRefreshedTokens().pipe(
              mergeMap((response) => {
                if (response) {
                  this.auth.setNewTokens(response);
                  const authReqRepeat = this.addHeaderToken(req, response.token)
                  console.warn('Repeating request', authReqRepeat);
                  return next.handle(authReqRepeat);
                } else {
                  return throwError(new Error('There was an issue with your request. Please try logging in again.'));
                }
              })
            )
          } else if (!this.canRetry) {
            this.attemptCount = 0;
            return throwError(new Error('Max retry attempts achieved. Please try logging in again.'))
          }
          // Catch all
          return throwError(error);
        }),
      )
    } else {
      // TODO: Throw a modal prompting a login and do not lose state.
      return throwError(new Error('Request not completed. Your login has expired.'));
    }
  }

  addHeaderToken(req: HttpRequest<any>, headerToken): HttpRequest<any> {
    return req.clone({
      headers: req.headers.set('Authorization', `Bearer ${headerToken}`)
    });
  }

  get canRetry() {
    return this.attemptCount <= this.maxRetryAttempts;
  }

}
