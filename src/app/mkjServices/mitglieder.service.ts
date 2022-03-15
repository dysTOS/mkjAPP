import { Mitglied } from 'src/app/mkjInterfaces/Mitglied';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    }),
};

@Injectable({
    providedIn: 'root'
})
export class MitgliederService {
    private selectedMitglied: Mitglied;
    private apiURL = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getAllMitglieder(): Observable<Mitglied[]> {
        const url = this.apiURL + "/api/mitglieder";
        return this.http.get<Mitglied[]>(url, httpOptions);
    }

    getAktiveMitglieder(): Observable<Mitglied[]> {
        const url = this.apiURL + "/api/mitgliederaktiv";
        return this.http.get<Mitglied[]>(url, httpOptions);
    }

    getSingleMitglied(id: number): Observable<Mitglied> {
        const url = this.apiURL + "/api/mitglieder/" + id;
        return this.http.get<Mitglied>(url, httpOptions);
    }

    hasSelectedMitglied(): boolean {
        if (this.selectedMitglied) return true;
        else return false;
    }

    getSelectedMitglied(): Mitglied {
        return this.selectedMitglied
    }

    setSelectedMitglied(mitglied: Mitglied) {
        this.selectedMitglied = mitglied;
    }
}
