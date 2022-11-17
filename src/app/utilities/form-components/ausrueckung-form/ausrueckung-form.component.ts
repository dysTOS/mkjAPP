import {
    Ausrueckung,
    AusrueckungKategorieMap,
    AusrueckungStatusMap,
} from "src/app/models/Ausrueckung";
import { Component, Input, OnInit, TemplateRef } from "@angular/core";
import * as moment from "moment";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    UntypedFormBuilder,
    Validators,
} from "@angular/forms";
import { AbstractFormComponent } from "../abstract-form.class";
import { controlValidator } from "src/app/providers/control-validator";
import { controlValueAccessor } from "src/app/providers/control-value-accessor";
import { UtilFunctions } from "src/app/helpers/util-functions";

@Component({
    selector: "mkj-ausrueckung-form",
    templateUrl: "./ausrueckung-form.component.html",
    styleUrls: ["./ausrueckung-form.component.scss"],
    providers: [
        controlValueAccessor(AusrueckungFormComponent),
        controlValidator(AusrueckungFormComponent),
    ],
})
export class AusrueckungFormComponent
    extends AbstractFormComponent
    implements OnInit
{
    public readonly KategorieMap = AusrueckungKategorieMap;
    public readonly StatusMap = AusrueckungStatusMap;

    public severalDays: boolean = false;

    constructor(private fb: FormBuilder) {
        super();
        this.form = UtilFunctions.getAusrueckungFormGroup(this.fb);

        this.subSink.add(
            this.form.get("vonDatum").valueChanges.subscribe((value) => {
                if (this.severalDays === false) {
                    this.form
                        .get("bisDatum")
                        .setValue(value, { emitEvent: false });
                }
                this.updateSeveralDays();
            }),
            this.form.get("bisDatum").valueChanges.subscribe((value) => {
                this.updateSeveralDays();
            }),
            this.form.get("vonZeit").valueChanges.subscribe((value) => {
                this.onVonZeitChange(value);
            })
        );
    }

    public ngOnInit(): void {
        this.updateSeveralDays();
    }

    private updateSeveralDays() {
        if (
            this.form.get("vonDatum").value === this.form.get("bisDatum").value
        ) {
            this.severalDays = false;
        } else {
            this.severalDays = true;
        }
    }

    private onVonZeitChange(value: any) {
        if (!value) {
            this.form.get("bisZeit").setValue(null, { emitEvent: false });
            this.form.get("treffzeit").setValue(null, { emitEvent: false });
            return;
        }

        const object = moment(new Date("2022-01-01T" + value));
        this.form
            .get("bisZeit")
            .setValue(object.add(2, "hours").format("HH:mm"), {
                emitEvent: false,
            });
        this.form
            .get("treffzeit")
            .setValue(object.subtract(30, "minutes").format("HH:mm"), {
                emitEvent: false,
            });
    }
}
