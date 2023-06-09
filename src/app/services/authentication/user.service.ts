import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Gruppe } from "src/app/models/Gruppe";
import { Mitglied } from "../../models/Mitglied";
import { Permission, Role, User } from "../../models/User";
import { AuthAPIService } from "./auth-api.service";
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
    public currentMitglied: BehaviorSubject<Mitglied> =
        new BehaviorSubject<Mitglied>(null);

    private currentPermissions: BehaviorSubject<Permission[]> =
        new BehaviorSubject<Permission[]>(null);
    private currentMitgliedGruppen: BehaviorSubject<Gruppe[]> =
        new BehaviorSubject<Gruppe[]>(null);

    constructor(
        private authApiService: AuthAPIService,
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

    public getCurrentMitgliedGruppen(): Observable<Gruppe[]> {
        return this.currentMitgliedGruppen.asObservable();
    }

    public setCurrentMitgliedGruppen(gruppen: Array<Gruppe>) {
        this.currentMitgliedGruppen.next(gruppen);
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

    public hasPermissionNot(permission: any): boolean {
        return !this.currentPermissions
            .getValue()
            .find((e) => e.name === permission);
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

    public renewCurrentUserData() {
        this.authApiService.getCurrentUser().subscribe({
            next: (result) => {
                this.setCurrentUser(result.user),
                    this.setCurrentMitglied(result.mitglied),
                    this.setCurrentUserRoles(result.roles),
                    this.setCurrentUserPermissions(result.permissions);
                this.setCurrentMitgliedGruppen(result.gruppen);
            },
        });
    }

    public onLogout() {
        this.authApiService.logout().subscribe({
            next: (res) => {},
            error: (err) => {
                console.log(this.onLogout.name, err);
            },
        });
        this.currentUser.next(null);
        this.currentUserRoles.next(null);
        this.currentMitglied.next(null);
        this.currentPermissions.next(null);
    }

    public initializeUserData(): Observable<any> {
        const subject = new Subject();
        if (!this.isSet() && this.tokenService.isLoggedIn()) {
            this.authApiService.getCurrentUser().subscribe({
                next: (result) => {
                    this.setCurrentUser(result.user);
                    this.setCurrentMitglied(result.mitglied);
                    this.setCurrentUserRoles(result.roles);
                    this.setCurrentUserPermissions(result.permissions);
                    this.setCurrentMitgliedGruppen(result.gruppen);
                    subject.next(null);
                    subject.complete();
                },
                error: (err) => {
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
