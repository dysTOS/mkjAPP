import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Notenmappe } from "src/app/models/Noten";

export abstract class NotenmappenFormHelper {
    public static getNotennappeFormGroup(
        fb: FormBuilder,
        mappe?: Notenmappe
    ): FormGroup {
        return fb.group({
            id: [mappe?.id ?? null],
            name: [mappe?.name ?? null, Validators.required],
            hatVerzeichnis: [mappe?.hatVerzeichnis ?? null],
            color: [mappe?.color ?? null],
            noten: fb.array(
                mappe?.noten?.map((noten) => {
                    return fb.group({
                        inventarId: [noten.inventarId ?? null],
                        titel: [noten.titel ?? null],
                    });
                }) ?? []
            ),
        });
    }

    public static patchNotenmappeFormGroup(
        group: FormGroup,
        mappe: Notenmappe
    ): void {
        group.patchValue({
            id: mappe.id,
            name: mappe.name,
            hatVerzeichnis: mappe.hatVerzeichnis,
            color: mappe.color,
            noten: null,
        });
    }
}
