import { FormBuilder, Validators } from "@angular/forms";
import { Ausrueckung } from "../models/Ausrueckung";
import { Mitglied } from "../models/Mitglied";

export class UtilFunctions {
    public static findIndexById(id: string, array: Array<any>) {
        let index = -1;
        for (let i = 0; i < array.length; i++) {
            if (array[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }

    public static isDesktop() {
        return window.innerWidth > 1024;
    }

    public static getAusrueckungFormGroup(
        fb: FormBuilder,
        ausrueckung?: Ausrueckung
    ) {
        return fb.group({
            id: [ausrueckung?.id ?? null],
            name: [ausrueckung?.name ?? null, Validators.required],
            beschreibung: [ausrueckung?.beschreibung ?? null],
            infoMusiker: [ausrueckung?.infoMusiker ?? null],
            oeffentlich: [ausrueckung?.oeffentlich ?? false],
            ort: [ausrueckung?.ort ?? null],
            kategorie: [ausrueckung?.kategorie ?? null, Validators.required],
            status: [ausrueckung?.status ?? null, Validators.required],
            vonDatum: [ausrueckung?.vonDatum ?? null, Validators.required],
            vonZeit: [ausrueckung?.vonZeit ?? null],
            bisDatum: [ausrueckung?.bisDatum ?? null, Validators.required],
            bisZeit: [ausrueckung?.bisZeit ?? null],
            treffzeit: [ausrueckung?.treffzeit ?? null],
            created_at: [ausrueckung?.created_at ?? null],
            updated_at: [ausrueckung?.updated_at ?? null],
        });
    }

    public static getMitgliedFormGroup(fb: FormBuilder, mitglied?: Mitglied) {
        return fb.group({
            id: [mitglied?.id ?? null],
            user_id: [mitglied?.user_id ?? null],
            vorname: [mitglied?.vorname ?? null, Validators.required],
            zuname: [mitglied?.zuname ?? null, Validators.required],
            email: [mitglied?.email ?? null, Validators.required],
            titelVor: [mitglied?.titelVor ?? null],
            titelNach: [mitglied?.titelNach ?? null],
            geburtsdatum: [mitglied?.geburtsdatum ?? null],
            geschlecht: [mitglied?.geschlecht ?? null],
            strasse: [mitglied?.strasse ?? null],
            hausnummer: [mitglied?.hausnummer ?? null],
            ort: [mitglied?.ort ?? null],
            plz: [mitglied?.plz ?? null],
            telefonHaupt: [mitglied?.telefonHaupt ?? null],
            telefonMobil: [mitglied?.telefonMobil ?? null],
            beruf: [mitglied?.beruf ?? null],
            aktiv: [mitglied?.aktiv ?? null],
            eintrittDatum: [mitglied?.eintrittDatum ?? null],
            austrittDatum: [mitglied?.austrittDatum ?? null],
            created_at: [mitglied?.created_at ?? null],
            updated_at: [mitglied?.updated_at ?? null],
        });
    }
}
