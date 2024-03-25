import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageOutput } from 'src/app/interfaces/api-middleware';
import { UserNotification } from 'src/app/models/User-Notifications';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class UserNotificationAPIService {
  private apiURL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getNotifications<T>(): Observable<UserNotification<T>[]> {
    const url = this.apiURL + 'usernotifications/get';
    return this.http.get<UserNotification<T>[]>(url);
  }

  public getUnreadNotifications<T>(): Observable<UserNotification<T>[]> {
    const url = this.apiURL + 'usernotifications/getunread';
    return this.http.get<UserNotification<T>[]>(url);
  }

  public markAsRead(id: string): Observable<MessageOutput> {
    const url = this.apiURL + 'usernotifications/markasread/' + id;
    return this.http.get<MessageOutput>(url);
  }

  public markAllAsRead(): Observable<MessageOutput> {
    const url = this.apiURL + 'usernotifications/markallasread';
    return this.http.get<MessageOutput>(url);
  }

  public testSocket(dataString: string): Observable<any> {
    const url = this.apiURL + 'testsocket';
    return this.http.post<any>(url, { data: dataString });
  }
}
