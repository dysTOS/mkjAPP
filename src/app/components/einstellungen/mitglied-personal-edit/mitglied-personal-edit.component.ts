import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import * as _ from "lodash";
import { first, Subscription } from "rxjs";
import { EditComponentDeactivate } from "src/app/guards/edit-deactivate.guard";
import { UtilFunctions } from "src/app/helpers/util-functions";
import { Mitglied } from "src/app/models/Mitglied";
import { UserService } from "src/app/services/authentication/user.service";
import { InfoService } from "src/app/services/info.service";
import { MitgliederService } from "src/app/services/mitglieder.service";
import { MkjToolbarService } from "src/app/utilities/mkj-toolbar/mkj-toolbar.service";

@Component({
    selector: "app-mitglied-personal-edit",
    templateUrl: "./mitglied-personal-edit.component.html",
    styleUrls: ["./mitglied-personal-edit.component.scss"],
})
export class MitgliedPersonalEditComponent
    implements OnInit, EditComponentDeactivate
{
    public isSaving: boolean = false;

    public formGroup: FormGroup;

    constructor(
        private userservice: UserService,
        private mitgliederService: MitgliederService,
        private infoService: InfoService,
        private fb: FormBuilder,
        private toolbarService: MkjToolbarService
    ) {
        this.toolbarService.header = "Meine Daten";
    }

    public ngOnInit(): void {
        this.userservice
            .getCurrentMitglied()
            .pipe()
            .subscribe({
                next: (res) => {
                    this.formGroup = UtilFunctions.getMitgliedFormGroup(
                        this.fb,
                        res
                    );
                    this.formGroup.updateValueAndValidity();
                },
            });
    }

    public updateOwnMitgliedData() {
        this.isSaving = true;
        const saveMitglied = this.formGroup.get("mitglied").getRawValue();
        this.mitgliederService.updateOwnMitgliedData(saveMitglied).subscribe({
            next: (res) => {
                this.infoService.success("Daten aktualisiert!");
                this.userservice.setCurrentMitglied(res);
                this.isSaving = false;
            },
            error: (err) => {
                this.isSaving = false;
                this.infoService.error(err);
            },
        });
    }

    public canDeactivate(): boolean {
        return this.formGroup?.pristine;
    }
}
