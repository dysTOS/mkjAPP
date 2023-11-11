import { Component } from "@angular/core";
import * as _ from "lodash";
import { ConfigApiService } from "src/app/services/api/config-api.service";
import { AppNamingService } from "src/app/services/config.service";
import { InfoService } from "src/app/services/info.service";

@Component({
    selector: "app-ui-naming-config",
    templateUrl: "./ui-naming-config.component.html",
    styleUrls: ["./ui-naming-config.component.scss"],
})
export class UiNamingConfigComponent {
    public readonly appNaming = _.cloneDeep(this.namingService.appNaming);
    public readonly editNaming = _.cloneDeep(this.namingService.appNaming);

    constructor(
        private namingService: AppNamingService,
        private configService: ConfigApiService,
        private infoService: InfoService
    ) {}

    public saveNaming(): void {
        this.configService.setUiNamingConfig(this.editNaming).subscribe({
            next: (_) => this.infoService.success("Einstellungen gespeichert."),
            error: (err) => this.infoService.error(err),
        });
    }
}
