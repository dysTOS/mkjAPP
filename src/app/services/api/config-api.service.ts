import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { UiNamingConfig } from "src/app/models/UiNamingConfig";
import { StandardHttpOptions } from "src/app/interfaces/api-middleware";

@Injectable({
    providedIn: "root",
})
export class ConfigApiService {
    protected apiUrl: string = environment.apiUrl + "namingconfig";

    constructor(private httpClient: HttpClient) {}

    public getUiNamingConfig(): Observable<UiNamingConfig> {
        return this.httpClient.get<UiNamingConfig>(
            this.apiUrl,
            StandardHttpOptions
        );
    }

    public setUiNamingConfig(config: UiNamingConfig): Observable<void> {
        return this.httpClient.post<void>(
            this.apiUrl,
            { config },
            StandardHttpOptions
        );
    }
}
