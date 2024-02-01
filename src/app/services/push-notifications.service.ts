import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class PushNotificationsService {
  private apiURL = environment.apiUrl;

  public receivedNotifications: string[] = [];

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  public handleNotificationAction(action: {
    action: string;
    notification: NotificationOptions & {
      title: string;
    };
  }) {
    this.receivedNotifications.push(action.action);
    this.router.navigate(['test']);
  }

  public subscribeUser(sub: PushSubscription) {
    const url = this.apiURL + 'pushsub';
    return this.http.post<any>(url, sub, httpOptions);
  }

  public push(): Observable<any> {
    const url = this.apiURL + 'push';
    return this.http.get<any>(url);
  }
}
