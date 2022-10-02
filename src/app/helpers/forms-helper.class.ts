import { Ausrueckung, AusrueckungFormValue } from "../interfaces/Ausrueckung";

export class FormsHelper {
    public static getFormValueFromAusrueckung(
        ausrueckung: Ausrueckung
    ): AusrueckungFormValue {
        return {
            name: ausrueckung.name,
            beschreibung: ausrueckung.beschreibung,
            infoMusiker: ausrueckung.infoMusiker,
            oeffentlich: ausrueckung.oeffentlich,
            ort: ausrueckung.ort,
            kategorie: ausrueckung.kategorie,
            status: ausrueckung.status,
            vonDatum: ausrueckung.vonDatum,
            vonZeit: ausrueckung.vonZeit,
            bisDatum: ausrueckung.bisDatum,
            bisZeit: ausrueckung.bisZeit,
            treffzeit: ausrueckung.treffzeit,
        };
    }
}
