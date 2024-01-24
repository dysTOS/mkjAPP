import { Injectable } from "@angular/core";
import { Mitglied } from "src/app/models/Mitglied";
import { FullNamePipe } from "src/app/pipes/full-name.pipe";
import {
    DisplayModelConfiguration,
    DisplayModelField,
} from "./display-model-configuration.interface";

@Injectable()
export class MitgliedDisplayModel
    implements DisplayModelConfiguration<Mitglied>
{
    constructor(private namePipe: FullNamePipe) {}

    public fields: DisplayModelField<Mitglied>[] = [
        {
            label: "Name",
            getValue: (model: Mitglied) => this.namePipe.transform(model),
        },
        {
            label: "Adresse",
            getValue: (model: Mitglied) =>
                `${model.strasse} ${model.hausnummer}, ${model.plz} ${model.ort}`,
        },
        {
            label: "Telefon",
            getValue: (model: Mitglied) =>
                model.telefonMobil ?? model.telefonHaupt,
        },
        {
            label: "E-Mail",
            getValue: (model: Mitglied) => model.email,
        },
    ];
}
