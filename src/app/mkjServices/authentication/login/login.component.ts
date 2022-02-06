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
    submitted: boolean = false;

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
        this.submitted = true;
        if (this.checkInput()) {
            this.authService.login(this.user).subscribe(
                result => {
                    this.tokenService.saveToken(result.token);
                    this.authState.setAuthState(true);
                    this.router.navigate(['']);
                },
                error => {
                    console.log(error);
                }
            );
        }
    }

    checkInput(): boolean {
        if (this.user.name && this.user.email && this.user.passwort) return true;
        return false;
    }
}
