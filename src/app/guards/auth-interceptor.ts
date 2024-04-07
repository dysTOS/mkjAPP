import { AuthStateService } from '../services/authentication/auth-state.service';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { TokenService } from '../services/authentication/token.service';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { InfoService } from 'src/app/services/info.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private tokenService: TokenService,
    private authStateService: AuthStateService,
    private infoService: InfoService
  ) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler) {
    const accessToken = this.tokenService.getToken();
    if (!req.headers.has('Authorization') && accessToken) {
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + accessToken,
        },
      });
    }
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((httpErrorResponse: HttpErrorResponse, _: Observable<HttpEvent<any>>) => {
        if (httpErrorResponse.status === HttpStatusCode.Unauthorized) {
          if (!this.tokenService.isLoggedIn() && req.headers.has('Authorization')) {
            setTimeout(() => this.infoService.info('Sitzung abgelaufen/ungültig!'), 1000);
          }
          this.authStateService.setAuthState(false);
        }
        return throwError(() => httpErrorResponse);
      })
    );
  }
}
