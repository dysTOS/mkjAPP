import { Component, Input } from "@angular/core";
import { Termin } from "src/app/models/Termin";

@Component({
    selector: "termin-card",
    templateUrl: "./termin-card.component.html",
    styleUrls: ["./termin-card.component.scss"],
})
export class TerminCardComponent {
    @Input()
    public termin: Termin;

    constructor() {}

}
