import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import {
    StandardAllocationInput,
    StandardMessageOutput,
} from "../interfaces/api-middleware";
import { Gruppe } from "../models/Gruppe";
import { Mitglied } from "../models/Mitglied";

const httpOptions = {
    headers: new HttpHeaders({
        "Content-Type": "application/json",
    }),
};

@Injectable({
    providedIn: "root",
})
export class GruppenApiService {
    private apiURL = environment.apiUrl + "gruppen/";

    constructor(private http: HttpClient) {}

    public addMitgliedToGruppe(
        input: StandardAllocationInput
    ): Observable<StandardMessageOutput> {
        const url = this.apiURL + "addmitglied";
        return this.http.post<StandardMessageOutput>(
            url,
            { gruppe_id: input.collectionId, mitglied_id: input.subjectId },
            httpOptions
        );
    }

    public removeMitgliedFromGruppe(
        input: StandardAllocationInput
    ): Observable<StandardMessageOutput> {
        const url = this.apiURL + "removemitglied";
        return this.http.post<StandardMessageOutput>(
            url,
            { gruppe_id: input.collectionId, mitglied_id: input.subjectId },
            httpOptions
        );
    }

    public getAllGruppen(input?: {
        includeMitglieder: boolean;
        includeGruppenleiter: boolean;
    }): Observable<Gruppe[]> {
        const url = this.apiURL + "all";
        return this.http.post<Gruppe[]>(url, input, httpOptions);
    }

    public saveGruppe(input: Gruppe): Observable<Gruppe> {
        const url = this.apiURL + "save";
        return this.http.post<Gruppe>(url, input, httpOptions);
    }

    public deleteGruppe(id: string): Observable<any> {
        const url = this.apiURL + "delete/" + id;
        return this.http.delete<any>(url, httpOptions);
    }

    public getGruppenLeiter(gruppenId: string): Observable<Mitglied> {
        const url = this.apiURL + "gruppenleiter";
        return this.http.post<Mitglied>(url, { id: gruppenId }, httpOptions);
    }

    public getMitgliederOfGruppe(gruppenId: string): Observable<Mitglied[]> {
        const url = this.apiURL + "mitgliederofgruppe";
        return this.http.post<Mitglied[]>(url, { id: gruppenId }, httpOptions);
    }

    public getGruppenOfMitglied(mitgliedId: string): Observable<Gruppe[]> {
        const url = this.apiURL + "gruppenofmitglied";
        return this.http.post<Gruppe[]>(url, { id: mitgliedId }, httpOptions);
    }
}
