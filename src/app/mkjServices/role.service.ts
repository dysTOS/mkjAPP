import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { environment } from "src/environments/environment";
import { Role } from "../mkjInterfaces/User";

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
