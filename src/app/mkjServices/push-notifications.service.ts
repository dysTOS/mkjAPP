import { HttpClient, HttpHeaders } from "@angular/common/http";
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
export class PushNotificationsService {
    private apiURL = environment.apiUrl;

    constructor(private http: HttpClient) {}

    public subscribeUser(sub: PushSubscription) {
        const url = this.apiURL + "/api/pushsub";
        return this.http.post<any>(url, sub, httpOptions);
    }

    public push(): Observable<any> {
        const url = this.apiURL + "/api/push";
        return this.http.get<any>(url);
    }
}
