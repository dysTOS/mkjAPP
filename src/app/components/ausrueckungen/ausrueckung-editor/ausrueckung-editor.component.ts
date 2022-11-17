import { Location } from "@angular/common";
import { Component, Input } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { EditComponentDeactivate } from "src/app/guards/edit-deactivate.guard";
import { UtilFunctions } from "src/app/helpers/util-functions";
import { Ausrueckung } from "src/app/models/Ausrueckung";
import { AusrueckungenService } from "src/app/services/ausrueckungen.service";
import { InfoService } from "src/app/services/info.service";
import { AusrueckungFormComponent } from "../../../utilities/form-components/ausrueckung-form/ausrueckung-form.component";

@Component({
    selector: "app-ausrueckung-editor",
    templateUrl: "./ausrueckung-editor.component.html",
    styleUrls: ["./ausrueckung-editor.component.scss"],
})
export class AusrueckungEditorComponent implements EditComponentDeactivate {
    private _ausrueckung: Ausrueckung;
    @Input()
    public get ausrueckung(): Ausrueckung {
        return this._ausrueckung;
    }
    public set ausrueckung(value: Ausrueckung) {
        this.formGroup.controls.ausrueckung.patchValue(value);
        this.formGroup.updateValueAndValidity();
        this._ausrueckung = value;
    }

    public formGroup: FormGroup;

    public loading: boolean = false;
    public saving: boolean = false;

    constructor(
        fb: FormBuilder,
        route: ActivatedRoute,
        private ausrueckungService: AusrueckungenService,
        private infoService: InfoService,
        public location: Location
    ) {
        this.formGroup = fb.group({
            ausrueckung: [],
        });

        const id = route.snapshot.params.id;
        if (id && id !== "neu") {
            this.loadAusrueckung(id);
        } else {
            this.formGroup = fb.group({
                ausrueckung: UtilFunctions.getAusrueckungFormGroup(fb),
            });
            this.formGroup.updateValueAndValidity();
        }
    }

    public canDeactivate(): boolean {
        return this.formGroup?.pristine;
    }

    private loadAusrueckung(id: string) {
        this.loading = true;
        this.ausrueckungService.getSingleAusrueckung(id).subscribe({
            next: (res) => {
                this.ausrueckung = res;
                this.loading = false;
            },
            error: (err) => {
                this.loading = false;
                this.infoService.error(err);
            },
        });
    }

    public saveAusrueckung() {
        const saveAusrueckung = this.formGroup
            .get("ausrueckung")
            ?.getRawValue();
        this.saving = true;
        if (saveAusrueckung.id) {
            this.ausrueckungService
                .updateAusrueckung(saveAusrueckung)
                .subscribe({
                    next: (res) => {
                        this.infoService.success("Ausrückung aktualisiert!");
                        this.formGroup.markAsPristine();
                        this.location.back();
                    },
                    error: (err) => {
                        this.infoService.error(err);
                        this.saving = false;
                    },
                });
        } else {
            this.ausrueckungService
                .createAusrueckung(saveAusrueckung)
                .subscribe({
                    next: (res) => {
                        this.infoService.success("Ausrückung erstellt!");
                        this.formGroup.markAsPristine();
                        this.location.back();
                    },
                    error: (err) => {
                        this.infoService.error(err);
                        this.saving = false;
                    },
                });
        }
    }
}
