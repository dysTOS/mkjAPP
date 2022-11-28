import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, ActivatedRouteSnapshot } from "@angular/router";
import { UtilFunctions } from "src/app/helpers/util-functions";
import { Mitglied } from "src/app/models/Mitglied";
import { GruppenApiService } from "src/app/services/gruppen-api.service";
import { InfoService } from "src/app/services/info.service";
import { MkjToolbarService } from "src/app/utilities/mkj-toolbar/mkj-toolbar.service";

@Component({
    selector: "app-gruppe-details",
    templateUrl: "./gruppe-details.component.html",
    styleUrls: ["./gruppe-details.component.scss"],
})
export class GruppeDetailsComponent {
    public color: string;
    public formGroup: FormGroup;
    public mitglieder: Mitglied[];

    public isSaving: boolean;
    public isLoading: boolean;

    constructor(
        private toolbarService: MkjToolbarService,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private gruppenService: GruppenApiService,
        private infoService: InfoService
    ) {
        this.toolbarService.backButton = true;

        const id = this.route.snapshot.params.id;
        if (id && id !== "neu") {
            this.loadGruppe(id);
        } else {
            this.formGroup = UtilFunctions.getGruppeFormGroup(fb);
            this.formGroup.updateValueAndValidity();
        }
    }

    private loadGruppe(id: string) {
        this.isLoading = true;
        this.gruppenService.getGruppe(id).subscribe({
            next: (res) => {
                this.formGroup = UtilFunctions.getGruppeFormGroup(this.fb, res);
                this.formGroup.updateValueAndValidity();
                this.mitglieder = res.mitglieder;
                this.isLoading = false;
            },
            error: (err) => {
                this.infoService.error(err);
                this.isLoading = false;
            },
        });
    }

    public saveGruppe() {
        this.isSaving = true;
        this.gruppenService.saveGruppe(this.formGroup.getRawValue()).subscribe({
            next: (res) => {
                this.infoService.success("Gruppe gespeichert!");
                this.isSaving = false;
            },
            error: (err) => {
                this.infoService.error(err);
                this.isSaving = false;
            },
        });
    }

    public addMitglied() {}

    public removeMitglied(id: string) {
        this.isLoading = true;
        this.gruppenService
            .removeMitgliedFromGruppe({
                subjectId: id,
                collectionId: this.formGroup.controls.id.value,
            })
            .subscribe({
                next: (res) => {
                    if (res.success) {
                        this.mitglieder.splice(
                            UtilFunctions.findIndexById(id, this.mitglieder),
                            1
                        );
                    }
                    this.isLoading = false;
                },
                error: (err) => {
                    this.infoService.error(err);
                    this.isLoading = false;
                },
            });
    }
}
