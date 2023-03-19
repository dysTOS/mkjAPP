import { Component, Input } from "@angular/core";
import { Noten } from "src/app/models/Noten";

@Component({
    selector: "noten-card",
    templateUrl: "./noten-card.component.html",
    styleUrls: ["./noten-card.component.scss"],
})
export class NotenCardComponent {
    @Input()
    public noten: Noten;

    constructor() {}
}
