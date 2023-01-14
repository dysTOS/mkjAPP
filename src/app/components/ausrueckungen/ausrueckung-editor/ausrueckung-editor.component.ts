import { Location } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { EditComponentDeactivate } from "src/app/guards/edit-deactivate.guard";
import { UtilFunctions } from "src/app/helpers/util-functions";
import { TermineApiService } from "src/app/services/api/termine-api.service";
import { InfoService } from "src/app/services/info.service";
import { MkjToolbarService } from "src/app/utilities/mkj-toolbar/mkj-toolbar.service";

@Component({
    selector: "app-ausrueckung-editor",
    templateUrl: "./ausrueckung-editor.component.html",
    styleUrls: ["./ausrueckung-editor.component.scss"],
})
export class AusrueckungEditorComponent implements EditComponentDeactivate {
    public formGroup: FormGroup;

    public loading: boolean = false;
    public saving: boolean = false;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private ausrueckungService: TermineApiService,
        private infoService: InfoService,
        public location: Location,
        private toolbarService: MkjToolbarService
    ) {
        this.toolbarService.header = "Editor";
        this.toolbarService.backButtonLink = "/aktuell";

        const id = this.route.snapshot.params.id;
        if (id && id !== "neu") {
            this.loadAusrueckung(id);
        } else {
            (this.formGroup = UtilFunctions.getAusrueckungFormGroup(fb)),
                this.formGroup.updateValueAndValidity();
        }
    }

    public canDeactivate(): boolean {
        return this.formGroup?.pristine;
    }

    private loadAusrueckung(id: string) {
        this.loading = true;
        this.ausrueckungService.getSingleTermin(id).subscribe({
            next: (res) => {
                this.formGroup = UtilFunctions.getAusrueckungFormGroup(
                    this.fb,
                    res
                );
                this.formGroup.updateValueAndValidity();
                this.loading = false;
            },
            error: (err) => {
                this.loading = false;
                this.infoService.error(err);
            },
        });
    }

    public saveAusrueckung() {
        const saveAusrueckung = this.formGroup?.getRawValue();
        this.saving = true;
        if (saveAusrueckung.id) {
            this.ausrueckungService.updateTermin(saveAusrueckung).subscribe({
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
            this.ausrueckungService.createTermin(saveAusrueckung).subscribe({
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
