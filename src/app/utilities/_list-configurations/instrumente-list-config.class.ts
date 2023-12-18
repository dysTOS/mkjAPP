import { Noten, NotenGattungMap } from "src/app/models/Noten";
import {
    ListConfiguration,
    MkjListColumn,
    MkjListGlobalFilterConfiguration,
    MkjListSortConfiguration,
} from "./_list-configuration.class";
import { Injectable } from "@angular/core";
import { Anschrift } from "src/app/models/Anschrift";
import { Instrument } from "src/app/models/Instrument";
import { AppConfigService } from "src/app/services/app-config.service";

@Injectable()
export class InstrumenteListConfig implements ListConfiguration<Instrument> {
    constructor(private appNaming: AppConfigService) {}

    listName: string = "Instrumente";
    showTotalCount = true;
    sort: MkjListSortConfiguration<Instrument> = {
        field: "marke",
        order: 1,
    };
    globalFilter: MkjListGlobalFilterConfiguration<Instrument> = {
        fields: ["bezeichnung", "marke"],
        matchMode: "contains",
    };
    columns: MkjListColumn<Instrument>[] = [
        {
            header: "Bezeichung",
            field: "bezeichnung",
            type: "string",
            sortable: true,
        },
        {
            header: "Marke",
            field: "marke",
            type: "string",
            sortable: true,
        },
        {
            header: this.appNaming.appNaming.Gruppen,
            field: null,
            templateName: "gruppen",
            type: "value",
            getValue: (item: Instrument) => item.gruppe?.name,
        },
    ];
}
