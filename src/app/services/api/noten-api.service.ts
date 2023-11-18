import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { StandardHttpOptions } from "src/app/interfaces/api-middleware";
import { environment } from "src/environments/environment";
import { Noten, Notenmappe } from "../../models/Noten";

@Injectable({
    providedIn: "root",
})
export class NotenApiService {
    private apiURL = environment.apiUrl;

    constructor(private http: HttpClient) {}

    getAllNoten(): Observable<Noten[]> {
        const url = this.apiURL + "noten";
        return this.http.get<Noten[]>(url, StandardHttpOptions);
    }

    getNotenById(id: string): Observable<Noten> {
        return this.http.get<Noten>(
            this.apiURL + "noten/" + id,
            StandardHttpOptions
        );
    }

    getNotenForAusrueckung(ausrueckungId: string): Observable<Noten[]> {
        const url =
            this.apiURL + "notenausrueckung/" + ausrueckungId.toString();
        return this.http.get<Noten[]>(url, StandardHttpOptions);
    }

    searchNoten(searchkey: string): Observable<Noten[]> {
        const url = this.apiURL + "noten/search/" + searchkey;
        return this.http.get<Noten[]>(url, StandardHttpOptions);
    }

    createNoten(noten: Noten): Observable<Noten> {
        const url = this.apiURL + "noten";
        return this.http.post<Noten>(url, noten, StandardHttpOptions);
    }

    updateNoten(noten: Noten): Observable<Noten> {
        const url = this.apiURL + "noten/" + noten.id.toString();
        return this.http.put<Noten>(url, noten, StandardHttpOptions);
    }

    deleteNoten(id: string): Observable<Noten> {
        const url = this.apiURL + "noten/" + id;
        return this.http.delete<Noten>(url, StandardHttpOptions);
    }

    attachNotenToAusrueckung(
        notenId: string,
        ausrueckungId: string
    ): Observable<any> {
        const url = this.apiURL + "addnoten";
        return this.http.post<any>(
            url,
            { noten_id: notenId, ausrueckung_id: ausrueckungId },
            StandardHttpOptions
        );
    }

    detachNotenFromAusrueckung(
        notenId: string,
        ausrueckungId: string
    ): Observable<any> {
        const url = this.apiURL + "removenoten";
        return this.http.post<any>(
            url,
            { noten_id: notenId, ausrueckung_id: ausrueckungId },
            StandardHttpOptions
        );
    }
}
