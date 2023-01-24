import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { StandardHttpOptions } from "src/app/interfaces/api-middleware";
import { Mitglied } from "src/app/models/Mitglied";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class MitgliederApiService {
    private selectedMitglied: Mitglied;
    private apiURL = environment.apiUrl;

    constructor(private http: HttpClient) {}

    getAllMitglieder(): Observable<Mitglied[]> {
        const url = this.apiURL + "mitglieder";
        return this.http.get<Mitglied[]>(url, StandardHttpOptions);
    }

    getAktiveMitglieder(): Observable<Mitglied[]> {
        const url = this.apiURL + "mitgliederaktiv";
        return this.http.get<Mitglied[]>(url, StandardHttpOptions);
    }

    getMitgliederForAusrueckung(ausrueckungId: string): Observable<Mitglied[]> {
        const url =
            this.apiURL + "mitgliederausrueckung/" + ausrueckungId.toString();
        return this.http.get<Mitglied[]>(url, StandardHttpOptions);
    }

    getSingleMitglied(id: string): Observable<Mitglied> {
        const url = this.apiURL + "mitglieder/" + id;
        return this.http.get<Mitglied>(url, StandardHttpOptions);
    }

    searchMitglieder(searchkey: string): Observable<Mitglied[]> {
        const url = this.apiURL + "mitglieder/search/" + searchkey;
        return this.http.get<Mitglied[]>(url, StandardHttpOptions);
    }

    updateOwnMitgliedData(mitglied: Mitglied): Observable<Mitglied> {
        const url = this.apiURL + "mitgliedselbst";
        return this.http.post<any>(url, mitglied, StandardHttpOptions);
    }

    createMitglied(mitglied: Mitglied): Observable<Mitglied> {
        const url = this.apiURL + "mitglieder";
        return this.http.post<Mitglied>(url, mitglied, StandardHttpOptions);
    }

    updateMitglied(mitglied: Mitglied): Observable<Mitglied> {
        const url = this.apiURL + "mitglieder/" + mitglied.id.toString();
        return this.http.put<Mitglied>(url, mitglied, StandardHttpOptions);
    }

    deleteMitglied(mitglied: Mitglied): Observable<Mitglied> {
        const url = this.apiURL + "mitglieder/" + mitglied.id.toString();
        return this.http.delete<Mitglied>(url, StandardHttpOptions);
    }

    attachMitgliedToAusrueckung(
        ausrueckungId: string,
        mitgliedId: string
    ): Observable<any> {
        const url = this.apiURL + "addmitglied";
        return this.http.post<any>(
            url,
            { mitglied_id: mitgliedId, ausrueckung_id: ausrueckungId },
            StandardHttpOptions
        );
    }

    detachMitgliedFromAusrueckung(
        ausrueckungId: string,
        mitgliedId: string
    ): Observable<any> {
        const url = this.apiURL + "removemitglied";
        return this.http.post<any>(
            url,
            { mitglied_id: mitgliedId, ausrueckung_id: ausrueckungId },
            StandardHttpOptions
        );
    }

    attachMitgliedToGruppe(
        gruppenId: string,
        mitgliedId: string
    ): Observable<any> {
        const url = this.apiURL + "addmitgliedgruppe";
        return this.http.post<any>(
            url,
            { mitglied_id: mitgliedId, gruppe_id: gruppenId },
            StandardHttpOptions
        );
    }

    detachMitgliedFromGruppe(
        gruppenId: string,
        mitgliedId: string
    ): Observable<any> {
        const url = this.apiURL + "removemitgliedgruppe";
        return this.http.post<any>(
            url,
            { mitglied_id: mitgliedId, gruppe_id: gruppenId },
            StandardHttpOptions
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
