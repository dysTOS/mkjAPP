import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Termin } from "../../models/Termin";
import { environment } from "../../../environments/environment";
import { GetListInput, GetListOutput } from "src/app/interfaces/api-middleware";

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

    public getNextTermin(skip?: number): Observable<Termin> {
        const url = this.apiURL + "nextausrueckung";
        return this.http.post<Termin>(url, { skip: skip }, httpOptions);
    }

    public getTermineFiltered(
        filterInput: GetListInput
    ): Observable<GetListOutput<Termin>> {
        const url = this.apiURL + "ausrueckungenfiltered";
        return this.http.post<GetListOutput<Termin>>(
            url,
            filterInput,
            httpOptions
        );
    }

    public createTermin(termin: Termin): Observable<Termin> {
        const url = this.apiURL + "ausrueckungen";
        return this.http.post<Termin>(url, termin, httpOptions);
    }

    public updateTermin(termin: Termin): Observable<Termin> {
        const url = this.apiURL + "ausrueckungen/" + termin.id.toString();
        return this.http.put<Termin>(url, termin, httpOptions);
    }

    public saveTerminbyLeiter(termin: Termin): Observable<Termin> {
        const url = this.apiURL + "saveterminbyleiter";
        return this.http.post<Termin>(url, termin, httpOptions);
    }

    public deleteTermin(termin: Termin): Observable<Termin> {
        const url = this.apiURL + "ausrueckungen/" + termin.id.toString();
        return this.http.delete<Termin>(url, httpOptions);
    }
}
