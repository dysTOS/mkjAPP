import { Injectable } from "@angular/core";
import { Anschrift } from "src/app/models/Anschrift";
import { FullNamePipe } from "src/app/pipes/full-name.pipe";
import {
    DisplayModelConfiguration,
    DisplayModelField,
} from "./display-model-configuration.interface";

@Injectable()
export class AnschriftDisplayModel
    implements DisplayModelConfiguration<Anschrift>
{
    constructor(private namePipe: FullNamePipe) {}

    public fields: DisplayModelField<Anschrift>[] = [
        {
            label: "Name",
            getValue: (model: Anschrift) => this.namePipe.transform(model),
        },
        {
            label: "Firma",
            getValue: (model: Anschrift) => model.firma,
        },
        {
            label: "Adresse",
            getValue: (model: Anschrift) =>
                `${model.strasse} ${model.hausnummer}, ${model.plz} ${model.ort}`,
        },
        {
            label: "Telefon Haupt",
            getValue: (model: Anschrift) => model.telefonHaupt,
        },
        {
            label: "Telefon Mobil",
            getValue: (model: Anschrift) => model.telefonMobil,
        },
        {
            label: "E-Mail",
            getValue: (model: Anschrift) => model.email,
        },
        {
            label: "IBAN",
            getValue: (model: Anschrift) => model.IBAN,
        },
        {
            label: "BIC",
            getValue: (model: Anschrift) => model.BIC,
        },
    ];
}
