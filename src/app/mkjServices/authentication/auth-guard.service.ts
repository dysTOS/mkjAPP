import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(public tokenService: TokenService, public router: Router) { }

    canActivate(): boolean {
        if (!this.tokenService.isLoggedIn()) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }
}
