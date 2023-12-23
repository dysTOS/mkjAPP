import { Injectable } from "@angular/core";
import { Instrument } from "src/app/models/Instrument";
import { AppConfigService } from "src/app/services/app-config.service";
import {
    ListConfiguration,
    MkjListColumn,
    MkjListGlobalFilter,
    MkjListSelectionMode,
    MkjListSort,
} from "./_list-configuration.class";

@Injectable()
export class InstrumenteListConfig implements ListConfiguration<Instrument> {
    constructor(private appNaming: AppConfigService) {}

    listName: string = "Instrumente";
    selectionMode: MkjListSelectionMode = "single";
    showTotalCount = true;
    sort: MkjListSort<Instrument> = {
        field: "marke",
        order: 1,
    };
    globalFilter: MkjListGlobalFilter<Instrument> = {
        fields: ["bezeichnung", "marke"],
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
