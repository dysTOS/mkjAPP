import { Mitglied } from "src/app/models/Mitglied";
import {
    ListConfiguration,
    MkjListColumn,
    MkjListSelectionMode,
    MkjListSort,
} from "src/app/utilities/_list-configurations/_list-configuration.class";

export class GruppeMitgliederListConfig implements ListConfiguration<Mitglied> {
    listName: string = "gruppe-mitglieder";
    selectionMode: MkjListSelectionMode = "single";
    hideHeader: boolean = true;
    showTotalCount = true;
    sort: MkjListSort<Mitglied> = {
        field: "zuname",
        order: 1,
    };
    columns: MkjListColumn<Mitglied>[] = [
        {
            header: "Mitglied",
            type: "value",
            getValue: (item: Mitglied) => item.vorname + " " + item.zuname,
        },
    ];
}
