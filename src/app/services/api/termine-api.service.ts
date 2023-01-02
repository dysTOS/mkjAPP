import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Termin } from "../../models/Termin";
import { environment } from "../../../environments/environment";
import {
    GetCollectionApiCallInput,
    GetCollectionApiCallOutput,
} from "src/app/interfaces/api-middleware";

const httpOptions = {
    headers: new HttpHeaders({
        "Content-Type": "application/json",
    }),
};

@Injectable({
    providedIn: "root",
})
export class TermineApiService {
    private apiURL = environment.apiUrl;

    constructor(private http: HttpClient) {}

    public getTermine(): Observable<Termin[]> {
        const url = this.apiURL + "ausrueckungen";
        return this.http.get<Termin[]>(url, httpOptions);
    }

    public getSingleTermin(id: string): Observable<Termin> {
        const url = this.apiURL + "ausrueckungen/" + id;
        return this.http.get<Termin>(url, httpOptions);
    }

    public getNextTermin(): Observable<Termin> {
        const url = this.apiURL + "nextausrueckung";
        return this.http.get<Termin>(url, httpOptions);
    }

    public getTermineFiltered(
        filterInput: GetCollectionApiCallInput
    ): Observable<GetCollectionApiCallOutput<Termin>> {
        const url = this.apiURL + "ausrueckungenfiltered";
        return this.http.post<GetCollectionApiCallOutput<Termin>>(
            url,
            filterInput,
            httpOptions
        );
    }

    public createTermin(ausrueckung: Termin): Observable<Termin> {
        const url = this.apiURL + "ausrueckungen";
        return this.http.post<Termin>(url, ausrueckung, httpOptions);
    }

    public updateTermin(ausrueckung: Termin): Observable<Termin> {
        const url = this.apiURL + "ausrueckungen/" + ausrueckung.id.toString();
        return this.http.put<Termin>(url, ausrueckung, httpOptions);
    }

    public deleteTermin(ausrueckung: Termin): Observable<Termin> {
        const url = this.apiURL + "ausrueckungen/" + ausrueckung.id.toString();
        return this.http.delete<Termin>(url, httpOptions);
    }
}
