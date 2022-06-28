import { environment } from "./../environments/environment";
import { UserService } from "src/app/mkjServices/authentication/user.service";
import { Component, OnInit } from "@angular/core";
import { AppComponent } from "./app.component";
import { AppMainComponent } from "./app.main.component";
import { AuthStateService } from "./mkjServices/authentication/auth-state.service";
import { MenuLabels } from "./mkjInterfaces/Menu";

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
