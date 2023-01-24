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

    deleteNoten(noten: Noten): Observable<Noten> {
        const url = this.apiURL + "noten/" + noten.id.toString();
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

    public getNotenMappe(id: string): Observable<Notenmappe> {
        const url = this.apiURL + "notenmappe";
        return this.http.post<Notenmappe>(url, { id: id }, StandardHttpOptions);
    }

    public getNotenmappen(): Observable<Notenmappe[]> {
        const url = this.apiURL + "notenmappen";
        return this.http.get<Notenmappe[]>(url, StandardHttpOptions);
    }

    public createNotenmappe(mappe: Notenmappe): Observable<Notenmappe> {
        const url = this.apiURL + "notenmappen";
        return this.http.post<Notenmappe>(url, mappe, StandardHttpOptions);
    }

    public updateNotenmappe(mappe: Notenmappe): Observable<Notenmappe> {
        const url = this.apiURL + "notenmappen/" + mappe.id.toString();
        return this.http.put<Notenmappe>(url, mappe, StandardHttpOptions);
    }

    public deleteNotenmappe(id: string): Observable<any> {
        const url = this.apiURL + "notenmappen/" + id;
        return this.http.delete<any>(url, StandardHttpOptions);
    }

    public attachNotenToMappe(
        notenId: string,
        mappeId: string,
        verzeichnisNr: string = null
    ): Observable<any> {
        const url = this.apiURL + "notenmappenattach";
        return this.http.post<any>(
            url,
            {
                noten_id: notenId,
                mappe_id: mappeId,
                verzeichnisNr: verzeichnisNr,
            },
            StandardHttpOptions
        );
    }

    public detachNotenFromMappe(
        notenId: string,
        mappeId: string
    ): Observable<any> {
        const url = this.apiURL + "notenmappendetach";
        return this.http.post<any>(
            url,
            { noten_id: notenId, mappe_id: mappeId },
            StandardHttpOptions
        );
    }
}
