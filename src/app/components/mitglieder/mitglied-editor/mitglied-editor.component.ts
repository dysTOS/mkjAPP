import { Component, Input } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { UtilFunctions } from "src/app/helpers/util-functions";
import { ActivatedRoute } from "@angular/router";
import { MitgliederService } from "src/app/services/mitglieder.service";

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
        private mitgliedService: MitgliederService
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
