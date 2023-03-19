import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { EditComponentDeactivate } from "src/app/guards/edit-deactivate.guard";
import { UtilFunctions } from "src/app/helpers/util-functions";
import { Mitglied } from "src/app/models/Mitglied";
import { PermissionMap } from "src/app/models/User";
import { MkjToolbarService } from "src/app/utilities/mkj-toolbar/mkj-toolbar.service";
import { InstrumenteUiService } from "../instrumente-ui.service";

@Component({
    selector: "app-instrumente-editor",
    templateUrl: "./instrumente-editor.component.html",
    styleUrls: ["./instrumente-editor.component.scss"],
})
export class InstrumenteEditorComponent implements EditComponentDeactivate {
    public formGroup: FormGroup;

    public besitzer: Mitglied;

    constructor(
        public uiService: InstrumenteUiService,
        private router: Router,
        private route: ActivatedRoute,
        toolbar: MkjToolbarService,
        fb: FormBuilder
    ) {
        toolbar.backButton = true;

        this.formGroup = UtilFunctions.getInstrumentFormGroup(fb);

        const id = route.snapshot.params.id;
        if (id && id !== "neu") {
            this.uiService.getInstrument(id).subscribe({
                next: (res) => {
                    this.formGroup.patchValue(res);
                    this.formGroup.markAsPristine();
                    this.formGroup.updateValueAndValidity();
                },
            });
            toolbar.header = "Instrument bearbeiten";
            toolbar.buttons = [
                {
                    label: "Instrument Löschen",
                    icon: "pi pi-trash",
                    click: () => this.deleteInstrument(),
                    permissions: [PermissionMap.INSTRUMENTE_DELETE],
                },
            ];
        } else {
            toolbar.header = "Neues Instrument";
        }
    }

    public canDeactivate(): boolean {
        return this.formGroup.pristine;
    }

    public saveInstrument(): void {
        if (this.formGroup.valid) {
            this.uiService
                .saveInstrument(this.formGroup.getRawValue())
                .subscribe({
                    next: (res) => {
                        if (!this.formGroup.controls.id.value) {
                            this.formGroup.markAsPristine();
                            this.router.navigate(["../"], {
                                relativeTo: this.route,
                            });
                        } else {
                            this.formGroup.patchValue(res);
                            this.formGroup.markAsPristine();
                            this.formGroup.updateValueAndValidity();
                        }
                    },
                });
        }
    }

    public deleteInstrument(): void {
        this.uiService
            .deleteInstrument(this.formGroup.getRawValue())
            .subscribe({
                next: (success) => {
                    if (success) {
                        this.router.navigate(["../"], {
                            relativeTo: this.route,
                        });
                    }
                },
            });
    }
}
