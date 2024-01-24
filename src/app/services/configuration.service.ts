import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, map, of, tap } from "rxjs";
import {
    UiConfigurations,
    UiNamingConfig,
    UiNotenConfig,
    UiTerminConfig,
} from "../interfaces/UiConfigurations";
import { ConfigApiService } from "./api/config-api.service";
import { InfoService } from "./info.service";
import * as _ from "lodash";

@Injectable({
    providedIn: "root",
})
export class ConfigurationService {
    private readonly _uiConfig = new BehaviorSubject<UiConfigurations>(null);

    public get uiNaming(): UiNamingConfig {
        return this._uiConfig.value?.uiNaming;
    }

    public get terminConfig(): UiTerminConfig {
        return this._uiConfig.value?.terminConfig;
    }

    public get notenConfig(): UiNotenConfig {
        return this._uiConfig.value?.notenConfig;
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

    public getEditConfig(): UiConfigurations {
        return _.cloneDeep(this._uiConfig.value);
    }

    public saveUiConfig(configurations: UiConfigurations): Observable<void> {
        if (!configurations) return of(null);

        return new Observable((observer) => {
            this.configService.saveConfigs(configurations).subscribe({
                next: (res) => {
                    this._uiConfig.next(res);
                    this.infoService.success("Einstellungen gespeichert.");
                    observer.next(null);
                    observer.complete();
                },
                error: (err) => {
                    this.infoService.error(err);
                    observer.next(null);
                    observer.complete();
                },
            });
        });
    }
}
