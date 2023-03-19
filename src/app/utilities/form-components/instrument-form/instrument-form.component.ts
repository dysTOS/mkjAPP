import { Component, Input, OnDestroy } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Mitglied } from "src/app/models/Mitglied";
import { SubSink } from "subsink";

@Component({
    selector: "mkj-instrument-form",
    templateUrl: "./instrument-form.component.html",
})
export class InstrumentFormComponent implements OnDestroy {
    private _formGroup: FormGroup;
    @Input()
    public get formGroup(): FormGroup {
        return this._formGroup;
    }
    public set formGroup(value: FormGroup) {
        this._formGroup = value;
        this.subSink.add(
            this.formGroup?.controls.mitglied.valueChanges.subscribe(
                (m) => (this.besitzer = m)
            )
        );
    }

    public besitzer: Mitglied;

    private subSink = new SubSink();

    constructor() {}

    public ngOnDestroy(): void {
        this.subSink.unsubscribe();
    }

    public setBesitzer(mitglied: Mitglied): void {
        this.formGroup?.controls.mitglied_id.setValue(mitglied?.id ?? null);
        this.formGroup?.controls.mitglied_id.markAsDirty();
    }
}
