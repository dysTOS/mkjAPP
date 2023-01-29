import { Component, Input } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { UtilFunctions } from "src/app/helpers/util-functions";
import { ActivatedRoute } from "@angular/router";
import { MitgliederApiService } from "src/app/services/api/mitglieder-api.service";
import { EditComponentDeactivate } from "src/app/guards/edit-deactivate.guard";
import { MkjToolbarService } from "src/app/utilities/mkj-toolbar/mkj-toolbar.service";
import { Mitglied } from "src/app/models/Mitglied";

@Component({
    selector: "app-mitglied-editor",
    templateUrl: "./mitglied-editor.component.html",
    styleUrls: ["./mitglied-editor.component.scss"],
})
export class MitgliedEditorComponent implements EditComponentDeactivate {
    private _mitglied: Mitglied;
    @Input()
    public get mitglied(): Mitglied {
        return this._mitglied;
    }
    public set mitglied(value: Mitglied) {
        this._mitglied = value;
        this.formGroup.patchValue(value);
    }

    public formGroup: FormGroup;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private mitgliedService: MitgliederApiService,
        toolbar: MkjToolbarService
    ) {
        this.formGroup = UtilFunctions.getMitgliedFormGroup(fb);

        // const id = this.route.snapshot.params.id;
        // if (id && id !== "neu") {
        //     this.loadMitglied(id);
        // }
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
