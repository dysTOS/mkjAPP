import { Component, Input } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { UtilFunctions } from "src/app/helpers/util-functions";
import { ActivatedRoute } from "@angular/router";
import { MitgliederApiService } from "src/app/services/api/mitglieder-api.service";

@Component({
    selector: "app-mitglied-editor",
    templateUrl: "./mitglied-editor.component.html",
    styleUrls: ["./mitglied-editor.component.scss"],
})
export class MitgliedEditorComponent {
    @Input()
    public formGroup: FormGroup;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private mitgliedService: MitgliederApiService
    ) {
        const id = this.route.snapshot.params.id;
        if (id && id !== "neu") {
            this.loadMitglied(id);
        } else {
            this.formGroup = UtilFunctions.getMitgliedFormGroup(fb);
            this.formGroup.updateValueAndValidity();
        }
    }

    private loadMitglied(id: string) {
        this.mitgliedService.getSingleMitglied(id).subscribe({
            next: (res) => {
                this.formGroup = UtilFunctions.getMitgliedFormGroup(
                    this.fb,
                    res
                );
            },
        });
    }
}
