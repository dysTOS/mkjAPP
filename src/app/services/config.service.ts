import { Injectable } from "@angular/core";
import { ConfigApiService } from "./api/config-api.service";
import { Observable, map, tap } from "rxjs";
import { UiNamingConfig } from "../interfaces/UiNamingConfig";

@Injectable({
    providedIn: "root",
})
export class AppNamingService {
    private _appNaming: UiNamingConfig;
    public get appNaming(): UiNamingConfig {
        return this._appNaming;
    }

    constructor(private configService: ConfigApiService) {}

    public initAppNamingConfig(): Observable<void> {
        return this.configService.getUiNamingConfig().pipe(
            tap((config) => this.setappNaming(config)),
            map((config) => null)
        );
    }

    private setappNaming(config: UiNamingConfig): void {
        this._appNaming = config;
    }
}
