import { Injectable } from "@angular/core";
import {
    DisplayModelConfiguration,
    DisplayModelField,
} from "./display-model-configuration.interface";
import { Noten } from "src/app/models/Noten";
import { MkjDatePipe } from "src/app/pipes/mkj-date.pipe";

@Injectable()
export class NotenDisplayModel implements DisplayModelConfiguration<Noten> {
    constructor(private datePipe: MkjDatePipe) {}

    public fields: DisplayModelField<Noten>[] = [
        {
            label: "Inventar Nr.",
            getValue: (model: Noten) => model.inventarId,
        },
        {
            label: "Titel",
            getValue: (model: Noten) => model.titel,
        },
        {
            label: "Komponist",
            getValue: (model: Noten) => model.komponist,
        },
        {
            label: "Arrangeur",
            getValue: (model: Noten) => model.arrangeur,
        },
        {
            label: "Verlag",
            getValue: (model: Noten) => model.verlag,
        },
        {
            label: "Gattung",
            getValue: (model: Noten) => model.gattung,
        },
        {
            label: "Ausgeliehen von",
            getValue: (model: Noten) => model.ausgeliehenVon,
        },
        {
            label: "Ausgeliehen seit",
            getValue: (model: Noten) =>
                this.datePipe.transform(model.ausgeliehenAb),
        },
        {
            label: "Aufbewahrungsort",
            getValue: (model: Noten) => model.aufbewahrungsort,
        },
        {
            label: "Anmerkungen",
            getValue: (model: Noten) => model.anmerkungen,
            styleClass: "lg:col-6 md:col-12 col-12",
        },
        {
            label: "Links",
            type: "links",
            getValue: (model: Noten) => model.links,
            styleClass: "col-12",
        },
    ];
}
