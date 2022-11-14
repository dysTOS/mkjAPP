import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class TokenService {
    constructor() {}

    public saveToken(token) {
        localStorage.setItem("auth_token", token);
    }

    public getToken() {
        return localStorage.getItem("auth_token");
    }

    public removeToken() {
        localStorage.removeItem("auth_token");
    }

    public isLoggedIn() {
        if (this.getToken()) return true;
        else return false;
    }
}
