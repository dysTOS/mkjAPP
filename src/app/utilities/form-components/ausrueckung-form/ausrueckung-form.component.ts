import { TerminKategorieMap, TerminStatusMap } from "src/app/models/Termin";
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import * as moment from "moment";
import { FormBuilder, FormGroup } from "@angular/forms";
import { UtilFunctions } from "src/app/helpers/util-functions";
import { GruppenApiService } from "src/app/services/api/gruppen-api.service";
import { SubSink } from "subsink";
import { UserService } from "src/app/services/authentication/user.service";
import { PermissionMap } from "src/app/models/User";

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

    public readonly KategorieMap = TerminKategorieMap;
    public readonly StatusMap = TerminStatusMap;
    public GruppenMap: { label: string; value: string }[];

    public severalDays: boolean = false;

    public subSink = new SubSink();

    constructor(
        private gruppenService: GruppenApiService,
        private userService: UserService
    ) {}

    public ngOnInit(): void {
        this.updateSeveralDays();
        this.getGruppen();
    }

    public ngOnDestroy(): void {
        this.subSink.unsubscribe();
    }

    public onSeveralDaysUserChange(value: boolean) {
        this.formGroup.markAsDirty();
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

        const objectBisZeit = moment(new Date("2022-01-01T" + value));
        const objectTreffzeit = moment(new Date("2022-01-01T" + value));
        this.formGroup
            .get("bisZeit")
            .setValue(objectBisZeit.add(2, "hours").format("HH:mm"), {
                emitEvent: false,
            });
        this.formGroup
            .get("treffzeit")
            .setValue(objectTreffzeit.subtract(30, "minutes").format("HH:mm"), {
                emitEvent: false,
            });
    }

    private getGruppen() {
        let gruppenleiterMitgliedId = null;
        if (
            this.userService.hasPermission(
                PermissionMap.TERMIN_GRUPPENLEITER_SAVE
            ) &&
            this.userService.hasPermissionNot(PermissionMap.TERMIN_SAVE)
        ) {
            gruppenleiterMitgliedId =
                this.userService.currentMitglied.getValue().id;
        }
        this.gruppenService.getAllGruppen().subscribe((res) => {
            let gruppen = res.values;
            if (gruppenleiterMitgliedId) {
                gruppen = gruppen.filter(
                    (g) =>
                        g.gruppenleiter_mitglied_id === gruppenleiterMitgliedId
                );
            }

            this.GruppenMap = gruppen.map((e) => {
                return {
                    label: e.name,
                    value: e.id,
                };
            });
        });
    }
}
