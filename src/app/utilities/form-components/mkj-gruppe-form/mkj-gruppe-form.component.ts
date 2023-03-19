import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Mitglied } from "src/app/models/Mitglied";
import { FullNamePipe } from "src/app/pipes/full-name.pipe";

@Component({
    selector: "mkj-gruppe-form",
    templateUrl: "./mkj-gruppe-form.component.html",
    styleUrls: ["./mkj-gruppe-form.component.scss"],
    providers: [FullNamePipe],
})
export class MkjGruppeFormComponent {
    private _formGroup: FormGroup;
    @Input()
    public get formGroup(): FormGroup {
        return this._formGroup;
    }
    public set formGroup(value: FormGroup) {
        this._formGroup = value;
        this.gruppenleiter = value.get("gruppenleiter")?.getRawValue();
    }

    public gruppenleiter: Mitglied;

    constructor() {}

    public setGruppenleiter(leiter: Mitglied) {
        this.formGroup.controls.gruppenleiter_mitglied_id.setValue(leiter?.id);
        this.formGroup.controls.gruppenleiter_mitglied_id.markAsDirty();
    }
}
