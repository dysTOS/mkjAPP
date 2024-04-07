import { Injectable } from '@angular/core';
import { UserNotificationAPIService } from './api/user-notifications-api.service';
import { WebsocketService } from './api/websocket.service';
import { SubSink } from 'subsink';
import { UserNotification, UserNotificationType } from '../models/User-Notifications';
import { BehaviorSubject, map } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { Termin } from '../models/Termin';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import dayjs from 'dayjs';

@Injectable({
  providedIn: 'root',
})
export class UserNotificationService {
  private _userNotifications = new BehaviorSubject<UserNotification[]>([]);
  private _subs = new SubSink();

  public readonly userNotifications = this._userNotifications
    .asObservable()
    .pipe(map((notifications) => notifications.map((n) => this.mapNotificationToMenuItem(n))));

  constructor(
    private apiService: UserNotificationAPIService,
    private datePipe: DatePipe,
    private router: Router,
    webSocketService: WebsocketService
  ) {
    this._subs.add(
      webSocketService.getUserNotificationsChannel().subscribe((notification: UserNotification) => {
        this.insertNotification(notification);
      })
    );
  }

  public updateUnreadNotifications(): void {
    this.apiService.getUnreadNotifications().subscribe((notifications) => {
      this._userNotifications.next(notifications);
    });
  }

  public addNotification(notification: UserNotification): void {
    this.insertNotification(notification);
  }

  private insertNotification(notification: UserNotification): void {
    if (notification.created_at == null) {
      notification.created_at = dayjs().format('YYYY-MM-DD HH:mm:ss');
    }
    const notifications = this._userNotifications.value;
    notifications.push(notification);
    notifications.sort((a, b) => {
      if (a.created_at < b.created_at) {
        return 1;
      }
      if (a.created_at > b.created_at) {
        return -1;
      }
      return 0;
    });
    this._userNotifications.next(notifications);
  }

  private markAsRead(notification: UserNotification): void {
    console.log(notification);
    if (notification.type === UserNotificationType.SwUpdate || notification.type === UserNotificationType.TestSocket) {
      this.removeNotification(notification);
      return;
    }
    this.apiService.markAsRead(notification.id).subscribe(() => {
      this.removeNotification(notification);
    });
  }

  private removeNotification(notification: UserNotification): void {
    const notifications = this._userNotifications.value.filter((n) => n.id !== notification.id);
    this._userNotifications.next(notifications);
  }

  private mapNotificationToMenuItem(notification: UserNotification): MenuItem {
    return {
      label: this.getLabel(notification),
      subLabel: this.getSubLabel(notification),
      icon: this.getIcon(notification),
      command: () => {
        this.markAsRead(notification);
        this.invokeCommand(notification);
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
      case UserNotificationType.SwUpdate:
        return 'Update verfügbar';
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
      case UserNotificationType.SwUpdate:
        return 'Installieren?';
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
      case UserNotificationType.SwUpdate:
        return 'pi pi-exclamation-triangle';
      default:
        return '';
    }
  }
  private invokeCommand(notification: UserNotification): void {
    switch (notification.type) {
      case UserNotificationType.TerminUpdated:
      case UserNotificationType.TerminCreated:
        this.router.navigate(['/termine/details', (notification.data as Termin).id]);
        return;
      case UserNotificationType.SwUpdate:
        notification.command();
        return;
      default:
        return void 0;
    }
  }
}
