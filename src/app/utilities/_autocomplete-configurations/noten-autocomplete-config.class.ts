import { Noten } from "src/app/models/Noten";
import { KeyOf } from "src/app/types/KeyOf";
import {
    AutoCompleteColumn,
    AutoCompleteConfiguration,
} from "./_autocomplete-configuration.class";

export class NotenAutoCompleteConfigiguration
    implements AutoCompleteConfiguration<Noten>
{
    public searchFields: Array<KeyOf<Noten>> = ["titel", "komponist"];
    public controlValueIsDataKey = false;
    public columns: AutoCompleteColumn<Noten>[] = [
        {
            header: "Titel",
            field: "titel",
        },
        {
            header: "Gattung",
            field: "gattung",
            styleClass: "opacity-50",
        },
        {
            header: "Komponist",
            field: "komponist",
            styleClass: "opacity-50",
        },
    ];

    public getDisplayValue = (item: Noten) => `${item.titel}`;
}
