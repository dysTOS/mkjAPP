import { Component, OnInit } from "@angular/core";
import { Gruppe } from "src/app/models/Gruppe";
import { Mitglied } from "src/app/models/Mitglied";
import { GruppenApiService } from "src/app/services/gruppen-api.service";
import { InfoService } from "src/app/services/info.service";
import { MkjToolbarService } from "src/app/utilities/mkj-toolbar/mkj-toolbar.service";

@Component({
    selector: "gruppen-overview",
    templateUrl: "./gruppen-overview.component.html",
    styleUrls: ["./gruppen-overview.component.scss"],
})
export class GruppenOverviewComponent implements OnInit {
    public gruppen: Gruppe[];
    public mitglieder: Mitglied[];

    public gruppenLoading: boolean = false;
    public mitgliederLoading: boolean = false;

    constructor(
        private gruppenService: GruppenApiService,
        private infoService: InfoService,
        private toolbarService: MkjToolbarService
    ) {
        this.toolbarService.header = "Register & Gruppen";
    }

    public ngOnInit(): void {
        this.loadGruppen();
    }

    public onTabChange(index: number) {
        this.mitglieder = null;
        this.loadMitglieder(this.gruppen[index].id);
    }

    private loadGruppen() {
        this.gruppenLoading = true;
        this.gruppenService
            .getAllGruppen({
                includeGruppenleiter: true,
                includeMitglieder: true,
            })
            .subscribe({
                next: (res) => {
                    this.gruppen = res;
                    this.gruppenLoading = false;
                },
                error: (err) => {
                    this.gruppenLoading = false;
                    this.infoService.error(err);
                },
            });
    }

    private loadMitglieder(id: string) {
        this.mitgliederLoading = true;
        this.gruppenService.getMitgliederOfGruppe(id).subscribe({
            next: (res) => {
                this.mitglieder = res;
                this.mitgliederLoading = false;
            },
            error: (err) => {
                this.mitgliederLoading = false;
                this.infoService.error(err);
            },
        });
    }
}
