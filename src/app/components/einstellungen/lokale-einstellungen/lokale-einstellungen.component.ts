import { Component } from "@angular/core";
import { ThemeService } from "src/app/services/theme.service";

@Component({
    selector: "app-lokale-einstellungen",
    templateUrl: "./lokale-einstellungen.component.html",
    styleUrls: ["./lokale-einstellungen.component.scss"],
})
export class LokaleEinstellungenComponent {
    constructor(public themeService: ThemeService) {}

    public reloadApp() {
        window.location.reload();
    }
}
