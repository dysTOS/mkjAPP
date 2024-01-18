import { Component, Input, OnInit } from "@angular/core";
import { Gruppe } from "src/app/models/Gruppe";
import { Termin } from "src/app/models/Termin";
import { TeilnahmenApiService } from "src/app/services/api/teilnahmen-api.service";

@Component({
    selector: "teilnahmen-overview",
    templateUrl: "./teilnahmen-overview.component.html",
    styleUrls: ["./teilnahmen-overview.component.scss"],
})
export class TeilnahmenOverviewComponent {
    private _termin: Termin;
    @Input()
    public get termin(): Termin {
        return this._termin;
    }
    public set termin(value: Termin) {
        this._termin = value;
        if (value.id) {
            this.getTeilnahmen(value.id);
        } else {
            this.gruppen = [];
        }
    }

    public gruppen: Gruppe[];
    public loading = false;

    constructor(private teilnahmenService: TeilnahmenApiService) {}

    public getTeilnahmen(id: string): void {
        this.loading = true;
        this.teilnahmenService.getTeilnahmenForTermin(id).subscribe({
            next: (data) => {
                this.gruppen = data;
                this.loading = false;
            },
        });
    }
}
