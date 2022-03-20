import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Mitglied } from "./../../mkjInterfaces/Mitglied";
import { Injectable } from "@angular/core";
import { Role, User, RoleType } from "../../mkjInterfaces/User";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class UserService {
    private currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(
        null
    );
    private currentUserRoles: BehaviorSubject<Array<Role>> =
        new BehaviorSubject<Array<Role>>(null);
    private currentMitglied: BehaviorSubject<Mitglied> =
        new BehaviorSubject<Mitglied>(null);

    public userRoles = [];

    constructor() { }

    public isSet(): boolean {
        if (this.currentUser.getValue()) return true;
        else return false;
    }

    public getCurrentUser(): Observable<User> {
        return this.currentUser.asObservable();
    }

    public setCurrentUser(user: User) {
        this.currentUser.next(user);
    }

    public getCurrentMitglied(): Observable<Mitglied> {
        return this.currentMitglied.asObservable();
    }

    public setCurrentMitglied(mitglied: Mitglied) {
        this.currentMitglied.next(mitglied);
    }

    public getCurrentUserRoles(): Observable<Array<Role>> {
        return this.currentUserRoles.asObservable();
    }

    public setCurrentUserRoles(roles: Array<Role>) {
        this.currentUserRoles.next(roles);
        this.currentUserRoles.getValue().forEach((e) => {
            this.userRoles[e.id] = true;
        });
    }

    public hasRole(role: RoleType): boolean {
        if (!this.currentUserRoles.getValue()) return false;
        let bool = false;
        this.currentUserRoles.getValue().forEach((e) => {
            if (e.role == role) bool = true;
        });
        return bool;
    }

    public onLogout() {
        this.userRoles = [];
        this.currentUser.next(null);
        this.currentUserRoles.next(null);
        this.currentMitglied.next(null);
    }
}
