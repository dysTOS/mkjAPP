import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { environment } from "src/environments/environment";
import { Noten, Notenmappe } from "../models/Noten";

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

    constructor(private http: HttpClient) {}

    getAllNoten(): Observable<Noten[]> {
        const url = this.apiURL + "noten";
        return this.http.get<Noten[]>(url, httpOptions);
    }

    getNotenForAusrueckung(ausrueckungId: string): Observable<Noten[]> {
        const url =
            this.apiURL + "notenausrueckung/" + ausrueckungId.toString();
        return this.http.get<Noten[]>(url, httpOptions);
    }

    searchNoten(searchkey: string): Observable<Noten[]> {
        const url = this.apiURL + "noten/search/" + searchkey;
        return this.http.get<Noten[]>(url, httpOptions);
    }

    createNoten(noten: Noten): Observable<Noten> {
        const url = this.apiURL + "noten";
        return this.http.post<Noten>(url, noten, httpOptions);
    }

    updateNoten(noten: Noten): Observable<Noten> {
        const url = this.apiURL + "noten/" + noten.id.toString();
        return this.http.put<Noten>(url, noten, httpOptions);
    }

    deleteNoten(noten: Noten): Observable<Noten> {
        const url = this.apiURL + "noten/" + noten.id.toString();
        return this.http.delete<Noten>(url, httpOptions);
    }

    attachNotenToAusrueckung(
        notenId: string,
        ausrueckungId: string
    ): Observable<any> {
        const url = this.apiURL + "addnoten";
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
        const url = this.apiURL + "removenoten";
        return this.http.post<any>(
            url,
            { noten_id: notenId, ausrueckung_id: ausrueckungId },
            httpOptions
        );
    }

    public getNotenmappen(): Observable<Notenmappe[]> {
        const url = this.apiURL + "notenmappen";
        return this.http.get<Notenmappe[]>(url, httpOptions);
    }

    public createNotenmappe(mappe: Notenmappe): Observable<Notenmappe> {
        const url = this.apiURL + "notenmappen";
        return this.http.post<Notenmappe>(url, mappe, httpOptions);
    }

    public updateNotenmappe(mappe: Notenmappe): Observable<Notenmappe> {
        const url = this.apiURL + "notenmappen/" + mappe.id.toString();
        return this.http.put<Notenmappe>(url, mappe, httpOptions);
    }

    public deleteNotenmappe(mappe: Notenmappe): Observable<Notenmappe> {
        const url = this.apiURL + "notenmappen/" + mappe.id;
        return this.http.delete<Notenmappe>(url, httpOptions);
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
            httpOptions
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
            httpOptions
        );
    }
}
