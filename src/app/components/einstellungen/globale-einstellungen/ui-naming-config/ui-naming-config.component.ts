import { Component } from "@angular/core";
import * as _ from "lodash";
import { AppConfigService } from "src/app/services/app-config.service";

@Component({
    selector: "app-ui-naming-config",
    templateUrl: "./ui-naming-config.component.html",
    styleUrls: ["./ui-naming-config.component.scss"],
})
export class UiNamingConfigComponent {
    public readonly appNaming = _.cloneDeep(this.configService.appNaming);
    public readonly editNaming = _.cloneDeep(this.configService.appNaming);

    constructor(private configService: AppConfigService) {}

    public updateNaming(): void {
        this.configService.updateAppNamingConfig(this.editNaming);
    }
}
