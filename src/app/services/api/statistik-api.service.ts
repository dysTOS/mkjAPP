import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { StandardHttpOptions } from "src/app/interfaces/api-middleware";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class StatistikApiService {
    private apiURL = environment.apiUrl;

    constructor(private http: HttpClient) {}

    public getTermine(jahr: string): Observable<any> {
        const url = this.apiURL + "statistik/termine";
        return this.http.post<any>(url, { year: jahr }, StandardHttpOptions);
    }

    public getNoten(): Observable<any> {
        const url = this.apiURL + "statistik/noten";
        return this.http.get<any>(url, StandardHttpOptions);
    }

    public getMitglieder(): Observable<any> {
        const url = this.apiURL + "statistik/mitglieder";
        return this.http.get<any>(url, StandardHttpOptions);
    }
}
