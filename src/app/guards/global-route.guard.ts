import { AuthStateService } from "../services/authentication/auth-state.service";
import { TokenService } from "../services/authentication/token.service";
import { Injectable } from "@angular/core";
import { Router, CanActivate, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class GlobalRouteGuard implements CanActivate {
    constructor(
        private tokenService: TokenService,
        private router: Router,
        private authStateService: AuthStateService
    ) {}

    canActivate(): boolean | UrlTree | Observable<boolean> {
        if (!this.tokenService.isLoggedIn()) {
            this.authStateService.setAuthState(false);
            return this.router.parseUrl("/login");
        }

        return true;
    }
}
