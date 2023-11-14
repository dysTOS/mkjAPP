import { Component, Input, OnInit } from "@angular/core";
import { Kassabuchung } from "src/app/models/Kassabuchung";

@Component({
    selector: "app-mkj-rechnung",
    templateUrl: "./mkj-rechnung.component.html",
    styleUrls: ["./mkj-rechnung.component.scss"],
})
export class MkjRechnungComponent implements OnInit {
    @Input()
    public re: Kassabuchung;

    constructor() {}

    ngOnInit(): void {}

    public print() {
        window.print();
    }
}
