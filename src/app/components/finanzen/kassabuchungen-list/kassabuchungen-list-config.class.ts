import { Kassabuchung } from "src/app/models/Kassabuch";
import {
    ListConfiguration,
    MkjListColumn,
    MkjListSelectionMode,
    MkjListSort,
} from "src/app/utilities/_list-configurations/_list-configuration.class";

export class KassabuchungenListConfig
    implements ListConfiguration<Kassabuchung>
{
    listName: string = "kassabuchungen";
    selectionMode: MkjListSelectionMode = "single";
    hideHeader: boolean = false;
    lazyLoad = true;
    showTotalCount = true;
    sort: MkjListSort<Kassabuchung> = {
        field: "datum",
        order: -1,
    };
    columns: MkjListColumn<Kassabuchung>[] = [
        {
            header: null,
            type: "template",
            templateName: "tagTemplate",
            styleClass: "w-6rem",
        },
        {
            header: "Nr",
            type: "string",
            field: "nummer",
            styleClass: "w-8rem",
        },
        {
            header: "Datum",
            type: "date",
            field: "datum",
            styleClass: "w-10rem",
        },
        {
            header: "Betrag",
            type: "currency",
            field: "gesamtpreis",
            styleClass: "w-10rem",
        },
        {
            header: "Kontrahent",
            type: "string",
            getValue: (kassabuchung: Kassabuchung) => {
                return (
                    kassabuchung.anschrift?.firma ??
                    kassabuchung.anschrift?.vorname +
                        " " +
                        kassabuchung.anschrift?.zuname
                );
            },
        },
    ];
}
