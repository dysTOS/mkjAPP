import { User } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from '../auth-state.service';
import { AuthService } from '../auth.service';
import { TokenService } from '../token.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    user: User = {
        name: null,
        email: null,
        passwort: null
    }

    constructor(public router: Router,
        public authService: AuthService,
        private tokenService: TokenService,
        private authState: AuthStateService,) { }

    ngOnInit(): void {
    }
    onSubmit() {
        this.authService.login(this.user).subscribe(
            result => {
                this.responseHandler(result);
            },
            error => {
                console.log(error);
            }, () => {
                this.authState.setAuthState(true);
                this.router.navigate(['']);
            }
        );
    }

    // Handle response
    responseHandler(data) {
        this.tokenService.saveToken(data.token);
    }
}
