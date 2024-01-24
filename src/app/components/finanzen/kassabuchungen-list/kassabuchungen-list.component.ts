import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { Kassabuchung, KassabuchungTyp } from "src/app/models/Kassabuch";
import { KassabuchungenApiService } from "src/app/services/api/kassabuchungen-api.service";
import { KassabuchungenListConfig } from "./kassabuchungen-list-config.class";
import { KassabuchungenListDatasource } from "./kassabuchungen-list-datasource.class";
import { ActivatedRoute, Router } from "@angular/router";
import { PermissionKey } from "src/app/models/User";

@Component({
    selector: "mkj-kassabuchungen-list",
    templateUrl: "./kassabuchungen-list.component.html",
    styleUrl: "./kassabuchungen-list.component.scss",
})
export class KassabuchungenListComponent implements OnChanges {
    @Input()
    public kassabuchId: string;

    public datasource: KassabuchungenListDatasource;
    public readonly listConfig = new KassabuchungenListConfig();
    public readonly BuchungTyp = KassabuchungTyp;
    public selectedKassabuchung: Kassabuchung;
    public dialogVisible = false;
    public readonly Permissions = PermissionKey;

    constructor(
        private apiService: KassabuchungenApiService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    public ngOnChanges(changes: SimpleChanges) {
        if (changes.kassabuchId && this.kassabuchId) {
            this.datasource = new KassabuchungenListDatasource(
                this.apiService,
                this.kassabuchId
            );
        }
    }

    public navigateBuchung(id: string): void {
        this.router.navigate([id], { relativeTo: this.route });
    }

    public navigateRechnung(id: string): void {
        this.router.navigate(["../../rechnung", id], {
            relativeTo: this.route,
        });
    }
}
