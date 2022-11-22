import { Component, OnInit } from "@angular/core";
import { Gruppe } from "src/app/models/Gruppe";
import { GruppenApiService } from "src/app/services/gruppen-api.service";
import { InfoService } from "src/app/services/info.service";

@Component({
    selector: "gruppen-overview",
    templateUrl: "./gruppen-overview.component.html",
    styleUrls: ["./gruppen-overview.component.scss"],
})
export class GruppenOverviewComponent implements OnInit {
    public gruppen: Gruppe[];

    public loading: boolean = false;

    constructor(
        private gruppenService: GruppenApiService,
        private infoService: InfoService
    ) {}

    public ngOnInit(): void {
        this.loadGruppen();
    }

    private loadGruppen() {
        this.loading = true;
        this.gruppenService
            .getAllGruppen({
                includeGruppenleiter: true,
                includeMitglieder: true,
            })
            .subscribe({
                next: (res) => {
                    this.gruppen = res;
                    this.loading = false;
                },
                error: (err) => {
                    this.loading = false;
                    this.infoService.error(err);
                },
            });
    }
}
