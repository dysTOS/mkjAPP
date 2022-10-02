import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoginCredentials } from "../../interfaces/User";
import { environment } from "src/environments/environment";
import { AuthStateService } from "src/app/services/authentication/auth-state.service";
import { AuthService } from "src/app/services/authentication/auth.service";
import { TokenService } from "src/app/services/authentication/token.service";
import { UserService } from "src/app/services/authentication/user.service";
import { InfoService } from "src/app/services/info.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
    submitted: boolean = false;
    isChecking: boolean = false;

    user: LoginCredentials = {
        email: null,
        passwort: null,
    };

    constructor(
        private router: Router,
        private authService: AuthService,
        private tokenService: TokenService,
        private authState: AuthStateService,
        private userService: UserService,
        private infoService: InfoService
    ) {}

    ngOnInit(): void {}

    onSubmit() {
        this.submitted = true;
        if (this.checkInput()) {
            this.isChecking = true;
            this.authService.login(this.user).subscribe(
                (result) => {
                    console.log(result);
                    this.tokenService.saveToken(result.token);
                    this.authState.setAuthState(true);
                    this.userService.setCurrentUser(result.user);
                    this.userService.setCurrentMitglied(result.mitglied);
                    this.userService.setCurrentUserRoles(result.roles);
                    this.userService.setCurrentUserPermissions(
                        result.permissions
                    );
                    this.router.navigate([environment.prefix, "dashboard"]);
                },
                (error) => {
                    this.infoService.error(error);
                    this.isChecking = false;
                },
                () => (this.isChecking = false)
            );
        }
    }

    checkInput(): boolean {
        if (this.user.email && this.user.passwort) return true;
        return false;
    }
}
