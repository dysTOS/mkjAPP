import { Component, OnInit } from "@angular/core";
import { AppComponent } from "src/app/app.component";
import { ThemeService } from "src/app/mkjServices/theme.service";

@Component({
    selector: "app-lokale-einstellungen",
    templateUrl: "./lokale-einstellungen.component.html",
    styleUrls: ["./lokale-einstellungen.component.scss"],
})
export class LokaleEinstellungenComponent implements OnInit {
    constructor(public themeService: ThemeService) {}

    ngOnInit(): void {}

    public changeTheme() {
        this.themeService.changeTheme();
    }

    public changeThemeStyle(compactMode: boolean) {
        this.themeService.changeThemeStyle(compactMode);
    }
}
