import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenManagerService } from './token-manager.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private tokenManagerService: TokenManagerService ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.tokenManagerService.IsAuthorized) {
      const cloned = req.clone({
          headers: req.headers.set('Authorization', 'Token ' + this.tokenManagerService.Token)
      });

      return next.handle(cloned);
  }
  return next.handle(req);
  }
}
