import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from './authentication/user.service';

@Injectable({ providedIn: 'root' })
export class WebsocketService {
  private _echo: Echo;

  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) {
    (window as any).Pusher = Pusher;
    this._echo = new Echo({
      broadcaster: 'reverb',
      key: 'akkq3uvoftnearumcyzb',
      wsHost: 'localhost',
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

    this._echo.private('usernotifications.' + this.userService.getCurrentUserId()).notification((e) => {
      console.log('Notification', e);
    });
  }
}
