import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import {
    RegistrationCredentials,
    LoginCredentials,
    LoginResponse,
    User,
} from "../../mkjInterfaces/User";

@Injectable({
    providedIn: "root",
})
export class AuthService {
    private apiURL = environment.apiUrl;

    constructor(private http: HttpClient) {}

    // User registration
    register(user: RegistrationCredentials): Observable<any> {
        const url = this.apiURL + "register";
        return this.http.post(url, user);
    }

    // Login
    login(user: LoginCredentials): Observable<LoginResponse> {
        const url = this.apiURL + "login";
        return this.http.post<any>(url, user);
    }

    logout(): Observable<any> {
        const url = this.apiURL + "logout";
        return this.http.post<any>(url, {});
    }

    getCurrentUser(): Observable<LoginResponse> {
        const url = this.apiURL + "user";
        return this.http.post<any>(url, {});
    }

    deleteUser(user: User): Observable<any> {
        const url = this.apiURL + "deleteuser";
        return this.http.post<any>(url, user);
    }
}
