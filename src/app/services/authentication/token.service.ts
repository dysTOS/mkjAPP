import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class TokenService {
    private _tokenKey = "auth_token";

    public saveToken(token: string) {
        localStorage.setItem(this._tokenKey, token);
    }

    public getToken() {
        return localStorage.getItem(this._tokenKey);
    }

    public removeToken() {
        localStorage.removeItem(this._tokenKey);
    }

    public isLoggedIn() {
        if (this.getToken()) return true;
        else return false;
    }
}
