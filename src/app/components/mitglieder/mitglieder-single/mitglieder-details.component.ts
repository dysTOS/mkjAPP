import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ConfirmationService } from "primeng/api";
import { EditComponentDeactivate } from "src/app/guards/edit-deactivate.guard";
import { Mitglied } from "src/app/models/Mitglied";
import { PermissionMap } from "src/app/models/User";
import { UserService } from "src/app/services/authentication/user.service";
import { InfoService } from "src/app/services/info.service";
import { MitgliedFormHelper } from "src/app/utilities/form-components/mitglied-form/mitglied-form-helper";
import { MkjToolbarService } from "src/app/utilities/mkj-toolbar/mkj-toolbar.service";
import { MitgliederApiService } from "../../../services/api/mitglieder-api.service";

@Component({
    selector: "app-mitglieder-details",
    templateUrl: "./mitglieder-details.component.html",
    styleUrls: ["./mitglieder-details.component.scss"],
})
export class MitgliederDetailsComponent
    implements EditComponentDeactivate, OnInit
{
    public loading: boolean = false;
    public mitgliedSaving: boolean = false;

    public canAssignRoles: boolean = false;
    public rolesTouched: boolean = false;

    public formGroup: FormGroup;

    constructor(
        private mitgliederService: MitgliederApiService,
        private confirmationService: ConfirmationService,
        private userService: UserService,
        private router: Router,
        private route: ActivatedRoute,
        private infoService: InfoService,
        private toolbarService: MkjToolbarService,
        fb: FormBuilder
    ) {
        this.formGroup = MitgliedFormHelper.getMitgliedFormGroup(fb);
        this.canAssignRoles = this.userService.hasPermission(
            PermissionMap.ROLE_ASSIGN
        );
        this.toolbarService.backButton = true;
        const id = this.route.snapshot.params.id;
        if (id && id !== "neu") {
            this.loadMitglied(id);
            this.toolbarService.header = "Mitglied bearbeiten";
            this.toolbarService.buttons = [
                {
                    icon: "pi pi-trash",
                    click: () => this.deleteMitglied(),
                    permissions: [PermissionMap.MITGLIEDER_DELETE],
                    label: "Löschen",
                },
            ];
        } else {
            this.toolbarService.header = "Neues Mitglied";
        }
    }

    public ngOnInit(): void {}

    public canDeactivate(): boolean {
        return this.formGroup.pristine && !this.rolesTouched;
    }

    public loadMitglied(id: string) {
        const mitglied = this.mitgliederService.getSelectedMitglied();
        if (mitglied && id === mitglied.id) {
            this.formGroup.patchValue(mitglied);
        } else {
            this.loading = true;
            this.route.params.subscribe((e) => {
                this.mitgliederService.getSingleMitglied(e.id).subscribe({
                    next: (m) => {
                        this.formGroup.patchValue(m);
                        this.formGroup.markAsPristine();
                        this.loading = false;
                    },
                    error: (error) => {
                        this.infoService.error(error);
                        this.loading = false;
                    },
                });
            });
        }
    }

    public saveMitglied() {
        this.mitgliedSaving = true;
        const mitglied = this.formGroup.getRawValue() as Mitglied;
        if (!mitglied.id) {
            this.mitgliederService.createMitglied(mitglied).subscribe({
                next: (res) => {
                    this.infoService.success("Mitglied erstellt!");
                    this.mitgliedSaving = false;
                    this.formGroup.markAsPristine();
                    this.router.navigate(["../", "liste"], {
                        relativeTo: this.route,
                    });
                },
                error: (error) => {
                    this.mitgliedSaving = false;
                    this.infoService.error(error);
                },
            });
        } else {
            this.mitgliederService.updateMitglied(mitglied).subscribe({
                next: (res) => {
                    this.infoService.success("Daten gespeichert!");
                    this.formGroup.markAsPristine();
                    this.mitgliedSaving = false;
                },
                error: (error) => {
                    this.mitgliedSaving = false;
                    this.infoService.error(error);
                },
            });
        }
    }

    public deleteMitglied() {
        let name =
            this.formGroup.controls.vorname.value +
            " " +
            this.formGroup.controls.zuname.value;
        this.confirmationService.confirm({
            header: "Mitglied " + name + " wirklich löschen?",
            message:
                'Inaktive Musiker sollten nicht gelöscht werden, stattdessen sollte das Datum des Austritts erfasst werden und das Mitglied auf "Inaktiv" gestellt werden...',
            icon: "pi pi-exclamation-triangle",
            acceptLabel: "Löschen",
            accept: () => {
                this.mitgliederService
                    .deleteMitglied(this.formGroup.controls.id.value)
                    .subscribe({
                        next: (res) => {
                            this.infoService.info(
                                "Mitglied " + name + " gelöscht!"
                            );
                            this.navigateBack();
                        },
                        error: (error) => this.infoService.error(error),
                    });
            },
        });
    }

    public navigateBack() {
        this.mitgliederService.setSelectedMitglied(null);
        this.formGroup.disable();
        this.router.navigate(["../liste"], { relativeTo: this.route });
    }
}
