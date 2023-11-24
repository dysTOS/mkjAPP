import { Component, Input, OnDestroy } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Mitglied } from "src/app/models/Mitglied";
import { GruppenApiService } from "src/app/services/api/gruppen-api.service";
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
            this.subSink.unsubscribe();
            this.subSink.add(
                value.controls.mitglied.valueChanges.subscribe((m) => {
                    this.besitzer = m;
                })
            );
        }
    }

    constructor(private gruppenService: GruppenApiService) {
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
        this.gruppenService.getList().subscribe((res) => {
            this.GruppenMap = res.values
                .filter((e) => e.register)
                .map((e) => {
                    return {
                        label: e.name,
                        value: e.id,
                    };
                });
        });
    }
}
