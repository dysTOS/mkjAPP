import { Component, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AutoComplete } from "primeng/autocomplete";
import { EditComponentDeactivate } from "src/app/guards/edit-deactivate.guard";
import { UtilFunctions } from "src/app/helpers/util-functions";
import { Mitglied } from "src/app/models/Mitglied";
import { PermissionMap } from "src/app/models/User";
import { GruppenApiService } from "src/app/services/api/gruppen-api.service";
import { InfoService } from "src/app/services/info.service";
import { MitgliederApiService } from "src/app/services/api/mitglieder-api.service";
import { MkjToolbarService } from "src/app/utilities/mkj-toolbar/mkj-toolbar.service";

@Component({
    selector: "app-gruppe-details",
    templateUrl: "./gruppe-details.component.html",
    styleUrls: ["./gruppe-details.component.scss"],
})
export class GruppeDetailsComponent implements EditComponentDeactivate {
    public color: string;
    public formGroup: FormGroup;
    public mitglieder: Mitglied[] = [];
    public mitgliederSearchResult: Mitglied[];

    public isSaving: boolean;
    public isLoading: boolean;
    public tableLocked: boolean;

    @ViewChild("autoComplete")
    private autoComplete: AutoComplete;

    constructor(
        private toolbarService: MkjToolbarService,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private infoService: InfoService,
        private gruppenService: GruppenApiService,
        private mitgliederService: MitgliederApiService
    ) {
        this.initToolbar();

        const id = this.route.snapshot.params.id;
        if (id && id !== "neu") {
            this.loadGruppe(id);
        } else {
            this.toolbarService.buttons[0].hidden = true;
            this.formGroup = UtilFunctions.getGruppeFormGroup(fb);
            this.formGroup.updateValueAndValidity();
        }
    }

    private initToolbar(): void {
        this.toolbarService.backButton = true;
        this.toolbarService.buttons = [
            {
                label: "Löschen",
                icon: "pi pi-trash",
                click: () => this.deleteGruppe(),
                permissions: [PermissionMap.GRUPPEN_DELETE],
            },
        ];
    }

    public canDeactivate(): boolean {
        return this.formGroup?.pristine;
    }

    private loadGruppe(id: string) {
        this.isLoading = true;
        this.gruppenService.getById(id).subscribe({
            next: (res) => {
                this.formGroup = UtilFunctions.getGruppeFormGroup(this.fb, res);
                this.formGroup.updateValueAndValidity();
                this.mitglieder = res.mitglieder ?? [];
                this.sortMitglieder();
                this.formGroup.markAsPristine();
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
        const rawValue = this.formGroup.getRawValue();

        if (rawValue.id) {
            this.gruppenService.update(rawValue).subscribe({
                next: (res) => {
                    this.infoService.success("Gruppe gespeichert!");
                    this.isSaving = false;
                    if (!this.formGroup.get("id").value) {
                        this.loadGruppe(res.id);
                    }
                    this.formGroup.markAsPristine();
                },
                error: (err) => {
                    this.infoService.error(err);
                    this.isSaving = false;
                },
            });
        } else {
            this.gruppenService.create(rawValue).subscribe({
                next: (res) => {
                    this.infoService.success("Gruppe gespeichert!");
                    this.isSaving = false;
                    if (!this.formGroup.get("id").value) {
                        this.loadGruppe(res.id);
                    }
                    this.formGroup.markAsPristine();
                },
                error: (err) => {
                    this.infoService.error(err);
                    this.isSaving = false;
                },
            });
        }
    }

    public addMitglied(mitglied: Mitglied) {
        this.autoComplete.clear();
        this.tableLocked = true;
        this.gruppenService
            .addMitgliedToGruppe({
                subjectId: mitglied.id,
                collectionId: this.formGroup.controls.id.value,
            })
            .subscribe({
                next: (res) => {
                    if (res.success) {
                        this.mitglieder.push(mitglied);
                        this.sortMitglieder();
                    }
                    this.tableLocked = false;
                },
                error: (err) => {
                    this.infoService.error(err);
                    this.tableLocked = false;
                },
            });
    }

    public removeMitglied(id: string) {
        this.tableLocked = true;
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
                    this.tableLocked = false;
                },
                error: (err) => {
                    this.infoService.error(err);
                    this.tableLocked = false;
                },
            });
    }

    public searchMitglieder(event: any) {
        this.mitgliederService
            .searchMitglieder(event.query)
            .subscribe((data) => {
                this.mitgliederSearchResult = data;
            });
    }

    private sortMitglieder() {
        this.mitglieder?.sort((a, b) => a.zuname.localeCompare(b.zuname));
    }

    private deleteGruppe() {
        this.infoService
            .confirmDelete(null, () =>
                this.gruppenService.delete(this.formGroup?.controls.id.value)
            )
            .subscribe({
                next: (res) => {
                    this.infoService.success(
                        "Gruppe " +
                            this.formGroup.controls.name.value +
                            " gelöscht."
                    );
                    this.formGroup.markAsPristine();
                    this.router.navigate(["../"], { relativeTo: this.route });
                },
                error: (err) => {
                    this.infoService.error(err);
                    this.isLoading = false;
                },
            });
    }
}
