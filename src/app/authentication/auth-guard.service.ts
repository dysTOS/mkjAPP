import { AuthStateService } from "./auth-state.service";
import { TokenService } from "./token.service";
import { Injectable } from "@angular/core";
import { Router, CanActivate, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { ThemeService } from "../mkjServices/theme.service";

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(
        private tokenService: TokenService,
        private router: Router,
        private authStateService: AuthStateService,
        private themeService: ThemeService
    ) {}

    canActivate(): boolean | UrlTree | Observable<boolean> {
        if (!this.tokenService.isLoggedIn()) {
            this.authStateService.setAuthState(false);
            return this.router.parseUrl("/login");
        }

        return true;
    }
}
