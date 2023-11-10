import { Component } from "@angular/core";
import * as _ from "lodash";
import { ConfigApiService } from "src/app/services/api/config-api.service";
import { AppNamingService } from "src/app/services/config.service";

@Component({
    selector: "app-globale-einstellungen",
    templateUrl: "./globale-einstellungen.component.html",
    styleUrls: ["./globale-einstellungen.component.scss"],
})
export class GlobaleEinstellungenComponent {
    public readonly appNaming = _.cloneDeep(this.namingService.appNaming);
    public readonly editNaming = _.cloneDeep(this.namingService.appNaming);

    constructor(
        private namingService: AppNamingService,
        private configService: ConfigApiService
    ) {}

    public saveNaming(): void {
        this.configService.setUiNamingConfig(this.editNaming).subscribe();
    }
}
