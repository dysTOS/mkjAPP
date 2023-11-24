import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { environment } from "src/environments/environment";
import { StandardHttpOptions } from "../../interfaces/api-middleware";
import { Permission, Role } from "../../models/User";

@Injectable({
    providedIn: "root",
})
export class RolesApiService {
    private apiURL = environment.apiUrl;

    constructor(private http: HttpClient) {}

    getAllRoles(): Observable<Role[]> {
        const url = this.apiURL + "roles";
        return this.http.get<Role[]>(url, StandardHttpOptions);
    }

    getAllPermissions(): Observable<Role[]> {
        const url = this.apiURL + "permissions";
        return this.http.get<Role[]>(url, StandardHttpOptions);
    }

    getPermissionsForRole(id: string): Observable<Permission[]> {
        const url = this.apiURL + "permissions/" + id;
        return this.http.get<Permission[]>(url, StandardHttpOptions);
    }

    getUserRoles(id: string): Observable<Role[]> {
        const url = this.apiURL + "roles/" + id;
        return this.http.get<Role[]>(url, StandardHttpOptions);
    }

    getUserPermissions(id: string): Observable<Permission[]> {
        const url = this.apiURL + "permissions/" + id;
        return this.http.get<Role[]>(url, StandardHttpOptions);
    }

    createRole(roleName: string, permissions: Permission[]): Observable<Role> {
        const url = this.apiURL + "role";
        const syncPermissions = permissions.map((p) => {
            return p.name;
        });
        return this.http.post<Role>(
            url,
            { name: roleName, permission: syncPermissions },
            StandardHttpOptions
        );
    }

    updateRole(role: Role, permissions: Permission[]): Observable<Role> {
        const url = this.apiURL + "role/" + role.id;
        const syncPermissions = permissions.map((p) => {
            return p.name;
        });
        return this.http.put<Role>(
            url,
            { name: role.name, permission: syncPermissions },
            StandardHttpOptions
        );
    }

    deleteRole(role: Role): Observable<any> {
        const url = this.apiURL + "role/" + role.id;
        return this.http.delete<any>(url, StandardHttpOptions);
    }

    assignRolesToUser(roles: Role[], userId: string): Observable<Role[]> {
        const url = this.apiURL + "roles/assign/" + userId;
        const syncRoles = roles.map((r) => {
            return r.name;
        });
        return this.http.post<Role[]>(
            url,
            { roles: syncRoles },
            StandardHttpOptions
        );
    }
}
