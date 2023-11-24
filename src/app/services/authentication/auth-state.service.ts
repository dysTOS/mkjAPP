import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { TokenService } from "./token.service";

@Injectable({
    providedIn: "root",
})
export class AuthStateService {
    private _userState = new BehaviorSubject<boolean>(
        this.tokenService.isLoggedIn()
    );
    public readonly userAuthState = this._userState.asObservable();

    constructor(private tokenService: TokenService) {}

    public setAuthState(value: boolean) {
        this._userState.next(value);
    }
}
