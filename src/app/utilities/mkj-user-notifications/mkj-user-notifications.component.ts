import { Component, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { UserNotificationService } from 'src/app/services/user-notification.service';
import { SubSink } from 'subsink';

@Component({
  selector: 'mkj-user-notifications',
  templateUrl: './mkj-user-notifications.component.html',
  styleUrl: './mkj-user-notifications.component.scss',
})
export class MkjUserNotificationsComponent implements OnDestroy {
  public menuItems: MenuItem[] = [];

  private _subs = new SubSink();

  constructor(private userNotificationsService: UserNotificationService) {
    this._subs.add(
      this.userNotificationsService.userNotifications.subscribe((notifications) => {
        this.menuItems = notifications;
      })
    );
  }

  public ngOnDestroy(): void {
    this._subs.unsubscribe();
  }
}
