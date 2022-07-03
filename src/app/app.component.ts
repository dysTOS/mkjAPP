import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SwUpdate, SwPush } from "@angular/service-worker";
import { PrimeNGConfig } from "primeng/api";
import { MkjPrimeTranslation } from "src/assets/mkjTranslations/primeTranslation";
import { AuthStateService } from "./authentication/auth-state.service";
import { AuthService } from "./authentication/auth.service";
import { TokenService } from "./authentication/token.service";
import { UserService } from "./authentication/user.service";
import { InfoService } from "./mkjServices/info.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
    isSignedIn: boolean;

    layoutMode = "static";

    darkMenu = false;

    inputStyle = "outlined";

    ripple = true;

    compactMode = false;

    readonly VAPID_PUBLIC_KEY =
        "BLBx-hf2WrL2qEa0qKb-aCJbcxEvyn62GDTyyP9KTS5K7ZL0K7TfmOKSPqp8vQF0DaG8hpSBknz_x3qf5F4iEFo";

    constructor(
        private primengConfig: PrimeNGConfig,
        private authStatService: AuthStateService,
        private router: Router,
        private userService: UserService,
        private authService: AuthService,
        private tokenService: TokenService,
        private swUpdate: SwUpdate,
        private swPush: SwPush,
        private infoService: InfoService
    ) {
        this.swUpdate.versionUpdates.subscribe((update) => {
            if (update.type === "VERSION_DETECTED") {
                if (confirm("UPDATE! Die mkjAPP wird kurz neu geladen...")) {
                    setTimeout(
                        () => this.infoService.info("Update erfolgreich!"),
                        2000
                    );
                    window.location.reload();
                }
            }
        });
        this.swPush
            .requestSubscription({
                serverPublicKey: this.VAPID_PUBLIC_KEY,
            })
            .then((sub) => console.log(sub))
            .catch((err) =>
                console.error("Could not subscribe to notifications", err)
            );
    }

    ngOnInit() {
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
        console.log("checkFetchUser(): invoke");
        if (!this.userService.isSet()) {
            console.log(
                "checkFetchUser(): notSet -> BackendCall getCurrentUser()"
            );
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
