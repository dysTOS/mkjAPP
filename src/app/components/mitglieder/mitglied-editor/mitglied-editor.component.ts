import { Component, Input } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { UtilFunctions } from "src/app/helpers/util-functions";
import { ActivatedRoute } from "@angular/router";
import { MitgliederApiService } from "src/app/services/api/mitglieder-api.service";
import { EditComponentDeactivate } from "src/app/guards/edit-deactivate.guard";
import { MkjToolbarService } from "src/app/utilities/mkj-toolbar/mkj-toolbar.service";

@Component({
    selector: "app-mitglied-editor",
    templateUrl: "./mitglied-editor.component.html",
    styleUrls: ["./mitglied-editor.component.scss"],
})
export class MitgliedEditorComponent implements EditComponentDeactivate {
    @Input()
    public formGroup: FormGroup;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private mitgliedService: MitgliederApiService,
        toolbar: MkjToolbarService
    ) {
        this.formGroup = UtilFunctions.getMitgliedFormGroup(fb);

        const id = this.route.snapshot.params.id;
        if (id && id !== "neu") {
            this.loadMitglied(id);
        }
    }

    public canDeactivate(): boolean {
        return this.formGroup.pristine;
    }

    private loadMitglied(id: string) {
        this.mitgliedService.getSingleMitglied(id).subscribe({
            next: (res) => {
                this.formGroup.patchValue(res);
            },
        });
    }
}
