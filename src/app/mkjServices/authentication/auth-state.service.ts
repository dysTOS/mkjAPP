import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { TokenService } from './token.service';

@Injectable({
    providedIn: 'root'
})

export class AuthStateService {

    private userState = new BehaviorSubject<boolean>(this.token.isLoggedIn());
    public userAuthState = this.userState.asObservable();

    constructor(
        private token: TokenService
    ) { }

    setAuthState(value: boolean) {
        this.userState.next(value);
    }



}
