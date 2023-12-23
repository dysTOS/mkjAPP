import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { KassabuchungTyp } from "src/app/models/Kassabuch";
import { KassabuchungenApiService } from "src/app/services/api/kassabuchungen-api.service";
import { KassabuchungenListConfig } from "./kassabuchungen-list-config.class";
import { KassabuchungenListDatasource } from "./kassabuchungen-list-datasource.class";

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

    constructor(private apiService: KassabuchungenApiService) {}

    public ngOnChanges(changes: SimpleChanges) {
        if (changes.kassabuchId && this.kassabuchId) {
            this.datasource = new KassabuchungenListDatasource(
                this.apiService,
                this.kassabuchId
            );
        }
    }
}
