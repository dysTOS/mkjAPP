import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
    selector: "mkj-notenmappe-form",
    templateUrl: "./mkj-notenmappe-form.component.html",
    styleUrls: ["./mkj-notenmappe-form.component.scss"],
})
export class MkjNotenmappeFormComponent {
    @Input()
    public formGroup: FormGroup;

    constructor() {}
}
