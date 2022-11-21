import { Component, OnInit } from "@angular/core";
import { Gruppe } from "src/app/models/Gruppe";
import { GruppenApiService } from "src/app/services/gruppen-api.service";

@Component({
    selector: "gruppen-overview",
    templateUrl: "./gruppen-overview.component.html",
    styleUrls: ["./gruppen-overview.component.scss"],
})
export class GruppenOverviewComponent implements OnInit {
    public gruppen: Gruppe[];

    constructor(private gruppenService: GruppenApiService) {}

    public ngOnInit(): void {
        this.loadGruppen();
    }

    private loadGruppen() {
        this.gruppenService
            .getAllGruppen({
                includeGruppenleiter: true,
                includeMitglieder: true,
            })
            .subscribe({
                next: (res) => {
                    this.gruppen = res;
                },
            });
    }
}
