import { FormBuilder, Validators } from "@angular/forms";
import { Mitglied } from "src/app/models/Mitglied";

export abstract class MitgliedFormHelper {
    public static getMitgliedFormGroup(fb: FormBuilder, mitglied?: Mitglied) {
        return fb.group({
            id: [mitglied?.id ?? null],
            user_id: [mitglied?.user_id ?? null],
            vorname: [mitglied?.vorname ?? null, Validators.required],
            zuname: [mitglied?.zuname ?? null, Validators.required],
            email: [
                mitglied?.email ?? null,
                [Validators.required, Validators.email],
            ],
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
            aktiv: [mitglied?.aktiv ?? false],
            eintrittDatum: [mitglied?.eintrittDatum ?? null],
            austrittDatum: [mitglied?.austrittDatum ?? null],
            created_at: [mitglied?.created_at ?? null],
            updated_at: [mitglied?.updated_at ?? null],
        });
    }
}
