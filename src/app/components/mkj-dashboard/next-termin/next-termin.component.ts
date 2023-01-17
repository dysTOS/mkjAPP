import { Component, OnInit } from "@angular/core";
import { Termin } from "src/app/models/Termin";
import { TermineApiService } from "src/app/services/api/termine-api.service";

@Component({
    selector: "next-termin",
    templateUrl: "./next-termin.component.html",
    styleUrls: ["./next-termin.component.scss"],
})
export class NextTerminComponent {
    private _skip: number = 0;
    public get skip(): number {
        return this._skip;
    }
    public set skip(value: number) {
        this._skip = value;
        this.nextAusrueckung = null;
        this.getNextTermin();
    }

    public nextAusrueckung: Termin;
    public loading: boolean = false;

    constructor(private terminService: TermineApiService) {
        this.getNextTermin();
    }

    public getNextTermin(): void {
        this.loading = true;
        this.terminService.getNextTermin(this.skip).subscribe({
            next: (ausrueckung) => {
                this.nextAusrueckung = ausrueckung;
                this.loading = false;
            },
            error: (error) => {
                this.loading = false;
            },
        });
    }
}
