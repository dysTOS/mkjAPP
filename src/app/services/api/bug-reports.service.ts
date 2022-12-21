import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

const httpOptions = {
    headers: new HttpHeaders({
        "Content-Type": "application/json",
    }),
};

@Injectable({
    providedIn: "root",
})
export class BugReportsService {
    private apiURL = environment.apiUrl + "reports";

    constructor(private http: HttpClient) {}

    public getReports(): Observable<any> {
        return this.http.get(this.apiURL, httpOptions);
    }

    public saveReport(report: any): Observable<any> {
        return this.http.post<any>(this.apiURL, report, httpOptions);
    }
}
