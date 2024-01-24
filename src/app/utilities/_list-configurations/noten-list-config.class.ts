import { Noten, NotenGattungMap } from "src/app/models/Noten";
import {
    ListConfiguration,
    MkjListColumn,
    MkjListGlobalFilter,
    MkjListSelectionMode,
    MkjListSort,
} from "./_list-configuration.class";
import { Injectable } from "@angular/core";

@Injectable()
export class NotenListConfig implements ListConfiguration<Noten> {
    listName: string = "Noten";
    selectionMode: MkjListSelectionMode = "single";
    showTotalCount = true;
    lazyLoad = true;
    sort: MkjListSort<Noten> = {
        field: "titel",
        order: 1,
    };
    globalFilter: MkjListGlobalFilter<Noten> = {
        fields: ["titel", "komponist", "arrangeur"],
    };
    columns: MkjListColumn<Noten>[] = [
        {
            header: "ID",
            field: "inventarId",
            type: "string",
            styleClass: "w-5rem",
            sortable: true,
        },
        {
            header: "Titel",
            field: "titel",
            type: "string",
            sortable: true,
        },
        {
            header: "Komponist",
            field: "komponist",
            type: "string",
            styleClass: "not-on-small",
        },
        {
            header: "Arrangeur",
            field: "arrangeur",
            type: "string",
            styleClass: "not-on-small",
        },
        {
            header: "Gattung",
            field: "gattung",
            type: "string",
            styleClass: "",
            sortable: true,
            filter: {
                filterOptions: [
                    { label: "Kein Filter", value: null },
                    ...NotenGattungMap,
                ],
            },
        },
    ];
}
