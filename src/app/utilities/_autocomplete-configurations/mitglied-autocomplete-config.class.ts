import { Mitglied } from "src/app/models/Mitglied";
import { KeyOf } from "src/app/types/KeyOf";
import {
    AutoCompleteColumn,
    AutoCompleteConfiguration,
} from "./_autocomplete-configuration.class";

export class MitgliedAutoCompleteConfigiguration
    implements AutoCompleteConfiguration<Mitglied>
{
    constructor(public controlValueIsDataKey = true) {
        this.controlValueIsDataKey = controlValueIsDataKey;
    }

    public searchFields: Array<KeyOf<Mitglied>> = ["vorname", "zuname"];
    public columns: AutoCompleteColumn<Mitglied>[] = [
        {
            header: "Vorname",
            field: "vorname",
        },
        {
            header: "Zuname",
            field: "zuname",
        },
        {
            header: "Aktiv",
            field: "aktiv",
            styleClass: "opacity-50",
            type: "value",
            getValue: (m: Mitglied) => (m.aktiv ? "Aktiv" : "Inaktiv"),
        },
    ];

    public getDisplayValue = (item: Mitglied) =>
        `${item.vorname} ${item.zuname}`;
}
