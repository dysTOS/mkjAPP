import { AuthStateService } from './../auth-state.service';
import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpStatusCode } from "@angular/common/http";
import { TokenService } from "../token.service";
import { catchError, map } from "rxjs/operators";
import { Observable, throwError } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private tokenService: TokenService, private authStateService: AuthStateService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const accessToken = this.tokenService.getToken();
        req = req.clone({
            setHeaders: {
                Authorization: "Bearer " + accessToken
            }
        });
        return next.handle(req).pipe(
            map((event: HttpEvent<any>) => {
                return event;
            }),
            catchError(
                (
                    httpErrorResponse: HttpErrorResponse,
                    _: Observable<HttpEvent<any>>
                ) => {
                    if (httpErrorResponse.status === HttpStatusCode.Unauthorized) {
                        this.authStateService.setAuthState(false);
                    }
                    return throwError(httpErrorResponse);
                }))
    }
}
