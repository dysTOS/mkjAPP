import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../../models/User';
import { UserRegistrationInput, UserLoginInput, UserLoginOutput } from 'src/app/interfaces/api-middleware';

@Injectable({
  providedIn: 'root',
})
export class AuthAPIService {
  private apiURL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // User registration
  public register(user: UserRegistrationInput): Observable<any> {
    const url = this.apiURL + 'register';
    return this.http.post(url, user);
  }

  // Login
  public login(user: UserLoginInput): Observable<UserLoginOutput> {
    const url = this.apiURL + 'login';
    return this.http.post<any>(url, user);
  }

  public logout(): Observable<any> {
    const url = this.apiURL + 'logout';
    return this.http.post<any>(url, {});
  }

  public getCurrentUser(): Observable<UserLoginOutput> {
    const url = this.apiURL + 'user';
    return this.http.post<any>(url, {});
  }

  public deleteUser(user: User): Observable<any> {
    const url = this.apiURL + 'deleteuser';
    return this.http.post<any>(url, user);
  }

  public forgotPassword(email: string): Observable<any> {
    const url = this.apiURL + 'forgot-password';
    return this.http.post<any>(url, { email });
  }

  public resetPassword(token: string, email: string, password: string): Observable<any> {
    const url = this.apiURL + 'reset-password';
    return this.http.post<any>(url, { token, email, password });
  }
}
