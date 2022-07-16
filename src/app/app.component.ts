import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PrimeNGConfig } from "primeng/api";
import { MkjPrimeTranslation } from "src/app/mkjUtilities/primeTranslation";
import { AuthStateService } from "./authentication/auth-state.service";
import { AuthService } from "./authentication/auth.service";
import { TokenService } from "./authentication/token.service";
import { UserService } from "./authentication/user.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
    isSignedIn: boolean;
    ripple = true;

    constructor(
        private primengConfig: PrimeNGConfig,
        private authStatService: AuthStateService,
        private router: Router,
        private userService: UserService,
        private authService: AuthService,
        private tokenService: TokenService
    ) {}

    public ngOnInit() {
        this.authStatService.userAuthState.subscribe((val) => {
            if (!val && this.tokenService.isLoggedIn()) {
                this.userService.onLogout();
                this.tokenService.removeToken();
                this.router.navigate(["login"]);
            }
        });

        this.primengConfig.ripple = true;
        this.primengConfig.setTranslation(MkjPrimeTranslation);
        this.checkFetchUser();
    }

    private checkFetchUser() {
        if (!this.userService.isSet()) {
            this.authService.getCurrentUser().subscribe((result) => {
                this.userService.setCurrentUser(result.user),
                    this.userService.setCurrentMitglied(result.mitglied),
                    this.userService.setCurrentUserRoles(result.roles),
                    this.userService.setCurrentUserPermissions(
                        result.permissions
                    );
            });
        }
    }
}
