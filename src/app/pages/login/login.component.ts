import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { AuthStateService } from "src/app/services/authentication/auth-state.service";
import { AuthAPIService } from "src/app/services/api/auth-api.service";
import { TokenService } from "src/app/services/authentication/token.service";
import { UserService } from "src/app/services/authentication/user.service";
import { InfoService } from "src/app/services/info.service";
import { UserLoginInput } from "src/app/interfaces/api-middleware";
import { TestScheduler } from "rxjs/testing";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
    submitted: boolean = false;
    isChecking: boolean = false;

    user: UserLoginInput = {
        email: null,
        passwort: null,
    };

    constructor(
        private router: Router,
        private authService: AuthAPIService,
        private tokenService: TokenService,
        private authState: AuthStateService,
        private userService: UserService,
        private infoService: InfoService
    ) {}

    public ngOnInit(): void {
        if (environment.publictest) {
            this.user = {
                email: "testuser@test.at",
                passwort: "test",
            };
        }
    }

    public onSubmit() {
        this.submitted = true;
        if (this.checkInput()) {
            this.isChecking = true;
            this.authService.login(this.user).subscribe(
                (result) => {
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
