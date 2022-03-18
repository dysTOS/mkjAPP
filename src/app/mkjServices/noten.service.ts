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

    constructor(private http: HttpClient) {}

    getAllNoten(): Observable<Noten[]> {
        const url = this.apiURL + "/api/noten";
        return this.http.get<Noten[]>(url, httpOptions);
    }
}
