import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { UtilFunctions } from "src/app/helpers/util-functions";
import { Noten } from "src/app/models/Noten";

@Component({
    selector: "app-noten-editor",
    templateUrl: "./noten-editor.component.html",
    styleUrls: ["./noten-editor.component.scss"],
})
export class NotenEditorComponent implements OnInit {
    @Input()
    noten: Noten;

    //TODO make routeable edit-component of this
    public formGroup: FormGroup;

    constructor(fb: FormBuilder) {
        this.formGroup = UtilFunctions.getNotenFormGroup(fb, this.noten);
        this.formGroup.updateValueAndValidity();
    }

    ngOnInit(): void {}
}
