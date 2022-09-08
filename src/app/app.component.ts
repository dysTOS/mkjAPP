import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { PrimeNGConfig } from "primeng/api";
import { MkjPrimeTranslation } from "src/app/utilities/primeTranslation";
import { AuthStateService } from "./services/authentication/auth-state.service";
import { TokenService } from "./services/authentication/token.service";
import { UserService } from "./services/authentication/user.service";

@Component({
    selector: "app-root",
    template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
    ripple = true;

    constructor(
        private primengConfig: PrimeNGConfig,
        private authStatService: AuthStateService,
        private router: Router,
        private userService: UserService,
        private tokenService: TokenService
    ) {
        this.authStatService.userAuthState.subscribe((val) => {
            if (!val && this.tokenService.isLoggedIn()) {
                this.userService.onLogout();
                this.tokenService.removeToken();
                this.router.navigate(["login"]);
            }
        });

        this.primengConfig.ripple = true;
        this.primengConfig.setTranslation(MkjPrimeTranslation);
    }
}
