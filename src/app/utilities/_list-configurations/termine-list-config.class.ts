import { Injectable } from "@angular/core";
import { Termin } from "src/app/models/Termin";
import {
    ListConfiguration,
    MkjListColumn,
    MkjListGlobalFilter,
    MkjListSelectionMode,
    MkjListSort,
} from "./_list-configuration.class";

@Injectable()
export class TermineListConfig implements ListConfiguration<Termin> {
    listName: string = "Termine";
    selectionMode: MkjListSelectionMode = "single";
    showTotalCount = true;
    lazyLoad: boolean = true;
    sort: MkjListSort<Termin> = {
        field: "vonDatum",
        order: 1,
    };
    globalFilter: MkjListGlobalFilter<Termin> = {
        fields: ["name", "vonDatum", "kategorie"],
    };
    columns: MkjListColumn<Termin>[] = [
        {
            header: "Name",
            field: "name",
            type: "template",
            templateName: "nameTemplate",
        },
        {
            header: "Datum",
            field: "vonDatum",
            type: "template",
            templateName: "datumTemplate",
            sortable: true,
        },
        {
            header: "Kategorie",
            field: "kategorie",
            type: "template",
            templateName: "kategorieTemplate",
            styleClass: "not-on-small",
            // filter: {
            //     filterOptions: [
            //         {
            //             label: "Alle",
            //             value: null,
            //         },
            //         {
            //             label: "Aktiv",
            //             value: 1,
            //         },
            //         {
            //             label: "Inaktiv",
            //             value: 0,
            //         },
            //     ],
            // },
        },
        {
            header: "Status",
            field: "status",
            type: "template",
            templateName: "statusTemplate",
            styleClass: "not-on-small",
        },
    ];
}
