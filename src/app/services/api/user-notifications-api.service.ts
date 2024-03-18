import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class UserNotificationsService {
  private apiURL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getNotifications(): Observable<any> {
    const url = this.apiURL + 'usernotifications/get';
    return this.http.get(url);
  }

  public getUnreadNotifications(): Observable<any> {
    const url = this.apiURL + 'usernotifications/getunread';
    return this.http.get(url);
  }

  public markAsRead(id: string): Observable<any> {
    const url = this.apiURL + 'usernotifications/markasread/' + id;
    return this.http.get(url);
  }

  public markAllAsRead(): Observable<any> {
    const url = this.apiURL + 'usernotifications/markallasread';
    return this.http.get(url);
  }
}
