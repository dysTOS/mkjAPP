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
    private _appNaming = new BehaviorSubject<UiNamingConfig>(null);
    public get appNaming(): UiNamingConfig {
        return this._appNaming.value;
    }

    private _terminConfig = new BehaviorSubject<UiTerminConfig>(null);
    public get terminConfig(): UiTerminConfig {
        return this._terminConfig.value;
    }

    constructor(
        private configService: ConfigApiService,
        private infoService: InfoService
    ) {}

    public initAppNamingConfig(): Observable<void> {
        return this.configService.getConfigs().pipe(
            tap((config) => this.setInternalConfigs(config)),
            map((config) => null)
        );
    }

    public updateAppNamingConfig(naming: UiNamingConfig) {
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
                this.setInternalConfigs(res);
            }),
            map((_) => null)
        );
    }

    private setInternalConfigs(config: UiConfigurations): void {
        this._appNaming.next(config.uiNaming);
        this._terminConfig.next(config.terminConfig);
    }
}
