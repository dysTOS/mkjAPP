import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
    Ausrueckung,
    AusrueckungFilterInput,
} from "../mkjInterfaces/Ausrueckung";
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
    private ausrueckungenArray: Array<Ausrueckung>;
    private selectedAusrueckung: Ausrueckung; //for fast routing to single Ausrueckung
    private apiURL = environment.apiUrl;

    constructor(private http: HttpClient) {}

    getAusrueckungen(): Observable<Ausrueckung[]> {
        const url = this.apiURL + "/api/ausrueckungen";
        return this.http.get<Ausrueckung[]>(url, httpOptions);
    }

    getSingleAusrueckung(id: number): Observable<Ausrueckung> {
        const url = this.apiURL + "/api/ausrueckungen/" + id;
        return this.http.get<Ausrueckung>(url, httpOptions);
    }

    getNextAusrueckung(): Observable<Ausrueckung> {
        const url = this.apiURL + "/api/nextausrueckung";
        return this.http.get<Ausrueckung>(url, httpOptions);
    }

    getAusrueckungenFiltered(
        filterInput: AusrueckungFilterInput
    ): Observable<Ausrueckung[]> {
        const url = this.apiURL + "/api/ausrueckungenfiltered";
        return this.http.post<Ausrueckung[]>(url, filterInput, httpOptions);
    }

    createAusrueckung(ausrueckung: Ausrueckung): Observable<Ausrueckung> {
        const url = this.apiURL + "/api/ausrueckungen";
        return this.http.post<Ausrueckung>(url, ausrueckung, httpOptions);
    }

    duplicateAusrueckung(ausrueckung: Ausrueckung): Observable<Ausrueckung> {
        const url = this.apiURL + "/api/ausrueckungduplicate";
        return this.http.post<Ausrueckung>(url, ausrueckung, httpOptions);
    }

    updateAusrueckung(ausrueckung: Ausrueckung): Observable<Ausrueckung> {
        const url =
            this.apiURL + "/api/ausrueckungen/" + ausrueckung.id.toString();
        return this.http.put<Ausrueckung>(url, ausrueckung, httpOptions);
    }

    deleteAusrueckung(ausrueckung: Ausrueckung): Observable<Ausrueckung> {
        const url =
            this.apiURL + "/api/ausrueckungen/" + ausrueckung.id.toString();
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

    hasAusrueckungArray() {
        return (
            this.ausrueckungenArray != undefined ||
            this.ausrueckungenArray != null
        );
    }
    getAusrueckungArray() {
        return this.ausrueckungenArray;
    }
    setAusrueckungArray(ausrueckungen: Array<Ausrueckung>) {
        this.ausrueckungenArray = ausrueckungen;
    }
}
