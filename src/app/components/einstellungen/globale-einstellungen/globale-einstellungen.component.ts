import { Component } from "@angular/core";
import { UiConfigurations } from "src/app/interfaces/UiConfigurations";
import { ConfigurationService } from "src/app/services/configuration.service";
import { MkjToolbarService } from "src/app/utilities/mkj-toolbar/mkj-toolbar.service";

@Component({
    selector: "app-globale-einstellungen",
    templateUrl: "./globale-einstellungen.component.html",
    styleUrls: ["./globale-einstellungen.component.scss"],
})
export class GlobaleEinstellungenComponent {
    public readonly uiConfig: UiConfigurations;
    public saving: boolean = false;

    constructor(
        public configService: ConfigurationService,
        toolBar: MkjToolbarService
    ) {
        toolBar.header = "Globale Einstellungen";
        this.uiConfig = configService.getEditConfig();
    }

    public save(): void {
        this.saving = true;
        this.configService
            .saveUiConfig(this.uiConfig)
            .subscribe({ next: () => (this.saving = false) });
    }
}
