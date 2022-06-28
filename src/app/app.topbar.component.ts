import { MenuLabels } from "./mkjInterfaces/Menu";
import { Component, OnInit } from "@angular/core";
import { AppMainComponent } from "./app.main.component";
import { environment } from "src/environments/environment";
import { AuthStateService } from "./authentication/auth-state.service";

@Component({
    selector: "app-topbar",
    template: `
        <div class="topbar clearfix">
            <div class="logo">
                <a href="#">
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
                <li
                    [ngClass]="{
                        'active-topmenuitem':
                            appMain.activeTabIndex === MenuLabels.DASHBOARD
                    }"
                >
                    <a
                        routerLink=""
                        (click)="
                            appMain.onTopbarItemClick(
                                $event,
                                MenuLabels.DASHBOARD,
                                false
                            )
                        "
                    >
                        <i class="topbar-icon pi pi-home"></i>
                        <!-- <span class="topbar-badge">4</span> -->
                        <span class="topbar-item-name">Dashboard</span>
                    </a>
                </li>
                <li
                    [ngClass]="{
                        'active-topmenuitem':
                            appMain.activeTabIndex === MenuLabels.AUSRUECKUNGEN
                    }"
                >
                    <a
                        routerLink="/ausrueckungen"
                        (click)="
                            appMain.onTopbarItemClick(
                                $event,
                                MenuLabels.AUSRUECKUNGEN,
                                false
                            )
                        "
                    >
                        <i class="topbar-icon pi pi-calendar"></i>
                        <!-- <span class="topbar-badge">4</span> -->
                        <span class="topbar-item-name">Ausrückungen</span>
                    </a>
                </li>
                <li
                    [ngClass]="{
                        'active-topmenuitem':
                            appMain.activeTabIndex === MenuLabels.MITGLIEDER
                    }"
                >
                    <a
                        routerLink="/mitglieder"
                        (click)="
                            appMain.onTopbarItemClick(
                                $event,
                                MenuLabels.MITGLIEDER,
                                false
                            )
                        "
                    >
                        <i class="topbar-icon pi pi-users"></i>
                        <!-- <span class="topbar-badge">4</span> -->
                        <span class="topbar-item-name">Mitglieder</span>
                    </a>
                </li>
                <li
                    [ngClass]="{
                        'active-topmenuitem':
                            appMain.activeTabIndex === MenuLabels.NOTEN
                    }"
                >
                    <a
                        href="#"
                        (click)="
                            appMain.onTopbarItemClick(
                                $event,
                                MenuLabels.NOTEN,
                                true
                            )
                        "
                    >
                        <i class="topbar-icon mdi mdi-music"></i>
                        <!-- <span class="topbar-badge">4</span> -->
                        <span class="topbar-item-name">Noten</span>
                    </a>
                    <ul class="fadeInDown">
                        <li role="menuitem">
                            <a
                                routerLink="/noten/archiv"
                                (click)="appMain.onTopbarSubItemClick($event)"
                            >
                                <i class="mdi mdi-archive-music-outline"></i>
                                <span>Archiv</span>
                            </a>
                        </li>
                    </ul>
                    <ul class="fadeInDown">
                        <li role="menuitem">
                            <a
                                routerLink="/noten/mappen"
                                (click)="appMain.onTopbarSubItemClick($event)"
                            >
                                <i class="mdi mdi-book-music-outline"></i>
                                <span>Mappen</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li
                    [ngClass]="{
                        'active-topmenuitem':
                            appMain.activeTabIndex === MenuLabels.TOOLS
                    }"
                >
                    <a
                        href="#"
                        (click)="
                            appMain.onTopbarItemClick(
                                $event,
                                MenuLabels.TOOLS,
                                true
                            )
                        "
                    >
                        <i class="topbar-icon mdi mdi-tools"></i>
                        <!-- <span class="topbar-badge">4</span> -->
                        <span class="topbar-item-name">Tools</span>
                    </a>
                    <ul class="fadeInDown">
                        <li role="menuitem">
                            <a
                                routerLink="/tools/rechnungsgenerator"
                                (click)="appMain.onTopbarSubItemClick($event)"
                            >
                                <i class="mdi mdi-currency-eur"></i>
                                <span>Rechnungs-Generator</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li
                    [ngClass]="{
                        'active-topmenuitem':
                            appMain.activeTabIndex === MenuLabels.EINSTELLUNGEN
                    }"
                >
                    <a
                        href="#"
                        (click)="
                            appMain.onTopbarItemClick(
                                $event,
                                MenuLabels.EINSTELLUNGEN,
                                true
                            )
                        "
                    >
                        <i class="topbar-icon pi pi-fw pi-cog"></i>
                        <!-- <span class="topbar-badge">4</span> -->
                        <span class="topbar-item-name">Einstellungen</span>
                    </a>
                    <ul class="fadeInDown">
                        <li role="menuitem">
                            <a
                                routerLink="/einstellungen/mitgliedsdaten"
                                (click)="appMain.onTopbarSubItemClick($event)"
                            >
                                <i class="pi pi-user"></i>
                                <span>Meine Daten</span>
                            </a>
                        </li>
                    </ul>
                    <ul class="fadeInDown">
                        <li role="menuitem">
                            <a
                                routerLink="/einstellungen/rollen"
                                (click)="appMain.onTopbarSubItemClick($event)"
                            >
                                <i class="pi pi-check"></i>
                                <span>Rollen & Rechte</span>
                            </a>
                        </li>
                    </ul>
                    <ul class="fadeInDown">
                        <li role="menuitem">
                            <a (click)="reloadApp()">
                                <i class="pi pi-refresh"></i>
                                <span>Reload App</span>
                            </a>
                        </li>
                    </ul>
                </li>

                <li
                    [ngClass]="{
                        'active-topmenuitem':
                            appMain.activeTabIndex === MenuLabels.LOGOUT
                    }"
                >
                    <a
                        routerLink="/login"
                        (click)="
                            appMain.onTopbarItemClick(
                                $event,
                                MenuLabels.LOGOUT,
                                false
                            );
                            logout()
                        "
                    >
                        <i class="topbar-icon pi pi-sign-out"></i>
                        <!-- <span class="topbar-badge">4</span> -->
                        <span class="topbar-item-name">Logout</span>
                    </a>
                </li>
                <li
                    *ngIf="isDevEnvironment"
                    [ngClass]="{
                        'active-topmenuitem':
                            appMain.activeTabIndex === MenuLabels.TEST
                    }"
                >
                    <a
                        routerLink="/test"
                        (click)="
                            appMain.onTopbarItemClick(
                                $event,
                                MenuLabels.TEST,
                                false
                            )
                        "
                    >
                        <i class="topbar-icon pi pi-pencil"></i>
                        <!-- <span class="topbar-badge">4</span> -->
                        <span class="topbar-item-name">Test</span>
                    </a>
                </li>
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
    public MenuLabels = MenuLabels;

    public isDevEnvironment = !environment.production;

    constructor(
        public appMain: AppMainComponent,
        private authStateService: AuthStateService
    ) {}

    ngOnInit(): void {}

    public logout() {
        this.authStateService.setAuthState(false);
    }

    public reloadApp() {
        window.location.reload();
    }
}
