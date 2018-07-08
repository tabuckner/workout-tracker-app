import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { throwError } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let oldHeaderToken: string;
    const isQuote = req.url.includes('random-quote-generator');
    const isImage = req.url.includes('unsplash');
    const tokenIsExpired = this.auth.getTokenExpired();
    const refreshIsExpired = this.auth.getRefreshTokenExpired();

    if (isQuote || isImage) {
      return next.handle(req);
    }
    if (!refreshIsExpired) {
      const authToken = this.auth.getToken();
      oldHeaderToken = authToken;
      const authRequest = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`)
      });
      return next.handle(authRequest);
    } else {
      // TODO: Throw a modal prompting a login and do not lose state.
      return throwError(new Error('Request not completed. Your login has expired.'));
    }
  }
}
