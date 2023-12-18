import { Noten, NotenGattungMap } from "src/app/models/Noten";
import {
    ListConfiguration,
    MkjListColumn,
    MkjListGlobalFilterConfiguration,
    MkjListSortConfiguration,
} from "./_list-configuration.class";
import { Injectable } from "@angular/core";
import { Anschrift } from "src/app/models/Anschrift";

@Injectable()
export class AnschriftenListConfig implements ListConfiguration<Anschrift> {
    listName: string = "Anschriften";
    showTotalCount = true;
    sort: MkjListSortConfiguration<Anschrift> = {
        field: "zuname",
        order: 1,
    };
    globalFilter: MkjListGlobalFilterConfiguration<Anschrift> = {
        fields: ["vorname", "zuname", "firma"],
        matchMode: "contains",
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
