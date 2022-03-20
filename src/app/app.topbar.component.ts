import { RoleType } from 'src/app/mkjInterfaces/User';
import { MenuLabels } from './mkjInterfaces/Menu';
import { AuthStateService } from './mkjServices/authentication/auth-state.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from './app.main.component';

@Component({
    selector: 'app-topbar',
    template: `
        <div class="topbar clearfix">
            <div class="logo">
                <a href="#">
                    <img src="assets/mkjICONS/LOGO_APP_Favicon.png">
                </a>
            </div>

            <div class="app-name p-text-bold" style="color: white">
                <h3>mkjAPP</h3>
            </div>

            <a id="topbar-menu-button" href="#" (click)="appMain.onTopbarMenuButtonClick($event)">
                <i class="pi pi-bars"></i>
            </a>

            <ul class="topbar-menu fadeInDown" [ngClass]="{'topbar-menu-visible': appMain.topbarMenuActive}">
                <!-- <li #profile class="profile-item" [ngClass]="{'active-topmenuitem':appMain.activeTopbarItem === profile}">
                    <a href="#" (click)="appMain.onTopbarItemClick($event,profile,true)">
                        <div class="profile-image">
                            <img src="assets/layout/images/profile-image.png">
                        </div>
                        <div class="profile-info">
                            <span class="topbar-item-name profile-name">Claire White</span>
                            <span class="topbar-item-name profile-role">System Admin</span>
                        </div>
                    </a>

                    <ul class="fadeInDown">
                        <li role="menuitem">
                            <a href="#" (click)="appMain.onTopbarSubItemClick($event)">
                                <i class="pi pi-user"></i>
                                <span>Profile</span>
                                <span class="topbar-submenuitem-badge">5</span>
                            </a>
                        </li>
                        <li role="menuitem">
                            <a href="#" (click)="appMain.onTopbarSubItemClick($event)">
                                <i class="pi pi-lock"></i>
                                <span>Privacy</span>
                                <span class="topbar-submenuitem-badge">2</span>
                            </a>
                        </li>
                        <li role="menuitem">
                            <a href="#" (click)="appMain.onTopbarSubItemClick($event)">
                                <i class="pi pi-cog"></i>
                                <span>Settings</span>
                            </a>
                        </li>
                        <li role="menuitem">
                            <a href="#" (click)="appMain.onTopbarSubItemClick($event)">
                                <i class="pi pi-sign-out"></i>
                                <span>Logout</span>
                            </a>
                        </li>
                    </ul>
                </li> -->
                <!-- <li #settings [ngClass]="{'active-topmenuitem':appMain.activeTopbarItem === settings}">
                    <a href="#" (click)="appMain.onTopbarItemClick($event,settings, true)">
                        <i class="topbar-icon pi pi-cog"></i>
                        <span class="topbar-item-name">Settings</span>
                    </a>
                    <ul class="fadeInDown">
                        <li role="menuitem">
                            <a href="#" (click)="appMain.onTopbarSubItemClick($event)">
                                <i class="pi pi-palette"></i>
                                <span>Change Theme</span>
                            </a>
                        </li>
                        <li role="menuitem">
                            <a href="#" (click)="appMain.onTopbarSubItemClick($event)">
                                <i class="pi pi-heart"></i>
                                <span>Favorites</span>
                            </a>
                        </li>
                        <li role="menuitem">
                            <a href="#" (click)="appMain.onTopbarSubItemClick($event)">
                                <i class="pi pi-lock"></i>
                                <span>Lock Screen</span>
                            </a>
                        </li>
                        <li role="menuitem">
                            <a href="#" (click)="appMain.onTopbarSubItemClick($event)">
                                <i class="pi pi-image"></i>
                                <span>Wallpaper</span>
                            </a>
                        </li>
                    </ul>
                </li> -->
                <!-- <li #messages [ngClass]="{'active-topmenuitem':appMain.activeTopbarItem === messages}">
                    <a href="#" (click)="appMain.onTopbarItemClick($event,messages,true)">
                        <i class="topbar-icon pi pi-envelope"></i>
                        <span class="topbar-badge">5</span>
                        <span class="topbar-item-name">Messages</span>
                    </a>
                    <ul class="fadeInDown">
                        <li role="menuitem">
                            <a href="#" class="topbar-message" (click)="appMain.onTopbarSubItemClick($event)">
                                <img src="assets/layout/images/avatar1.png" width="35"/>
                                <span>Give me a call</span>
                            </a>
                        </li>
                        <li role="menuitem">
                            <a href="#" class="topbar-message" (click)="appMain.onTopbarSubItemClick($event)">
                                <img src="assets/layout/images/avatar2.png" width="35"/>
                                <span>Sales reports attached</span>
                            </a>
                        </li>
                        <li role="menuitem">
                            <a href="#" class="topbar-message" (click)="appMain.onTopbarSubItemClick($event)">
                                <img src="assets/layout/images/avatar3.png" width="35"/>
                                <span>About your invoice</span>
                            </a>
                        </li>
                        <li role="menuitem">
                            <a href="#" class="topbar-message" (click)="appMain.onTopbarSubItemClick($event)">
                                <img src="assets/layout/images/avatar2.png" width="35"/>
                                <span>Meeting today at 10pm</span>
                            </a>
                        </li>
                        <li role="menuitem">
                            <a href="#" class="topbar-message" (click)="appMain.onTopbarSubItemClick($event)">
                                <img src="assets/layout/images/avatar4.png" width="35"/>
                                <span>Out of office</span>
                            </a>
                        </li>
                    </ul>
                </li> -->
                <li [ngClass]="{'active-topmenuitem':appMain.activeTabIndex === MenuLabels.DASHBOARD}">
                    <a routerLink="" (click)="appMain.onTopbarItemClick($event,MenuLabels.DASHBOARD, false)">
                        <i class="topbar-icon pi pi-home"></i>
                        <!-- <span class="topbar-badge">4</span> -->
                        <span class="topbar-item-name">Dashboard</span>
                    </a>
                </li>
                <li [ngClass]="{'active-topmenuitem':appMain.activeTabIndex === MenuLabels.AUSRUECKUNGEN}">
                    <a routerLink="/ausrueckungen" (click)="appMain.onTopbarItemClick($event,MenuLabels.AUSRUECKUNGEN, true)">
                        <i class="topbar-icon pi pi-calendar"></i>
                        <!-- <span class="topbar-badge">4</span> -->
                        <span class="topbar-item-name">Ausrückungen</span>
                    </a>
                    <ul class="fadeInDown">
                        <li role="menuitem">
                            <a routerLink="/ausrueckungen" (click)="appMain.onTopbarSubItemClick($event)">
                                <i class="pi pi-calendar-times"></i>
                                <span>Ausrückungen</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <li [ngClass]="{'active-topmenuitem':appMain.activeTabIndex === MenuLabels.MITGLIEDER}">
                    <a routerLink="/mitglieder" (click)="appMain.onTopbarItemClick($event,MenuLabels.MITGLIEDER, false)">
                        <i class="topbar-icon pi pi-users"></i>
                        <!-- <span class="topbar-badge">4</span> -->
                        <span class="topbar-item-name">Mitglieder</span>
                    </a>
                </li>
                <li [ngClass]="{'active-topmenuitem':appMain.activeTabIndex === MenuLabels.NOTEN}">
                    <a routerLink="/notenarchiv" (click)="appMain.onTopbarItemClick($event,MenuLabels.NOTEN, false)">
                        <i class="topbar-icon pi pi-file"></i>
                        <!-- <span class="topbar-badge">4</span> -->
                        <span class="topbar-item-name">Notenarchiv</span>
                    </a>
                </li>
                <li *visibleFor="[RoleType.ADMIN]" [ngClass]="{'active-topmenuitem':appMain.activeTabIndex === MenuLabels.ADMINBEREICH}">
                    <a routerLink="/administration" (click)="appMain.onTopbarItemClick($event,MenuLabels.ADMINBEREICH, false)">
                        <i class="topbar-icon pi pi-fw pi-cog"></i>
                        <!-- <span class="topbar-badge">4</span> -->
                        <span class="topbar-item-name">Adminbereich</span>
                    </a>
                </li>

                <li [ngClass]="{'active-topmenuitem':appMain.activeTabIndex === MenuLabels.LOGOUT}">
                    <a routerLink="/login" (click)="appMain.onTopbarItemClick($event, MenuLabels.LOGOUT, false); logout()">
                        <i class="topbar-icon pi pi-sign-out"></i>
                        <!-- <span class="topbar-badge">4</span> -->
                        <span class="topbar-item-name">Logout</span>
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
    `
})
export class AppTopbarComponent implements OnInit {
    sidebarVisible: boolean = false;
    MenuLabels = MenuLabels;
    RoleType = RoleType;

    constructor(public appMain: AppMainComponent,
        private authStateService: AuthStateService,
    ) { }

    ngOnInit(): void {
    }

    logout() {
        this.authStateService.setAuthState(false)
    }

}
