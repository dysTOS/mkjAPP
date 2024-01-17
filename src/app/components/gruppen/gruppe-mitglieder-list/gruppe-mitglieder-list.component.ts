import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { Mitglied } from "src/app/models/Mitglied";
import { GruppenApiService } from "src/app/services/api/gruppen-api.service";
import { InfoService } from "src/app/services/info.service";
import { MitgliedAutoCompleteConfigiguration } from "src/app/utilities/_autocomplete-configurations/mitglied-autocomplete-config.class";
import { MitgliederListDatasource } from "src/app/utilities/_list-datasources/mitglieder-list-datasource.class";
import { GruppeMitgliederListConfig } from "./gruppe-mitglieder-list-config.class";
import { GruppeMitgliederListDatasource } from "./gruppe-mitglieder-list-datasource.class";
import { AppConfigService } from "src/app/services/app-config.service";

@Component({
    selector: "mkj-gruppe-mitglieder-list",
    templateUrl: "./gruppe-mitglieder-list.component.html",
    styleUrl: "./gruppe-mitglieder-list.component.scss",
    providers: [MitgliederListDatasource],
})
export class GruppeMitgliederListComponent implements OnChanges {
    @Input()
    public gruppeId: string;

    public listDatasource: GruppeMitgliederListDatasource;
    public listConfig = new GruppeMitgliederListConfig();

    public selectedMitglied: Mitglied;
    public tableLocked: boolean = false;

    public readonly mitgliedAutoCompleteConfig =
        new MitgliedAutoCompleteConfigiguration(false);

    constructor(
        public mitgliedDatasource: MitgliederListDatasource,
        public configService: AppConfigService,
        private gruppenService: GruppenApiService,
        private infoService: InfoService
    ) {}

    public ngOnChanges(changes: SimpleChanges) {
        if (changes.gruppeId) {
            this.setListDatasource();
        }
    }

    private setListDatasource(): void {
        if (this.gruppeId) {
            this.listDatasource = new GruppeMitgliederListDatasource(
                this.gruppenService,
                this.gruppeId
            );
        } else {
            this.listDatasource = null;
        }
    }

    public addMitglied(mitglied: Mitglied) {
        if (!mitglied) return;

        this.tableLocked = true;
        this.gruppenService
            .addMitgliedToGruppe({
                subjectId: mitglied.id,
                collectionId: this.gruppeId,
            })
            .subscribe({
                next: (res) => {
                    if (res.success) {
                        this.setListDatasource();
                        this.infoService.info(res.message);
                    }
                    this.tableLocked = false;
                    this.selectedMitglied = null;
                },
                error: (err) => {
                    this.infoService.error(err);
                    this.selectedMitglied = null;
                    this.tableLocked = false;
                },
            });
    }

    public removeMitglied(id: string) {
        this.tableLocked = true;
        this.gruppenService
            .removeMitgliedFromGruppe({
                subjectId: id,
                collectionId: this.gruppeId,
            })
            .subscribe({
                next: (res) => {
                    if (res.success) {
                        this.setListDatasource();
                        this.infoService.info(res.message);
                    }
                    this.tableLocked = false;
                },
                error: (err) => {
                    this.infoService.error(err);
                    this.tableLocked = false;
                },
            });
    }
}
