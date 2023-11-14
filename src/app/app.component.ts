import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { PrimeNGConfig } from "primeng/api";
import { MkjPrimeTranslation } from "src/configurations/primeTranslation";
import { AuthStateService } from "./services/authentication/auth-state.service";
import { TokenService } from "./services/authentication/token.service";
import { UserService } from "./services/authentication/user.service";
import { ThemeService } from "./services/theme.service";
import { AppConfigService } from "./services/app-config.service";

@Component({
    selector: "app-root",
    template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
    ripple = true;

    constructor(
        private themeService: ThemeService,
        private primengConfig: PrimeNGConfig,
        private authStatService: AuthStateService,
        private router: Router,
        private userService: UserService,
        private tokenService: TokenService,
        private configService: AppConfigService
    ) {
        this.authStatService.userAuthState.subscribe((isAuthenticated) => {
            if (!isAuthenticated && this.tokenService.isLoggedIn()) {
                this.userService.onLogout();
                this.tokenService.removeToken();
                this.router.navigate(["login"]);
            }
        });

        this.primengConfig.ripple = true;
        this.primengConfig.setTranslation(MkjPrimeTranslation);
    }
}
