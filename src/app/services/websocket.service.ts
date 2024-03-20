import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from './authentication/user.service';

@Injectable({ providedIn: 'root' })
export class WebsocketService {
  private _echo: Echo;

  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) {
    this.init();
  }

  public getUserNotificationsChannel(): Observable<Notification> {
    return new Observable((observer) => {
      this._echo.private('users.' + this.userService.getCurrentUserId()).notification((e) => {
        observer.next(e);
      });
    });
  }

  private init(): void {
    (window as any).Pusher = Pusher;
    this._echo = new Echo({
      broadcaster: 'reverb',
      key: 'akkq3uvoftnearumcyzb',
      wsHost: environment.wsHost,
      wsPort: 8080,
      wssPort: 8080,
      forceTLS: environment.production,
      enabledTransports: ['ws', 'wss'],
      authorizer: (channel, options) => {
        return {
          authorize: (socketId, callback) => {
            firstValueFrom(
              this.httpClient.post(environment.apiUrl + 'broadcasting/auth', {
                socket_id: socketId,
                channel_name: channel.name,
              })
            )
              .then((response) => {
                callback(false, response);
              })
              .catch((error) => {
                callback(true, error);
              });
          },
        };
      },
    });
  }
}
