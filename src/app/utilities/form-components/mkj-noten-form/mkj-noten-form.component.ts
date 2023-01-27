import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { NotenGattungMap } from "src/app/models/Noten";

@Component({
    selector: "mkj-noten-form",
    templateUrl: "./mkj-noten-form.component.html",
    styleUrls: ["./mkj-noten-form.component.scss"],
})
export class MkjNotenFormComponent {
    @Input()
    public formGroup: FormGroup;

    public readonly GattungOptions = NotenGattungMap;

    constructor() {}
}
