import { environment } from "./../environments/environment";
import { Component, OnInit } from "@angular/core";
import { AppComponent } from "./app.component";
import { AppMainComponent } from "./app.main.component";
import { MenuLabels } from "./mkjInterfaces/Menu";
import { AuthStateService } from "./authentication/auth-state.service";
import { UserService } from "./authentication/user.service";
import { ThemeService } from "./mkjServices/theme.service";

@Component({
    selector: "app-sidebar",
    templateUrl: "./app.sidebar.component.html",
})
export class AppSideBarComponent implements OnInit {
    public MenuLabels = MenuLabels;

    public isDevEnvironment = !environment.production;

    constructor(
        public app: AppComponent,
        public appMain: AppMainComponent,
        public themeService: ThemeService,
        private authStateService: AuthStateService,
        public userService: UserService
    ) {}

    ngOnInit(): void {}

    public logout() {
        this.authStateService.setAuthState(false);
    }

    public reloadApp() {
        window.location.reload();
    }
}
