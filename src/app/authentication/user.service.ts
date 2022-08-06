import { AuthService } from "./auth.service";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Mitglied } from "../mkjInterfaces/Mitglied";
import { User, Role, Permission } from "../mkjInterfaces/User";
import { RoleService } from "../mkjServices/role.service";
import { TokenService } from "./token.service";

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

    private currentPermissions: BehaviorSubject<Permission[]> =
        new BehaviorSubject<Permission[]>(null);

    constructor(
        private roleService: RoleService,
        private authService: AuthService,
        private tokenService: TokenService
    ) {}

    public isSet(): boolean {
        if (this.currentUser.getValue()) return true;
        else return false;
    }

    public getCurrentUserId() {
        if (this.currentUser.getValue()) {
            return this.currentUser.getValue().id;
        } else {
            return false;
        }
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
    }

    public getCurrentUserPermissions(): Observable<Array<Permission>> {
        return this.currentPermissions.asObservable();
    }

    public setCurrentUserPermissions(permissions: Array<Permission>) {
        this.currentPermissions.next(permissions);
    }

    public hasPermission(permission: string): boolean {
        if (!this.currentPermissions.getValue() || permission === null)
            return false;
        let bool = false;
        this.currentPermissions.getValue().forEach((e) => {
            if (e.name === permission) bool = true;
        });
        return bool;
    }

    public hasOneOfPermissions(permissions: string[]): boolean {
        if (!this.currentPermissions.getValue() || !permissions) return false;
        let bool = false;
        permissions.forEach((e) => {
            if (this.hasPermission(e)) {
                bool = true;
            }
        });
        return bool;
    }

    public hasAllOfPermissions(permissions: string[]): boolean {
        if (!this.currentPermissions.getValue() || !permissions) return false;
        let bool = true;
        permissions.forEach((e) => {
            if (!this.hasPermission(e)) {
                bool = false;
            }
        });
        return bool;
    }

    public renewCurrentUserPermissions() {
        const userId = this.getCurrentUserId();
        if (userId) {
            this.roleService.getUserPermissions(userId).subscribe({
                next: (res) => this.setCurrentUserPermissions(res),
            });
            this.roleService.getUserRoles(userId).subscribe({
                next: (res) => this.setCurrentUserRoles(res),
            });
        }
    }

    public onLogout() {
        this.authService.logout().subscribe({
            next: (res) => {},
        });
        this.currentUser.next(null);
        this.currentUserRoles.next(null);
        this.currentMitglied.next(null);
        this.currentPermissions.next(null);
    }

    public initializeUserData(): Observable<any> {
        const subject = new Subject();
        if (!this.isSet() && this.tokenService.isLoggedIn()) {
            this.authService.getCurrentUser().subscribe({
                next: (result) => {
                    this.setCurrentUser(result.user),
                        this.setCurrentMitglied(result.mitglied),
                        this.setCurrentUserRoles(result.roles),
                        this.setCurrentUserPermissions(result.permissions);
                    subject.next(null);
                    subject.complete();
                },
            });
        } else {
            subject.next(null);
            subject.complete();
        }
        return subject;
    }
}
