import { InfoService } from "../../mkjServices/info.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RegistrationCredentials } from "../../mkjInterfaces/User";
import { AuthService } from "src/app/mkjServices/authentication/auth.service";

@Component({
    selector: "app-signup",
    templateUrl: "./signup.component.html",
})
export class SignupComponent implements OnInit {
    submitted: boolean = false;
    isChecking: boolean = false;
    pwdCheck: string = null;

    user: RegistrationCredentials = {
        vorname: null,
        zuname: null,
        email: null,
        passwort: null,
    };

    constructor(
        private router: Router,
        private authService: AuthService,
        private infoService: InfoService
    ) {}

    ngOnInit() {}

    onSubmit() {
        this.submitted = true;
        if (this.checkInput()) {
            this.isChecking = true;
            this.authService.register(this.user).subscribe(
                (result) => {
                    this.infoService.success(result.message);
                    setTimeout(() => this.router.navigate(["login"]), 2000);
                },
                (error) => {
                    this.infoService.error(error);
                    this.isChecking = false;
                }
            );
        }
    }

    private checkInput(): boolean {
        if (
            this.user.email &&
            this.user.passwort &&
            this.pwdCheck &&
            this.user.vorname &&
            this.user.zuname
        ) {
            if (this.user.passwort !== this.pwdCheck) {
                this.user.passwort = null;
                this.pwdCheck = null;
                this.infoService.error("Passwörter stimmen nicht überein!");
                return false;
            }
            return true;
        } else return false;
    }
}
