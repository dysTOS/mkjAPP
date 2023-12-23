import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
    StandardHttpOptions,
    MessageOutput,
} from "src/app/interfaces/api-middleware";
import { Gruppe } from "src/app/models/Gruppe";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class TeilnahmenApiService {
    private apiURL = environment.apiUrl;

    constructor(private http: HttpClient) {}

    public getTeilnahmenForTermin(terminId: string): Observable<Gruppe[]> {
        const url = this.apiURL + "teilnahmen";
        return this.http.post<Gruppe[]>(
            url,
            { termin_id: terminId },
            StandardHttpOptions
        );
    }

    public getTeilnahmeStatus(terminId: string): Observable<any> {
        const url = this.apiURL + "teilnahmestatus";
        return this.http.post<any>(
            url,
            { termin_id: terminId },
            StandardHttpOptions
        );
    }

    public updateTeilnahme(
        terminId: string,
        status: "abwesend" | "anwesend"
    ): Observable<MessageOutput> {
        const url = this.apiURL + "teilnahme";
        return this.http.post<MessageOutput>(
            url,
            { termin_id: terminId, status: status },
            StandardHttpOptions
        );
    }

    public removeTeilnahme(terminId: string): Observable<MessageOutput> {
        const url = this.apiURL + "teilnahmeremove";
        return this.http.post<MessageOutput>(
            url,
            { termin_id: terminId },
            StandardHttpOptions
        );
    }
}
