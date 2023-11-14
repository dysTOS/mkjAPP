import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { UiConfigurations } from "src/app/interfaces/UiConfigurations";
import { StandardHttpOptions } from "src/app/interfaces/api-middleware";

@Injectable({
    providedIn: "root",
})
export class ConfigApiService {
    protected apiUrl: string = environment.apiUrl + "configs";

    constructor(private httpClient: HttpClient) {}

    public getConfigs(): Observable<UiConfigurations> {
        return this.httpClient.get<UiConfigurations>(
            this.apiUrl,
            StandardHttpOptions
        );
    }

    public saveConfigs(config: UiConfigurations): Observable<UiConfigurations> {
        return this.httpClient.post<UiConfigurations>(
            this.apiUrl,
            config,
            StandardHttpOptions
        );
    }
}
