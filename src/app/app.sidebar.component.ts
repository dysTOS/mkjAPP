import { Component, OnInit } from "@angular/core";
import { AppComponent } from "./app.component";
import { AppMainComponent } from "./app.main.component";
import { AuthStateService } from "./authentication/auth-state.service";
import { UserService } from "./authentication/user.service";
import { ThemeService } from "./mkjServices/theme.service";
import { MenuLabels, MenuService } from "./app.menu.service";

@Component({
    selector: "app-sidebar",
    template: `<div
        class="layout-sidebar"
        [ngStyle]="{ overflow: appMain.sidebarActive ? 'hidden' : 'visible' }"
        [ngClass]="{ 'layout-sidebar-dark': themeService.darkMode }"
        (click)="appMain.onSidebarClick($event)"
    >
        <div class="layout-tabmenu">
            <ul class="layout-tabmenu-nav">
                <ng-container *ngFor="let menuItem of menuService.MainMenu">
                    <li
                        *ngIf="menuItem.visible"
                        [ngClass]="{
                            'active-item':
                                appMain.activeTabIndex === menuItem.enumLabel
                        }"
                    >
                        <a
                            pRipple
                            [routerLink]="menuItem.routerLink"
                            class="tabmenuitem-link"
                            [pTooltip]="menuItem.label"
                            (click)="
                                menuItem.command
                                    ? menuItem.command()
                                    : appMain.onTabClick(
                                          $event,
                                          menuItem.enumLabel
                                      )
                            "
                            ><i [class]="menuItem.icon"></i
                        ></a>
                    </li>
                </ng-container>
            </ul>

            <!-- TABMENU CONTENTS ------------------------------------------------------------------------------------------------------------------>

            <div class="layout-tabmenu-contents">
                <ng-container *ngFor="let menuItem of menuService.MainMenu">
                    <div
                        *ngIf="menuItem.children && menuItem.visible"
                        class="layout-tabmenu-content"
                        [ngClass]="{
                            'layout-tabmenu-content-active':
                                appMain.activeTabIndex === menuItem.enumLabel
                        }"
                    >
                        <div class="layout-submenu-title clearfix">
                            <span>{{ menuItem.label }}</span>
                            <a
                                href="#"
                                class="menu-button pi pi-bars"
                                (click)="appMain.closeSidebar($event)"
                            ></a>
                        </div>
                        <app-sidebarTabContent>
                            <div class="menu-scroll-content">
                                <ul class="navigation-menu">
                                    <ng-container
                                        *ngFor="
                                            let childItem of menuItem.children
                                        "
                                    >
                                        <li *ngIf="childItem.visible">
                                            <a
                                                [routerLink]="
                                                    childItem.routerLink
                                                "
                                                [routerLinkActive]="
                                                    'menu-active-child-menu-item'
                                                "
                                                (click)="
                                                    childItem.command
                                                        ? childItem.command()
                                                        : null
                                                "
                                            >
                                                <i [class]="childItem.icon"></i>
                                                <span>{{
                                                    childItem.label
                                                }}</span>
                                            </a>
                                        </li></ng-container
                                    >
                                </ul>
                            </div>
                        </app-sidebarTabContent>
                    </div>
                </ng-container>
            </div>
        </div>
    </div> `,
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
