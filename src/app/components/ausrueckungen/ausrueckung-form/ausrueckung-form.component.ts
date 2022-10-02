import {
    Ausrueckung,
    AusrueckungFormValue,
    KategorienOptions,
    StatusOptions,
} from "src/app/interfaces/Ausrueckung";
import { Component, Input, TemplateRef } from "@angular/core";
import * as moment from "moment";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    UntypedFormBuilder,
    Validators,
} from "@angular/forms";
import { AbstractFormComponent } from "../../abstract-form.component";
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
    private _ausrueckung: Ausrueckung;
    @Input()
    public get ausrueckung(): Ausrueckung {
        return this._ausrueckung;
    }
    public set ausrueckung(value: Ausrueckung) {
        this._ausrueckung = value;
        this.form.patchValue(value);
        if (value) this.initDates();
    }

    kategorien = KategorienOptions;
    status = StatusOptions;

    vonDate: Date;
    bisDate: Date;
    vonTime: Date;
    bisTime: Date;
    treffTime: Date;

    constructor() {
        super();
    }

    private initDates() {
        if (this.ausrueckung.vonDatum) {
            this.vonDate = new Date(this.ausrueckung.vonDatum);
        } else {
            this.vonDate = null;
        }
        if (this.ausrueckung.bisDatum) {
            this.bisDate = new Date(this.ausrueckung.bisDatum);
        } else {
            this.bisDate = null;
        }
        if (this.ausrueckung.vonZeit) {
            this.vonTime = new Date(
                moment(
                    this.ausrueckung.vonDatum + "T" + this.ausrueckung.vonZeit
                ).toISOString()
            );
        } else {
            this.vonTime = null;
        }
        if (this.ausrueckung.bisZeit) {
            this.bisTime = new Date(
                moment(
                    this.ausrueckung.bisDatum + "T" + this.ausrueckung.bisZeit
                ).toISOString()
            );
        } else {
            this.bisTime = null;
        }
        if (this.ausrueckung.treffzeit) {
            this.treffTime = new Date(
                moment(
                    this.ausrueckung.vonDatum + "T" + this.ausrueckung.treffzeit
                ).toISOString()
            );
        } else {
            this.treffTime = null;
        }
    }

    setVonDate() {
        this.ausrueckung.vonDatum = moment(this.vonDate).format("YYYY-MM-DD");
        this.bisDate = new Date(this.vonDate);
        this.ausrueckung.bisDatum = moment(this.bisDate).format("YYYY-MM-DD");
    }

    setVonZeit() {
        if (this.vonTime) {
            this.ausrueckung.vonZeit = moment(this.vonTime).format("HH:mm");
            this.bisTime = new Date(
                moment(this.vonTime).add(2, "hours").toISOString()
            );
            this.ausrueckung.bisZeit = moment(this.bisTime).format("HH:mm");
            this.treffTime = new Date(
                moment(this.vonTime).subtract(30, "minutes").toISOString()
            );
            this.ausrueckung.treffzeit = moment(this.treffTime).format("HH:mm");
        } else {
            this.ausrueckung.vonZeit = null;
        }
    }

    setBisDate() {
        this.ausrueckung.bisDatum = moment(this.bisDate).format("YYYY-MM-DD");
    }

    setBisTime() {
        if (this.bisTime) {
            this.ausrueckung.bisZeit = moment(this.bisTime).format("HH:mm");
        } else {
            this.ausrueckung.bisZeit = null;
        }
    }

    setTreffzeit() {
        if (this.treffTime) {
            this.ausrueckung.treffzeit = moment(this.treffTime).format("HH:mm");
        } else {
            this.ausrueckung.treffzeit = null;
        }
    }
}
