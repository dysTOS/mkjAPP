import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, map, tap } from "rxjs";
import {
    UiConfigurations,
    UiNamingConfig,
    UiTerminConfig,
} from "../interfaces/UiConfigurations";
import { ConfigApiService } from "./api/config-api.service";
import { InfoService } from "./info.service";

@Injectable({
    providedIn: "root",
})
export class AppConfigService {
    private readonly _uiConfig = new BehaviorSubject<UiConfigurations>(null);

    public get uiNaming(): UiNamingConfig {
        return this._uiConfig.value?.uiNaming;
    }

    public get terminConfig(): UiTerminConfig {
        return this._uiConfig.value?.terminConfig;
    }

    constructor(
        private configService: ConfigApiService,
        private infoService: InfoService
    ) {}

    public initAppNamingConfig(): Observable<void> {
        return this.configService.getConfigs().pipe(
            tap((config) => this._uiConfig.next(config)),
            map((config) => null)
        );
    }

    public saveUiNamingConfig(naming: UiNamingConfig) {
        if (!this._uiConfig.value) return;

        const configurations: UiConfigurations = {
            uiNaming: naming,
            terminConfig: this.terminConfig,
        };

        this.permitConfigs(configurations).subscribe({
            next: (_) => this.infoService.success("Einstellungen gespeichert."),
            error: (err) => this.infoService.error(err),
        });
    }

    private permitConfigs(configurations: UiConfigurations): Observable<void> {
        return this.configService.saveConfigs(configurations).pipe(
            tap((res) => {
                this._uiConfig.next(res);
            }),
            map((_) => null)
        );
    }
}
