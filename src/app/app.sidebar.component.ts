import { Component, OnInit } from "@angular/core";
import { AppComponent } from "./app.component";
import { AppMainComponent } from "./app.main.component";
import { AuthStateService } from "./authentication/auth-state.service";
import { UserService } from "./authentication/user.service";
import { ThemeService } from "./mkjServices/theme.service";
import { MenuLabels, MenuService } from "./app.menu.service";

@Component({
    selector: "app-sidebar",
    templateUrl: "./app.sidebar.component.html",
})
export class AppSideBarComponent implements OnInit {
    public readonly MenuLabels = MenuLabels;

    constructor(
        public app: AppComponent,
        public appMain: AppMainComponent,
        public themeService: ThemeService,
        private authStateService: AuthStateService,
        public userService: UserService,
        public menuService: MenuService
    ) {}

    ngOnInit(): void {}
}
