import { Injectable } from "@angular/core";
import { Anschrift } from "src/app/models/Anschrift";
import {
    ListConfiguration,
    MkjListColumn,
    MkjListGlobalFilter,
    MkjListSelectionMode,
    MkjListSort,
} from "./_list-configuration.class";

@Injectable()
export class AnschriftenListConfig implements ListConfiguration<Anschrift> {
    listName: string = "Anschriften";
    selectionMode: MkjListSelectionMode = "single";
    showTotalCount = true;
    sort: MkjListSort<Anschrift> = {
        field: "zuname",
        order: 1,
    };
    globalFilter: MkjListGlobalFilter<Anschrift> = {
        fields: ["vorname", "zuname", "firma"],
    };
    columns: MkjListColumn<Anschrift>[] = [
        {
            header: "Vorname",
            field: "vorname",
            type: "string",
            sortable: true,
        },
        {
            header: "Nachname",
            field: "zuname",
            type: "string",
            sortable: true,
        },
        {
            header: "Firma",
            field: "firma",
            type: "string",
            sortable: true,
        },
    ];
}
