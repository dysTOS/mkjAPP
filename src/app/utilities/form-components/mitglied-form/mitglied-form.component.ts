import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { UtilFunctions } from "src/app/helpers/util-functions";
import { controlValidator } from "src/app/providers/control-validator";
import { controlValueAccessor } from "src/app/providers/control-value-accessor";
import { AbstractFormComponent } from "../abstract-form.class";

@Component({
    selector: "mkj-mitglied-form",
    templateUrl: "./mitglied-form.component.html",
    styleUrls: ["./mitglied-form.component.scss"],
    providers: [
        controlValueAccessor(MitgliedFormComponent),
        controlValidator(MitgliedFormComponent),
    ],
})
export class MitgliedFormComponent
    extends AbstractFormComponent
    implements OnInit
{
    constructor(private fb: FormBuilder) {
        super();
        this.form = UtilFunctions.getAusrueckungFormGroup(this.fb);
    }

    ngOnInit(): void {}
}
