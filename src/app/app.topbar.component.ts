import { Component, OnInit } from "@angular/core";
import { AppMainComponent } from "./app.main.component";
import { environment } from "src/environments/environment";
import { AuthStateService } from "./authentication/auth-state.service";
import { MenuLabels, MenuService } from "./app.menu.service";

@Component({
    selector: "app-topbar",
    template: `
        <div class="topbar clearfix">
            <div class="logo">
                <a href="">
                    <img src="assets/mkjICONS/LOGO_APP_Favicon.png" />
                </a>
            </div>

            <div class="app-name p-text-bold" style="color: white">
                <h3>mkjAPP</h3>
            </div>

            <a
                id="topbar-menu-button"
                href="#"
                (click)="appMain.onTopbarMenuButtonClick($event)"
            >
                <i class="pi pi-bars"></i>
            </a>

            <ul
                class="topbar-menu fadeInDown"
                [ngClass]="{ 'topbar-menu-visible': appMain.topbarMenuActive }"
            >
                <ng-container *ngFor="let menuItem of menuService.MainMenu">
                    <li
                        *ngIf="menuItem.visible"
                        [ngClass]="{
                            'active-topmenuitem':
                                appMain.activeTabIndex === menuItem.enumLabel
                        }"
                    >
                        <a
                            [routerLink]="menuItem.routerLink"
                            (click)="
                                menuItem.command
                                    ? menuItem.command()
                                    : appMain.onTopbarItemClick(
                                          $event,
                                          menuItem.enumLabel,
                                          menuItem.children ? true : false
                                      )
                            "
                        >
                            <i [class]="'topbar-icon ' + menuItem.icon"></i>
                            <span class="topbar-item-name">{{
                                menuItem.label
                            }}</span>
                        </a>
                        <ul *ngIf="menuItem.children" class="fadeInDown">
                            <ng-container
                                *ngFor="let childItem of menuItem.children"
                            >
                                <li *ngIf="childItem.visible" role="menuitem">
                                    <a
                                        [routerLink]="childItem.routerLink"
                                        (click)="
                                            childItem.command
                                                ? childItem.command()
                                                : appMain.onTopbarSubItemClick(
                                                      $event
                                                  )
                                        "
                                    >
                                        <i [class]="childItem.icon"></i>
                                        <span>{{ childItem.label }}</span>
                                    </a>
                                </li>
                            </ng-container>
                        </ul>
                    </li>
                </ng-container>

                <!-- <li #search class="search-item" [ngClass]="{'active-topmenuitem':appMain.activeTopbarItem === search}"
                    (click)="appMain.onTopbarItemClick($event,search)">
                        <span class="p-input-icon-right">
                            <input type="text" pInputText placeholder="Search">
                            <i class="topbar-icon pi pi-search"></i>
                        </span>
                </li> -->
            </ul>
        </div>
    `,
})
export class AppTopbarComponent implements OnInit {
    public sidebarVisible: boolean = false;
    public readonly MenuLabels = MenuLabels;

    public isDevEnvironment = !environment.production;

    constructor(
        public appMain: AppMainComponent,
        private authStateService: AuthStateService,
        public menuService: MenuService
    ) {}

    ngOnInit(): void {}

    public logout() {
        this.authStateService.setAuthState(false);
    }

    public reloadApp() {
        window.location.reload();
    }
}
