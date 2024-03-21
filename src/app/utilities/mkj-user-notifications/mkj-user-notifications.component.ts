import { DatePipe } from '@angular/common';
import { Component, model } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Termin } from 'src/app/models/Termin';
import { UserNotification, UserNotificationType } from 'src/app/models/User-Notifications';
import { UserNotificationsService } from 'src/app/services/api/user-notifications-api.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'mkj-user-notifications',
  templateUrl: './mkj-user-notifications.component.html',
  styleUrl: './mkj-user-notifications.component.scss',
})
export class MkjUserNotificationsComponent {
  public menuItems: MenuItem[] = [];

  private _subs = new SubSink();

  constructor(
    private userNotificationsService: UserNotificationsService,
    private configService: ConfigurationService,
    private datePipe: DatePipe,
    private router: Router,
    webSocketService: WebsocketService
  ) {
    this.getUnreadNotifications();

    this._subs.add(
      webSocketService.getUserNotificationsChannel().subscribe((notification: UserNotification) => {
        const menuItem = this.mapNotificationToMenuItem(notification);
        this.menuItems = this.menuItems.filter((item) => item.notification.id !== notification.id);
        this.menuItems = [menuItem, ...this.menuItems];
        this.menuItems.sort((a, b) => {
          if (a.notification.created_at < b.notification.created_at) {
            return 1;
          }
          if (a.notification.created_at > b.notification.created_at) {
            return -1;
          }
          return 0;
        });
      })
    );
  }

  private getUnreadNotifications(): void {
    this.userNotificationsService.getUnreadNotifications().subscribe((notifications) => {
      this.menuItems = notifications.map((notification) => {
        return this.mapNotificationToMenuItem(notification);
      });
    });
  }

  private markAsRead(notification: UserNotification): void {
    this.userNotificationsService.markAsRead(notification.id).subscribe(() => {
      this.menuItems = this.menuItems.filter((item) => item.notification.id !== notification.id);
    });
  }

  private mapNotificationToMenuItem(notification: UserNotification): MenuItem {
    return {
      label: this.getLabel(notification),
      subLabel: this.getSubLabel(notification),
      icon: this.getIcon(notification),
      command: () => {
        this.markAsRead(notification);
        this.getCommand(notification);
      },
      unread: notification.read_at == null,
      notification: notification,
    };
  }

  private getLabel(notification: UserNotification): string {
    switch (notification.type) {
      case UserNotificationType.TerminCreated:
        return 'Neuer Termin';
      case UserNotificationType.TerminUpdated:
        return 'Termin aktualisiert';
      default:
        return 'Sonstiges';
    }
  }
  private getSubLabel(notification: UserNotification): string {
    switch (notification.type) {
      case UserNotificationType.TerminCreated:
        const termin = notification.data as Termin;
        return termin?.name + ' ' + this.datePipe.transform(termin.vonDatum, 'd. MMMM YYYY');
      case UserNotificationType.TerminUpdated:
        const updatedTermin = notification.data as Termin;
        return updatedTermin?.name + ' ' + this.datePipe.transform(updatedTermin.vonDatum, 'd. MMMM YYYY');
      default:
        return 'Sonstiges';
    }
  }
  private getIcon(notification: UserNotification): string {
    switch (notification.type) {
      case UserNotificationType.TerminCreated:
        return 'pi pi-calendar-plus';
      case UserNotificationType.TerminUpdated:
        return 'pi pi-refresh';
      default:
        return '';
    }
  }
  private getCommand(notification: UserNotification): void {
    switch (notification.type) {
      case UserNotificationType.TerminUpdated:
      case UserNotificationType.TerminCreated:
        this.router.navigate(['/termine/details', (notification.data as Termin).id]);
        return;
      default:
        return void 0;
    }
  }
}
