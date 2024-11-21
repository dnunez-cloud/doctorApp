import { HttpRequest,
         HttpHandler,
         HttpEvent,
         HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService) {}
  intercept(request: HttpRequest<unknown>, next HttpHandler): Observable<HttpEvent<unknown>>{
    const authRequest = request.clone({
      setHeaders: {
        'Authorization': this.cookieService.get('Authorization')
      }
    })
    return next.handle(authRequest);
  }
}
