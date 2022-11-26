import { Component, OnInit } from "@angular/core";
import { AppMainComponent } from "./app.main.component";
import { MenuLabels, MenuService } from "./services/menu.service";

@Component({
    selector: "app-topbar",
    template: `
        <div class="topbar clearfix">
            <div class="logo">
                <a routerLink="/">
                    <img src="assets/mkjICONS/LOGO_APP_Favicon.png" />
                </a>
            </div>

            <div class="app-name font-bold" style="color: white">
                <h3>mkjAPP</h3>
            </div>

            <a
                id="topbar-menu-button"
                href="#"
                (click)="appMain.onTopbarMenuButtonClick($event)"
            >
                <i class="pi pi-bars"></i>
            </a>

            <p-sidebar
                [(visible)]="appMain.topbarMenuActive"
                position="right"
                [autoZIndex]="false"
                [modal]="false"
            >
                <ul
                    class="topbar-menu fadeInDown"
                    [ngClass]="{
                        'topbar-menu-visible': appMain.topbarMenuActive
                    }"
                >
                    <ng-container *ngFor="let menuItem of menuService.MainMenu">
                        <li
                            *ngIf="menuItem.visible"
                            [ngClass]="{
                                'active-topmenuitem':
                                    appMain.activeTabIndex ===
                                    menuItem.enumLabel
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
                                    <li
                                        *ngIf="childItem.visible"
                                        role="menuitem"
                                    >
                                        <a
                                            [routerLink]="childItem.routerLink"
                                            [routerLinkActive]="
                                                'topbar-active-child-menu-item'
                                            "
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
                </ul>
            </p-sidebar>
        </div>
    `,
    styles: [
        `
            p-sidebar ::ng-deep .p-sidebar-content {
                padding: 0;
                height: 100%;
            }
        `,
    ],
})
export class AppTopbarComponent implements OnInit {
    public readonly MenuLabels = MenuLabels;

    constructor(
        public appMain: AppMainComponent,
        public menuService: MenuService
    ) {}

    public ngOnInit(): void {}
}
