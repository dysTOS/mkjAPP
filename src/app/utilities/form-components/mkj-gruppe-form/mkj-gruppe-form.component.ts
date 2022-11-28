import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
    selector: "mkj-gruppe-form",
    templateUrl: "./mkj-gruppe-form.component.html",
    styleUrls: ["./mkj-gruppe-form.component.scss"],
})
export class MkjGruppeFormComponent {
    @Input()
    public formGroup: FormGroup;

    constructor() {}
}
