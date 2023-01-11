import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
    selector: "mkj-notenmappe-form",
    templateUrl: "./mkj-notenmappe-form.component.html",
    styleUrls: ["./mkj-notenmappe-form.component.scss"],
})
export class MkjNotenmappeFormComponent {
    private _formGroup: FormGroup;
    @Input()
    public get formGroup(): FormGroup {
        return this._formGroup;
    }
    public set formGroup(value: FormGroup) {
        this._formGroup = value;
    }

    constructor() {}
}
