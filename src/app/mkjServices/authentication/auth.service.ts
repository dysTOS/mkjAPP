import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

// User interface
export class User {
    name?: String;
    email?: String;
    passwort?: String;
}

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private apiURL = environment.apiUrl;

    constructor(private http: HttpClient) { }

    // User registration
    register(user: User): Observable<any> {
        const url = this.apiURL + "/api/register";
        return this.http.post(url, user);
    }

    // Login
    login(user: User): Observable<any> {
        const url = this.apiURL + "/api/login";
        return this.http.post<any>(url, user);
    }

}
