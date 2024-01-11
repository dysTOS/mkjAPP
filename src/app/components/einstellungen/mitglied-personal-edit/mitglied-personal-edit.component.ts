import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { EditComponentDeactivate } from "src/app/guards/edit-deactivate.guard";
import { MitgliederApiService } from "src/app/services/api/mitglieder-api.service";
import { UserService } from "src/app/services/authentication/user.service";
import { InfoService } from "src/app/services/info.service";
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
        private mitgliederService: MitgliederApiService,
        private infoService: InfoService,
        private fb: FormBuilder,
        private toolbarService: MkjToolbarService
    ) {
        this.toolbarService.header = "Meine Daten";
    }

    public ngOnInit(): void {
        // this.userservice.getCurrentMitglied().subscribe({
        //     next: (res) => {
        //         this.formGroup = MitgliedFormHelper.getMitgliedFormGroup(
        //             this.fb,
        //             res
        //         );
        //         this.formGroup.updateValueAndValidity();
        //     },
        // });
    }

    public updateOwnMitgliedData() {
        this.isSaving = true;
        const saveMitglied = this.formGroup.getRawValue();
        this.mitgliederService.updateOwnMitgliedData(saveMitglied).subscribe({
            next: (res) => {
                this.infoService.success("Daten aktualisiert!");
                this.userservice.setCurrentMitglied(res);
                this.formGroup.markAsPristine();
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
