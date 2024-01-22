import { Component, Input } from "@angular/core";
import { UiNamingConfig } from "src/app/interfaces/UiConfigurations";

@Component({
    selector: "app-ui-naming-config",
    templateUrl: "./ui-naming-config.component.html",
})
export class UiNamingConfigComponent {
    @Input({ required: true }) public namingConfig: UiNamingConfig;
}
