import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { environment } from "src/environments/environment";
import { Permission, Role } from "../mkjInterfaces/User";

const httpOptions = {
    headers: new HttpHeaders({
        "Content-Type": "application/json",
    }),
};

@Injectable({
    providedIn: "root",
})
export class RoleService {
    private apiURL = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getAllRoles(): Observable<Role[]> {
        const url = this.apiURL + "/api/roles";
        return this.http.get<Role[]>(url, httpOptions);
    }

    getAllPermissions(): Observable<Role[]> {
        const url = this.apiURL + "/api/permissions";
        return this.http.get<Role[]>(url, httpOptions);
    }

    getPermissionsForRole(id: string): Observable<Permission[]> {
        const url = this.apiURL + "/api/permissions/" + id;
        return this.http.get<Permission[]>(url, httpOptions);
    }

    getUserRoles(id: string): Observable<Role[]> {
        const url = this.apiURL + "/api/roles/" + id;
        return this.http.get<Role[]>(url, httpOptions);
    }

    createRole(roleName: string, permissions: Permission[]): Observable<Role> {
        const url = this.apiURL + "/api/role";
        const syncPermissions = permissions.map(p => { return p.name })
        return this.http.post<Role>(url, { name: roleName, permission: syncPermissions }, httpOptions);
    }

    updateRole(role: Role, permissions: Permission[]): Observable<Role> {
        const url = this.apiURL + "/api/role/" + role.id;
        const syncPermissions = permissions.map(p => { return p.name })
        return this.http.put<Role>(url, { name: role.name, permission: syncPermissions }, httpOptions);
    }

    deleteRole(role: Role): Observable<any> {
        const url = this.apiURL + "/api/role/" + role.id;
        return this.http.delete<any>(url, httpOptions);
    }


    // ----------------------------------------

    getRolesForMitglied(mitgliedId: string): Observable<Role[]> {
        const url = this.apiURL + "/api/getrolesformitglied";
        return this.http.post<Role[]>(url, { id: mitgliedId }, httpOptions);
    }

    getRolesForUser(userId: string): Observable<Role[]> {
        const url = this.apiURL + "/api/getrolesforuser";
        return this.http.post<Role[]>(url, { id: userId }, httpOptions);
    }

    attachRoleToMitglied(mitgliedId: string, roleId: string): Observable<any> {
        const url = this.apiURL + "/api/addrole";
        return this.http.post<Role[]>(
            url,
            { mitglied_id: mitgliedId, role_id: roleId },
            httpOptions
        );
    }

    detachRoleFromMitglied(
        mitgliedId: string,
        roleId: string
    ): Observable<any> {
        const url = this.apiURL + "/api/removerole";
        return this.http.post<Role[]>(
            url,
            { mitglied_id: mitgliedId, role_id: roleId },
            httpOptions
        );
    }
}
