import {
    Component,
    Input,
    OnChanges,
    SimpleChanges,
    ViewChild,
} from "@angular/core";
import { GruppeMitgliederListConfig } from "./gruppe-mitglieder-list-config.class";
import { GruppeMitgliederListDatasource } from "./gruppe-mitglieder-list-datasource.class";
import { AutoComplete } from "primeng/autocomplete";
import { Mitglied } from "src/app/models/Mitglied";
import { GruppenApiService } from "src/app/services/api/gruppen-api.service";
import { MitgliederApiService } from "src/app/services/api/mitglieder-api.service";
import { InfoService } from "src/app/services/info.service";

@Component({
    selector: "mkj-gruppe-mitglieder-list",
    templateUrl: "./gruppe-mitglieder-list.component.html",
    styleUrl: "./gruppe-mitglieder-list.component.scss",
})
export class GruppeMitgliederListComponent implements OnChanges {
    @ViewChild("autoComplete")
    private autoComplete: AutoComplete;

    @Input()
    public gruppeId: string;

    public listDatasource: GruppeMitgliederListDatasource;
    public listConfig = new GruppeMitgliederListConfig();

    public tableLocked: boolean = false;
    public mitgliederSearchResult: Mitglied[];

    constructor(
        private gruppenService: GruppenApiService,
        private mitgliederService: MitgliederApiService,
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
        this.autoComplete.clear();
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
                },
                error: (err) => {
                    this.infoService.error(err);
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

    public searchMitglieder(event: any) {
        this.mitgliederService
            .searchMitglieder(event.query)
            .subscribe((data) => {
                this.mitgliederSearchResult = data;
            });
    }
}
