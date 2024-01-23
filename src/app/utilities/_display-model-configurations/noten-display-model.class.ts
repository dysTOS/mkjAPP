import { Injectable } from "@angular/core";
import {
    DisplayModelConfiguration,
    DisplayModelField,
} from "./display-model-configuration.interface";
import { Noten } from "src/app/models/Noten";

@Injectable()
export class NotenDisplayModel implements DisplayModelConfiguration<Noten> {
    fields: DisplayModelField<Noten>[] = [
        {
            label: "Inventar Nr.",
            field: "titel",
        },
        {
            label: "Komponist",
            field: "komponist",
        },
        {
            label: "Arrangeur",
            field: "arrangeur",
        },
        {
            label: "Verlag",
            field: "verlag",
        },
        {
            label: "Gattung",
            field: "gattung",
        },
        {
            label: "Ausgeliehen von",
            field: "ausgeliehenVon",
        },
        {
            label: "Aufbewahrungsort",
            field: "aufbewahrungsort",
        },
        {
            label: "Anmerkungen",
            field: "aufbewahrungsort",
            styleClass: "lg:col-6 md:col-12 col-12",
        },
        {
            label: "Links",
            type: "links",
            field: "links",
            styleClass: "col-12",
        },
    ];
}
