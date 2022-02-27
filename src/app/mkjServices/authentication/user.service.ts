import { Injectable } from '@angular/core';
import { Role, User, RoleType } from './User';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private currentUser: User;
    private currentUserRoles: Array<Role>;

    constructor() { }

    public getCurrentUser(): User {
        return this.currentUser;
    }

    public setCurrentUser(user: User) {
        this.currentUser = user;
    }

    public getCurrentUserRoles(): Array<Role> {
        return this.currentUserRoles;
    }

    public setCurrentUserRoles(roles: Array<Role>) {
        this.currentUserRoles = roles;
    }

    public hasRole(role: RoleType): boolean {
        if (!this.currentUserRoles) return false;
        let bool = false;
        this.currentUserRoles.forEach(e => {
            if (e.id == role)
                bool = true;
        })
        return bool;
    }

    public onLogout() {
        this.currentUser = null;
        this.currentUserRoles = null;
    }
}
