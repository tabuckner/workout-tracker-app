import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const isExpired = this.auth.getTokenExpired();
    console.log(isExpired);

    // if (!isExpired) {
      const authToken = this.auth.getToken();
      const authRequest = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`)
      });
      return next.handle(authRequest);
    // } else {
    //   // TODO: Throw a modal prompting a login and do not lose state.
    //   return Observable.throw('Request not completed. Your login has expired.');
    // }
  }
}
