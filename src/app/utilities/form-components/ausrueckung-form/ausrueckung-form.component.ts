import {
    Ausrueckung,
    KategorienOptions,
    StatusOptions,
} from "src/app/models/Ausrueckung";
import { Component, Input, TemplateRef } from "@angular/core";
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

@Component({
    selector: "mkj-ausrueckung-form",
    templateUrl: "./ausrueckung-form.component.html",
    styleUrls: ["./ausrueckung-form.component.scss"],
    providers: [
        controlValueAccessor(AusrueckungFormComponent),
        controlValidator(AusrueckungFormComponent),
    ],
})
export class AusrueckungFormComponent extends AbstractFormComponent {
    kategorien = KategorienOptions;
    status = StatusOptions;

    constructor() {
        super();
        this.form = new FormGroup({
            name: new FormControl(null, [Validators.required]),
            beschreibung: new FormControl(),
            infoMusiker: new FormControl(),
            oeffentlich: new FormControl(),
            ort: new FormControl(),
            kategorie: new FormControl(null, [Validators.required]),
            status: new FormControl(null, [Validators.required]),
            vonDatum: new FormControl(null, [Validators.required]),
            vonZeit: new FormControl(),
            bisDatum: new FormControl(null, [Validators.required]),
            bisZeit: new FormControl(),
            treffzeit: new FormControl(),
        });

        this.subSink
            .add
            // this.form.valueChanges.subscribe((value) => {
            //     console.log(value);
            //     this.form.controls.bisDatum.patchValue(
            //         moment(new Date(value)).format("YYYY-MM-DD")
            //     );
            // })
            ();
    }

    // setVonDate() {
    //     this.ausrueckung.vonDatum = moment(this.vonDate).format("YYYY-MM-DD");
    //     this.bisDate = new Date(this.vonDate);
    //     this.ausrueckung.bisDatum = moment(this.bisDate).format("YYYY-MM-DD");
    // }

    // setVonZeit() {
    //     if (this.vonTime) {
    //         this.ausrueckung.vonZeit = moment(this.vonTime).format("HH:mm");
    //         this.bisTime = new Date(
    //             moment(this.vonTime).add(2, "hours").toISOString()
    //         );
    //         this.ausrueckung.bisZeit = moment(this.bisTime).format("HH:mm");
    //         this.treffTime = new Date(
    //             moment(this.vonTime).subtract(30, "minutes").toISOString()
    //         );
    //         this.ausrueckung.treffzeit = moment(this.treffTime).format("HH:mm");
    //     } else {
    //         this.ausrueckung.vonZeit = null;
    //     }
    // }

    // setBisDate() {
    //     this.ausrueckung.bisDatum = moment(this.bisDate).format("YYYY-MM-DD");
    // }

    // setBisTime() {
    //     if (this.bisTime) {
    //         this.ausrueckung.bisZeit = moment(this.bisTime).format("HH:mm");
    //     } else {
    //         this.ausrueckung.bisZeit = null;
    //     }
    // }

    // setTreffzeit() {
    //     if (this.treffTime) {
    //         this.ausrueckung.treffzeit = moment(this.treffTime).format("HH:mm");
    //     } else {
    //         this.ausrueckung.treffzeit = null;
    //     }
    // }
}
