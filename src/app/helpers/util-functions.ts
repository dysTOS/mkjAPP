import { FormBuilder, Validators } from "@angular/forms";
import { Gruppe } from "../models/Gruppe";
import { Instrument } from "../models/Instrument";
import { Noten } from "../models/Noten";
import { Termin } from "../models/Termin";
import { MkjDropdownOption } from "../utilities/form-input-components/mkj-dropdown/mkj-dropdown.component";

export abstract class UtilFunctions {
    public static getDropdownOptionsFromEnum(
        enumObject: any
    ): MkjDropdownOption[] {
        return Object.entries(enumObject).map((entry) => {
            return { label: entry[0], value: entry[1] };
        });
    }

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

    public static generateRandomHexColor(): string {
        let color = "#";
        const possible = "0123456789ABCDEF";

        for (let i = 0; i < 6; i++) {
            color += possible.charAt(
                Math.floor(Math.random() * possible.length)
            );
        }

        return color;
    }

    public static isDarkBackground(backgroundColor: string): boolean {
        if (!backgroundColor) return false;
        const color = backgroundColor.substring(1); // remove the leading '#'
        const r = parseInt(color.substring(0, 2), 16);
        const g = parseInt(color.substring(2, 4), 16);
        const b = parseInt(color.substring(4, 6), 16);
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

        if (luminance > 0.5) {
            // use a dark font color for light backgrounds
            return false;
        } else {
            // use a light font color for dark backgrounds
            return true;
        }
    }

    public static getAusrueckungFormGroup(
        fb: FormBuilder,
        ausrueckung?: Termin
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
            gruppe_id: [ausrueckung?.gruppe_id ?? null],
            created_at: [ausrueckung?.created_at ?? null],
            updated_at: [ausrueckung?.updated_at ?? null],
        });
    }

    public static getNotenFormGroup(fb: FormBuilder, noten?: Noten) {
        return fb.group({
            id: [noten?.id ?? null],
            titel: [noten?.titel ?? null, Validators.required],
            inventarId: [noten?.inventarId ?? null],
            komponist: [noten?.komponist ?? null],
            arrangeur: [noten?.arrangeur ?? null],
            verlag: [noten?.verlag ?? null],
            gattung: [noten?.gattung ?? null],
            ausgeliehenAb: [noten?.ausgeliehenAb ?? null],
            ausgeliehenVon: [noten?.ausgeliehenVon ?? null],
            anmerkungen: [noten?.anmerkungen ?? null],
            aufbewahrungsort: [noten?.aufbewahrungsort ?? null],
            links: [noten?.links ?? null],
            created_at: [noten?.created_at ?? null],
            updated_at: [noten?.updated_at ?? null],
        });
    }

    public static getInstrumentFormGroup(
        fb: FormBuilder,
        instrument?: Instrument
    ) {
        return fb.group({
            id: [instrument?.id ?? null],
            marke: [instrument?.marke ?? null, Validators.required],
            bezeichnung: [instrument?.bezeichnung ?? null, Validators.required],
            anschaffungsdatum: [instrument?.anschaffungsdatum ?? null],
            verkaeufer: [instrument?.verkaeufer ?? null],
            schaeden: [instrument?.schaeden ?? null],
            anmerkungen: [instrument?.anmerkungen ?? null],
            aufbewahrungsort: [instrument?.aufbewahrungsort ?? null],
            mitglied_id: [instrument?.mitglied_id ?? null],
            mitglied: [instrument?.mitglied ?? null],
            gruppe_id: [instrument?.gruppe_id ?? null],
            gruppe: [instrument?.gruppe ?? null],
            created_at: [instrument?.created_at ?? null],
            updated_at: [instrument?.updated_at ?? null],
        });
    }

    public static getGruppeFormGroup(fb: FormBuilder, gruppe?: Gruppe) {
        return fb.group({
            id: [gruppe?.id ?? null],
            name: [gruppe?.name ?? null, Validators.required],
            gruppenleiter_mitglied_id: [
                gruppe?.gruppenleiter_mitglied_id ?? null,
            ],
            register: [gruppe?.register ?? null],
            color: [gruppe?.color ?? null],
            gruppenleiter: [gruppe?.gruppenleiter ?? null],
        });
    }
}
