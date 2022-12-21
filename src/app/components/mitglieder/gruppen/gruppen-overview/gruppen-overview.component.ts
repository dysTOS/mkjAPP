import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Gruppe } from "src/app/models/Gruppe";
import { Mitglied } from "src/app/models/Mitglied";
import { PermissionMap } from "src/app/models/User";
import { GruppenApiService } from "src/app/services/api/gruppen-api.service";
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
        private toolbarService: MkjToolbarService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.toolbarService.header = "Register & Gruppen";
        this.toolbarService.buttons = [
            {
                label: "Neue Gruppe",
                icon: "pi pi-plus",
                permissions: [PermissionMap.GRUPPEN_SAVE],
                click: () => this.newGruppe(),
            },
        ];
    }

    public ngOnInit(): void {
        this.loadGruppen();
    }

    public navigateDetails(gruppe: Gruppe) {
        this.router.navigate([gruppe.id], { relativeTo: this.route });
    }

    public newGruppe() {
        this.router.navigate(["neu"], { relativeTo: this.route });
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
                    this.gruppen = res.values;
                    this.gruppenLoading = false;
                },
                error: (err) => {
                    this.gruppenLoading = false;
                    this.infoService.error(err);
                },
            });
    }
}
