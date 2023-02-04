import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { EditComponentDeactivate } from "src/app/guards/edit-deactivate.guard";
import { UtilFunctions } from "src/app/helpers/util-functions";
import { PermissionMap } from "src/app/models/User";
import { NotenApiService } from "src/app/services/api/noten-api.service";
import { InfoService } from "src/app/services/info.service";
import { MkjToolbarService } from "src/app/utilities/mkj-toolbar/mkj-toolbar.service";

@Component({
    selector: "app-noten-editor",
    templateUrl: "./noten-editor.component.html",
    styleUrls: ["./noten-editor.component.scss"],
})
export class NotenEditorComponent implements EditComponentDeactivate {
    public saving = false;
    public loading = false;

    public formGroup: FormGroup;

    constructor(
        private notenService: NotenApiService,
        private infoService: InfoService,
        private route: ActivatedRoute,
        private router: Router,
        toolbar: MkjToolbarService,
        fb: FormBuilder
    ) {
        toolbar.backButton = true;

        this.formGroup = UtilFunctions.getNotenFormGroup(fb);

        const id = this.route.snapshot.params.id;
        if (id && id !== "neu") {
            this.loadNoten(id);
            toolbar.header = "Noten bearbeiten";
            toolbar.buttons = [
                {
                    label: "Mappe Löschen",
                    icon: "pi pi-trash",
                    click: () => this.deleteNoten(),
                    permissions: [PermissionMap.NOTEN_DELETE],
                },
            ];
        } else {
            toolbar.header = "Neue Noten";
        }
    }

    public canDeactivate(): boolean {
        return this.formGroup.pristine;
    }

    public loadNoten(id: string): void {
        this.loading = true;
        this.notenService.getNotenById(id).subscribe({
            next: (res) => {
                this.formGroup.patchValue(res);
                this.formGroup.markAsPristine();
                this.formGroup.updateValueAndValidity();
                this.loading = false;
            },
        });
    }

    public saveNoten() {
        this.saving = true;
        const editNoten = this.formGroup.getRawValue();
        if (editNoten.id) {
            this.notenService.updateNoten(editNoten).subscribe({
                next: (res) => {
                    this.infoService.success(
                        editNoten.titel + " aktualisiert!"
                    );
                    this.saving = false;
                    this.formGroup.markAsPristine();
                    this.router.navigate(["../"], { relativeTo: this.route });
                },
                error: (error) => {
                    this.saving = false;
                    this.infoService.error(error);
                },
            });
        } else {
            this.notenService.createNoten(editNoten).subscribe({
                next: (res) => {
                    this.infoService.success("Noten hinzugefügt!");
                    this.formGroup.markAsPristine();
                    this.saving = false;
                    this.router.navigate(["../"], { relativeTo: this.route });
                },
                error: (error) => {
                    this.saving = false;
                    this.infoService.error(error);
                },
            });
        }
    }

    public deleteNoten() {
        this.loading = this.saving = true;
        this.infoService
            .confirmDelete("Noten wirklich löschen?", () =>
                this.notenService.deleteNoten(this.formGroup.controls.id.value)
            )
            .subscribe({
                next: () => {
                    this.infoService.info("Noten gelöscht!");
                    this.loading = this.saving = false;
                    this.formGroup.markAsPristine();
                    this.router.navigate(["../"], { relativeTo: this.route });
                },
                error: (err) => {
                    this.infoService.error(err);
                    this.loading = this.saving = false;
                },
            });
    }
}
