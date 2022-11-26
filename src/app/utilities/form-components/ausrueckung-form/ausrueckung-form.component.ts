import {
    AusrueckungKategorieMap,
    AusrueckungStatusMap,
} from "src/app/models/Ausrueckung";
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import * as moment from "moment";
import { FormBuilder, FormGroup } from "@angular/forms";
import { UtilFunctions } from "src/app/helpers/util-functions";
import { GruppenApiService } from "src/app/services/gruppen-api.service";
import { SubSink } from "subsink";

@Component({
    selector: "mkj-ausrueckung-form",
    templateUrl: "./ausrueckung-form.component.html",
    styleUrls: ["./ausrueckung-form.component.scss"],
    providers: [],
})
export class AusrueckungFormComponent implements OnInit, OnDestroy {
    private _formGroup: FormGroup;
    @Input()
    public get formGroup(): FormGroup {
        return this._formGroup;
    }
    public set formGroup(value: FormGroup) {
        this._formGroup = value;
        this.subSink.unsubscribe();
        this.subSink.add(
            this.formGroup.get("vonDatum").valueChanges.subscribe((value) => {
                if (this.severalDays === false) {
                    this.formGroup
                        .get("bisDatum")
                        .setValue(value, { emitEvent: false });
                }
                this.updateSeveralDays();
            }),
            this.formGroup?.get("bisDatum").valueChanges.subscribe((value) => {
                this.updateSeveralDays();
            }),
            this.formGroup?.get("vonZeit").valueChanges.subscribe((value) => {
                this.onVonZeitChange(value);
            })
        );
    }

    public readonly KategorieMap = AusrueckungKategorieMap;
    public readonly StatusMap = AusrueckungStatusMap;
    public GruppenMap: { label: string; value: string }[];

    public severalDays: boolean = false;

    public subSink = new SubSink();

    constructor(private gruppenService: GruppenApiService) {}

    public ngOnInit(): void {
        this.updateSeveralDays();
        this.getGruppen();
    }

    public ngOnDestroy(): void {
        this.subSink.unsubscribe();
    }

    public onSeveralDaysUserChange(value: boolean) {
        const vonDatum = this.formGroup.get("vonDatum")?.value;
        if (!vonDatum) {
            this.formGroup.get("bisDatum").setValue(null, { emitEvent: false });
            return;
        }

        if (value) {
            let bisDatum = moment(new Date(vonDatum));
            this.formGroup
                .get("bisDatum")
                .setValue(bisDatum.add(1, "day").format("YYYY-MM-DD"));
        } else {
            this.formGroup.get("bisDatum").setValue(vonDatum);
        }
    }

    private updateSeveralDays() {
        if (
            this.formGroup?.get("vonDatum").value ===
            this.formGroup?.get("bisDatum").value
        ) {
            this.severalDays = false;
        } else {
            this.severalDays = true;
        }
    }

    private onVonZeitChange(value: any) {
        if (!value) {
            this.formGroup.get("bisZeit").setValue(null, { emitEvent: false });
            this.formGroup
                .get("treffzeit")
                .setValue(null, { emitEvent: false });
            return;
        }

        const object = moment(new Date("2022-01-01T" + value));
        this.formGroup
            .get("bisZeit")
            .setValue(object.add(2, "hours").format("HH:mm"), {
                emitEvent: false,
            });
        this.formGroup
            .get("treffzeit")
            .setValue(object.subtract(30, "minutes").format("HH:mm"), {
                emitEvent: false,
            });
    }

    private getGruppen() {
        this.gruppenService.getAllGruppen().subscribe((res) => {
            this.GruppenMap = res.map((e) => {
                return {
                    label: e.name,
                    value: e.id,
                };
            });
        });
    }
}
