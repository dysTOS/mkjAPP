import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
    Ausrueckung,
    AusrueckungFilterInput,
} from "../interfaces/Ausrueckung";
import { environment } from "../../environments/environment";

const httpOptions = {
    headers: new HttpHeaders({
        "Content-Type": "application/json",
    }),
};

@Injectable({
    providedIn: "root",
})
export class AusrueckungenService {
    private selectedAusrueckung: Ausrueckung; //for fast routing to single Ausrueckung
    private apiURL = environment.apiUrl;

    constructor(private http: HttpClient) {}

    getAusrueckungen(): Observable<Ausrueckung[]> {
        const url = this.apiURL + "ausrueckungen";
        return this.http.get<Ausrueckung[]>(url, httpOptions);
    }

    getSingleAusrueckung(id: string): Observable<Ausrueckung> {
        const url = this.apiURL + "ausrueckungen/" + id;
        return this.http.get<Ausrueckung>(url, httpOptions);
    }

    getNextAusrueckung(): Observable<Ausrueckung> {
        const url = this.apiURL + "nextausrueckung";
        return this.http.get<Ausrueckung>(url, httpOptions);
    }

    getAusrueckungenFiltered(
        filterInput: AusrueckungFilterInput
    ): Observable<Ausrueckung[]> {
        const url = this.apiURL + "ausrueckungenfiltered";
        return this.http.post<Ausrueckung[]>(url, filterInput, httpOptions);
    }

    createAusrueckung(ausrueckung: Ausrueckung): Observable<Ausrueckung> {
        const url = this.apiURL + "ausrueckungen";
        return this.http.post<Ausrueckung>(url, ausrueckung, httpOptions);
    }

    updateAusrueckung(ausrueckung: Ausrueckung): Observable<Ausrueckung> {
        const url = this.apiURL + "ausrueckungen/" + ausrueckung.id.toString();
        return this.http.put<Ausrueckung>(url, ausrueckung, httpOptions);
    }

    deleteAusrueckung(ausrueckung: Ausrueckung): Observable<Ausrueckung> {
        const url = this.apiURL + "ausrueckungen/" + ausrueckung.id.toString();
        return this.http.delete<Ausrueckung>(url, httpOptions);
    }

    hasSelectedAusrueckung() {
        return (
            this.selectedAusrueckung != undefined ||
            this.selectedAusrueckung != null
        );
    }
    getSelectedAusrueckung() {
        return this.selectedAusrueckung;
    }
    setSelectedAusrueckung(ausrueckung: Ausrueckung) {
        this.selectedAusrueckung = ausrueckung;
    }
}
