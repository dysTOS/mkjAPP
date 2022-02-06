import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class TokenService {

    private issuer = {
        login: environment.apiUrl + '/api/login',
        register: environment.apiUrl + '/api/register'
    }

    constructor() { }

    saveToken(token) {
        localStorage.setItem('auth_token', token);
    }

    getToken() {
        return localStorage.getItem('auth_token');
    }

    // Verify the token
    isValidToken() {
        const token = this.getToken();
        if (token)
            return true;
        else
            return false;
        // if (token) {
        //     const payload = this.payload(token);
        //     if (payload) {
        //         return Object.values(this.issuer).indexOf(payload.iss) > -1 ? true : false;
        //     }
        // } else {
        //     return false;
        // }
        // return null;
    }

    // payload(token) {
    //     const jwtPayload = token.split('.')[1];
    //     return JSON.parse(atob(jwtPayload));
    // }

    // User state based on valid token
    isLoggedIn() {
        return this.isValidToken();
    }

    // Remove token
    removeToken() {
        localStorage.removeItem('auth_token');
    }

}
