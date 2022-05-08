import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from '../auth-state.service';
import { AuthService } from '../auth.service';
import { TokenService } from '../token.service';
import { LoginCredentials } from '../../../mkjInterfaces/User';
import { MessageService } from 'primeng/api';

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

    constructor(private router: Router,
        private authService: AuthService,
        private tokenService: TokenService,
        private authState: AuthStateService,
        private userService: UserService,
        private messageService: MessageService) { }

    ngOnInit(): void { }

    onSubmit() {
        this.submitted = true;
        if (this.checkInput()) {
            this.isChecking = true;
            this.authService.login(this.user).subscribe(
                result => {
                    console.log(result)
                    this.tokenService.saveToken(result.token);
                    this.authState.setAuthState(true);
                    this.userService.setCurrentUser(result.user);
                    this.userService.setCurrentMitglied(result.mitglied);
                    this.userService.setCurrentUserRoles(result.roles);
                    this.router.navigate(['']);
                },
                error => {
                    this.messageService.add(
                        {
                            severity: 'error', summary: "Fehler",
                            detail: error.error.message, life: 3000
                        }), this.isChecking = false
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
