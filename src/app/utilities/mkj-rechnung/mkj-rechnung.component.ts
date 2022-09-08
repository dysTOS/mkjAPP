import { Component, Input, OnInit } from "@angular/core";
import { Rechnung } from "src/app/interfaces/Rechnung";

@Component({
    selector: "app-mkj-rechnung",
    templateUrl: "./mkj-rechnung.component.html",
    styleUrls: ["./mkj-rechnung.component.scss"],
})
export class MkjRechnungComponent implements OnInit {
    @Input()
    public re: Rechnung = {
        datum: "2022-02-13",
        gesamtpreis: 22.34,
        empfaenger: {
            vorname: "Roland",
            zuname: "Sams",
            firma: "Gulaschmusi Records",
            strasse: "Kreutererstraße",
            hausnummer: "40",
            plz: "4820",
            ort: "Bad Ischl",
            staat: "AUSTRIA",
        },
        positionen: [
            {
                bezeichnung: "Testposition",
                gesamtpreis: 22.34,
            },
        ],
    };

    constructor() {}

    ngOnInit(): void {}

    public print() {
        window.print();
    }
}
