import { AuthStateService } from './auth-state.service';
import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(private tokenService: TokenService,
        private router: Router,
        private authStateService: AuthStateService) { }

    canActivate(): boolean {
        if (!this.tokenService.isLoggedIn()) {
            this.authStateService.setAuthState(false)
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }
}
