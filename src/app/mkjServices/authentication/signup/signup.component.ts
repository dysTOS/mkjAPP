import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../auth.service';
import { RegistrationCredentials } from '../../../mkjInterfaces/User';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    submitted: boolean = false;
    isChecking: boolean = false;
    pwdCheck: string = null;

    user: RegistrationCredentials = {
        vorname: null,
        zuname: null,
        email: null,
        passwort: null
    }

    constructor(
        private router: Router,
        private authService: AuthService,
        private messageService: MessageService
    ) { }

    ngOnInit() { }

    onSubmit() {
        this.submitted = true;
        if (this.checkInput()) {
            this.isChecking = true;
            this.authService.register(this.user).subscribe(
                result => {
                    this.messageService.add(
                        {
                            severity: 'success', summary: result.message,
                            life: 3000
                        });
                    setTimeout(() => this.router.navigate(['login']), 2000);
                },
                error => {
                    this.messageService.add(
                        {
                            severity: 'error', summary: 'Fehler',
                            detail: error.error.message, life: 2000
                        }),
                        this.isChecking = false
                }
            )
        }
    }

    private checkInput(): boolean {
        if (this.user.email && this.user.passwort && this.pwdCheck
            && this.user.vorname && this.user.zuname) {
            if (this.user.passwort !== this.pwdCheck) {
                this.user.passwort = null;
                this.pwdCheck = null;
                this.messageService.add({
                    severity: 'error', summary: "Fehler",
                    detail: "Passwörter stimmen nicht überein!", life: 5000
                });
                return false;
            }
            return true;
        } else
            return false;
    }

}
