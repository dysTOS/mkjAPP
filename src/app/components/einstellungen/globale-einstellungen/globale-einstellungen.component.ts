import { Component } from "@angular/core";
import { MkjToolbarService } from "src/app/utilities/mkj-toolbar/mkj-toolbar.service";

@Component({
    selector: "app-globale-einstellungen",
    templateUrl: "./globale-einstellungen.component.html",
    styleUrls: ["./globale-einstellungen.component.scss"],
})
export class GlobaleEinstellungenComponent {
    constructor(toolBar: MkjToolbarService) {
        toolBar.header = "Globale Einstellungen";
    }
}
