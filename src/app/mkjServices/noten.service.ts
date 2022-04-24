import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { environment } from "src/environments/environment";
import { Noten } from "../mkjInterfaces/Noten";

const httpOptions = {
    headers: new HttpHeaders({
        "Content-Type": "application/json",
    }),
};

@Injectable({
    providedIn: "root",
})
export class NotenService {
    private apiURL = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getAllNoten(): Observable<Noten[]> {
        const url = this.apiURL + "/api/noten";
        return this.http.get<Noten[]>(url, httpOptions);
    }

    getNotenForAusrueckung(ausrueckungId: string): Observable<Noten[]> {
        const url = this.apiURL + "/api/notenausrueckung/" + ausrueckungId.toString();
        return this.http.get<Noten[]>(url, httpOptions);
    }

    searchNoten(searchkey: string): Observable<Noten[]> {
        const url = this.apiURL + "/api/noten/search/" + searchkey;
        return this.http.get<Noten[]>(url, httpOptions);
    }

    createNoten(noten: Noten): Observable<Noten> {
        const url = this.apiURL + "/api/noten";
        return this.http.post<Noten>(url, noten, httpOptions);
    }

    updateNoten(noten: Noten): Observable<Noten> {
        const url = this.apiURL + "/api/noten/" + noten.id.toString();
        return this.http.put<Noten>(url, noten, httpOptions);
    }

    deleteNoten(noten: Noten): Observable<Noten> {
        const url = this.apiURL + "/api/noten/" + noten.id.toString();
        return this.http.delete<Noten>(url, httpOptions);
    }

    attachNotenToAusrueckung(notenId: string, ausrueckungId: string): Observable<any> {
        const url = this.apiURL + "/api/addnoten";
        return this.http.post<any>(
            url,
            { noten_id: notenId, ausrueckung_id: ausrueckungId },
            httpOptions
        );
    }

    detachNotenFromAusrueckung(
        notenId: string,
        ausrueckungId: string
    ): Observable<any> {
        const url = this.apiURL + "/api/removenoten";
        return this.http.post<any>(
            url,
            { noten_id: notenId, ausrueckung_id: ausrueckungId },
            httpOptions
        );
    }
}
