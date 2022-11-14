import { Mitglied } from "src/app/models/Mitglied";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

const httpOptions = {
    headers: new HttpHeaders({
        "Content-Type": "application/json",
    }),
};

@Injectable({
    providedIn: "root",
})
export class MitgliederService {
    private selectedMitglied: Mitglied;
    private apiURL = environment.apiUrl;

    constructor(private http: HttpClient) {}

    getAllMitglieder(): Observable<Mitglied[]> {
        const url = this.apiURL + "mitglieder";
        return this.http.get<Mitglied[]>(url, httpOptions);
    }

    getAktiveMitglieder(): Observable<Mitglied[]> {
        const url = this.apiURL + "mitgliederaktiv";
        return this.http.get<Mitglied[]>(url, httpOptions);
    }

    getMitgliederForAusrueckung(ausrueckungId: string): Observable<Mitglied[]> {
        const url =
            this.apiURL + "mitgliederausrueckung/" + ausrueckungId.toString();
        return this.http.get<Mitglied[]>(url, httpOptions);
    }

    getSingleMitglied(id: string): Observable<Mitglied> {
        const url = this.apiURL + "mitglieder/" + id;
        return this.http.get<Mitglied>(url, httpOptions);
    }

    attachMitgliedToAusrueckung(
        ausrueckungId: string,
        mitgliedId: string
    ): Observable<any> {
        const url = this.apiURL + "addmitglied";
        return this.http.post<any>(
            url,
            { mitglied_id: mitgliedId, ausrueckung_id: ausrueckungId },
            httpOptions
        );
    }

    updateOwnMitgliedData(mitglied: Mitglied): Observable<Mitglied> {
        const url = this.apiURL + "mitgliedselbst";
        return this.http.post<any>(url, mitglied, httpOptions);
    }

    createMitglied(mitglied: Mitglied): Observable<Mitglied> {
        const url = this.apiURL + "mitglieder";
        return this.http.post<Mitglied>(url, mitglied, httpOptions);
    }

    updateMitglied(mitglied: Mitglied): Observable<Mitglied> {
        const url = this.apiURL + "mitglieder/" + mitglied.id.toString();
        return this.http.put<Mitglied>(url, mitglied, httpOptions);
    }

    deleteMitglied(mitglied: Mitglied): Observable<Mitglied> {
        const url = this.apiURL + "mitglieder/" + mitglied.id.toString();
        return this.http.delete<Mitglied>(url, httpOptions);
    }

    detachMitgliedFromAusrueckung(
        ausrueckungId: string,
        mitgliedId: string
    ): Observable<any> {
        const url = this.apiURL + "removemitglied";
        return this.http.post<any>(
            url,
            { mitglied_id: mitgliedId, ausrueckung_id: ausrueckungId },
            httpOptions
        );
    }

    hasSelectedMitglied(): boolean {
        if (this.selectedMitglied) return true;
        else return false;
    }

    getSelectedMitglied(): Mitglied {
        return this.selectedMitglied;
    }

    setSelectedMitglied(mitglied: Mitglied) {
        this.selectedMitglied = mitglied;
    }
}
