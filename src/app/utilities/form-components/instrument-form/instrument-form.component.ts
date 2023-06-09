import { Component, Input, OnDestroy } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Mitglied } from "src/app/models/Mitglied";
import { PermissionMap } from "src/app/models/User";
import { GruppenApiService } from "src/app/services/api/gruppen-api.service";
import { UserService } from "src/app/services/authentication/user.service";
import { SubSink } from "subsink";

@Component({
    selector: "mkj-instrument-form",
    templateUrl: "./instrument-form.component.html",
})
export class InstrumentFormComponent implements OnDestroy {
    public besitzer: Mitglied;
    private subSink = new SubSink();
    public GruppenMap: { label: string; value: string }[];

    private _formGroup: FormGroup;
    @Input()
    public get formGroup(): FormGroup {
        return this._formGroup;
    }
    public set formGroup(value: FormGroup) {
        this._formGroup = value;
        if (value) {
            this.besitzer = value.controls.mitglied.value;
            this.subSink.add(
                value.controls.mitglied.valueChanges.subscribe((m) => {
                    this.besitzer = m;
                })
            );
        }
    }

    constructor(
        private userService: UserService,
        private gruppenService: GruppenApiService
    ) {
        this.getGruppen();
    }

    public ngOnDestroy(): void {
        this.subSink.unsubscribe();
    }

    public setBesitzer(mitglied: Mitglied): void {
        this.formGroup?.controls.mitglied_id.setValue(mitglied?.id ?? null);
        this.formGroup?.controls.mitglied_id.markAsDirty();
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
