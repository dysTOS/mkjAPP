import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from '../auth-state.service';
import { AuthService } from '../auth.service';
import { TokenService } from '../token.service';
import { LoginCredentials } from '../User';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    submitted: boolean = false;
    isChecking: boolean = false;

    user: LoginCredentials = {
        email: null,
        passwort: null
    }

    constructor(public router: Router,
        public authService: AuthService,
        private tokenService: TokenService,
        private authState: AuthStateService,
        private userService: UserService) { }

    ngOnInit(): void {
    }
    onSubmit() {
        this.submitted = true;
        if (this.checkInput()) {
            this.isChecking = true;
            this.authService.login(this.user).subscribe(
                result => {
                    this.tokenService.saveToken(result.token);
                    this.authState.setAuthState(true);
                    this.userService.setCurrentUser(result.user);
                    this.userService.setCurrentUserRoles(result.roles);
                    this.router.navigate(['']);
                },
                error => {
                    console.log(error), this.isChecking = false
                },
                () => this.isChecking = false
            );
        }
    }

    checkInput(): boolean {
        if (this.user.email && this.user.passwort) return true;
        return false;
    }
}
