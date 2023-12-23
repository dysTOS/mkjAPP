import { Noten } from "src/app/models/Noten";
import {
    ListConfiguration,
    MkjListColumn,
    MkjListSelectionMode,
    MkjListSort,
} from "src/app/utilities/_list-configurations/_list-configuration.class";

export class MappeNotenListConfig implements ListConfiguration<Noten> {
    listName: string = "mappe-noten";
    selectionMode: MkjListSelectionMode = "single";
    hideHeader: boolean = true;
    showTotalCount = true;
    sort: MkjListSort<Noten> = {
        field: "pivot.orderIndex",
        order: 1,
    };
    columns: MkjListColumn<Noten>[] = [
        {
            header: "Titel",
            type: "string",
            field: "titel",
        },
    ];
}
