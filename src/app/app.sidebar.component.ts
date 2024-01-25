import { Component } from '@angular/core';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';
import { UserService } from './services/authentication/user.service';
import { MenuService } from './services/menu.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-sidebar',
  template: `<div
    class="layout-sidebar"
    [ngStyle]="{ overflow: appMain.sidebarActive ? 'hidden' : 'visible' }"
    [ngClass]="{ 'layout-sidebar-dark': themeService.darkMode }"
    (click)="appMain.onSidebarClick($event)"
  >
    <div class="layout-tabmenu">
      <ul class="layout-tabmenu-nav">
        @for (menuItem of menuService.MainMenu; track menuItem) {
          @if (menuItem.visible) {
            <li
              [ngClass]="{
                'active-item': appMain.activeTabIndex === menuItem.enumLabel
              }"
            >
              <a
                pRipple
                [routerLink]="menuItem.routerLink"
                class="tabmenuitem-link"
                [pTooltip]="menuItem.label"
                (click)="
                  menuItem.command
                    ? menuItem.command(null)
                    : appMain.onTabClick($event, menuItem.children ? true : false, menuItem.enumLabel)
                "
                ><i [class]="menuItem.icon"></i
              ></a>
            </li>
          }
        }
      </ul>

      <!-- TABMENU CONTENTS ------------------------------------------------------------------------------------------------------------------>

      <div class="layout-tabmenu-contents">
        @for (menuItem of menuService.MainMenu; track menuItem) {
          @if (menuItem.children && menuItem.visible) {
            <div
              class="layout-tabmenu-content"
              [ngClass]="{
                'layout-tabmenu-content-active': appMain.activeTabIndex === menuItem.enumLabel
              }"
            >
              <div class="layout-submenu-title clearfix">
                <span>{{ menuItem.label }}</span>
                <a href="#" class="menu-button pi pi-bars" (click)="appMain.closeSidebar($event)"></a>
              </div>
              <div class="layout-submenu-content">
                <div class="menu-scroll-content">
                  <ul class="navigation-menu">
                    @for (childItem of menuItem.children; track childItem) {
                      @if (childItem.visible) {
                        <li>
                          <a
                            [routerLink]="childItem.routerLink"
                            [routerLinkActive]="'menu-active-child-menu-item'"
                            (click)="childItem.command ? childItem.command(null) : null"
                          >
                            <i [class]="childItem.icon"></i>
                            <span>{{ childItem.label }}</span>
                          </a>
                        </li>
                      }
                    }
                  </ul>
                </div>
              </div>
            </div>
          }
        }
      </div>
    </div>
  </div>`,
})
export class AppSideBarComponent {
  constructor(
    public app: AppComponent,
    public appMain: AppMainComponent,
    public themeService: ThemeService,
    public userService: UserService,
    public menuService: MenuService
  ) {}
}

