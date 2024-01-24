import { Injectable } from "@angular/core";
import { Termin } from "src/app/models/Termin";
import { MkjDatePipe } from "src/app/pipes/mkj-date.pipe";
import {
    DisplayModelConfiguration,
    DisplayModelField,
} from "./display-model-configuration.interface";

@Injectable()
export class TerminDisplayModel implements DisplayModelConfiguration<Termin> {
    constructor(private datePipe: MkjDatePipe) {}

    public fields: DisplayModelField<Termin>[] = [
        {
            label: "Gruppe",
            getValue: (model: Termin) => model.gruppe?.name?.toUpperCase(),
        },
        {
            label: "Name",
            getValue: (model: Termin) => model.name,
        },
        {
            label: "Termin",
            getValue: (model: Termin) => {
                const vonDatum = this.datePipe.transform(
                    model.vonDatum,
                    "d. MMMM YYYY"
                );

                if (model.treffzeit) {
                    return `${vonDatum} ${model.treffzeit}`;
                } else if (model.vonZeit) {
                    return `${vonDatum} ${model.vonZeit}`;
                } else {
                    return vonDatum;
                }
            },
        },
        {
            label: "Dauert bis",
            getValue: (model: Termin) => {
                if (model.vonDatum === model.bisDatum) {
                    return model.bisZeit;
                }

                const bisDatum = this.datePipe.transform(
                    model.bisDatum,
                    "d. MMMM YYYY"
                );

                if (model.bisZeit) {
                    return `${bisDatum} ${model.bisZeit}`;
                } else {
                    return bisDatum;
                }
            },
        },
        {
            label: "Ort",
            getValue: (model: Termin) => model.ort,
        },
        {
            label: "Infos",
            getValue: (model: Termin) => model.infoMusiker,
            styleClass: "md:col-6 col-12",
        },
        {
            label: "Öffentliche Beschreibung",
            getValue: (model: Termin) => model.beschreibung,
            styleClass: "md:col-6 col-12",
        },
    ];
}
