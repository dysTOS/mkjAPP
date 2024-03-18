import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { MenuService } from './services/menu.service';
import { environment } from 'src/environments/environment';
import { UserNotificationsService } from './services/api/user-notifications-api.service';

@Component({
  selector: 'app-topbar',
  template: `
    <div class="topbar clearfix">
      <div class="logo">
        <a routerLink="/">
          <img src="assets/images/app_logo.png" />
        </a>
      </div>

      <div class="app-name font-bold" style="color: white">
        <h3>{{ AppTitle }}</h3>
      </div>

      <a id="topbar-menu-button" href="#" (click)="appMain.onTopbarMenuButtonClick($event)">
        <i class="pi pi-bars" style="font-size: 25px"></i>
      </a>

      <p-sidebar [(visible)]="appMain.topbarMenuActive" position="right" [autoZIndex]="false" [modal]="false">
        <ul
          class="topbar-menu fadeInDown"
          [ngClass]="{
            'topbar-menu-visible': appMain.topbarMenuActive
          }"
        >
          @for (menuItem of menuService.MainMenu; track menuItem) {
            @if (menuItem.visible) {
              <li
                [ngClass]="{
                  'active-topmenuitem': appMain.activeTabIndex === menuItem.enumLabel
                }"
              >
                <a
                  [routerLink]="menuItem.routerLink"
                  (click)="
                    menuItem.command
                      ? menuItem.command(null)
                      : appMain.onTopbarItemClick($event, menuItem.enumLabel, menuItem.children ? true : false)
                  "
                >
                  <i [class]="'topbar-icon ' + menuItem.icon"></i>
                  <span class="topbar-item-name">{{ menuItem.label }}</span>
                </a>
                @if (menuItem.children) {
                  <ul class="fadeInDown">
                    @for (childItem of menuItem.children; track childItem) {
                      @if (childItem.visible) {
                        <li role="menuitem">
                          <a
                            [routerLink]="childItem.routerLink"
                            [routerLinkActive]="'topbar-active-child-menu-item'"
                            (click)="childItem.command ? childItem.command(null) : appMain.onTopbarSubItemClick($event)"
                          >
                            <i [class]="childItem.icon"></i>
                            <span>{{ childItem.label }}</span>
                          </a>
                        </li>
                      }
                    }
                  </ul>
                }
              </li>
            }
          }
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
  public readonly AppTitle = environment.appTitle;

  constructor(
    public appMain: AppMainComponent,
    public menuService: MenuService,
    private userNotificationsService: UserNotificationsService
  ) {
    this.userNotificationsService.getNotifications().subscribe((response) => {
      console.log('Unread Notifications', response);
      this.userNotificationsService.markAsRead('6f641fe3-c7bd-4d14-85bf-940df4e78bfc').subscribe((response) => {
        console.log('Marked as read', response);
        this.userNotificationsService.getUnreadNotifications().subscribe((response) => {
          console.log('Unread Notifications', response);
        });
      });
    });
  }

  public ngOnInit(): void {}
}
