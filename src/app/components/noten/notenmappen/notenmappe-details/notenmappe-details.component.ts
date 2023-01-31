import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { EditComponentDeactivate } from "src/app/guards/edit-deactivate.guard";
import { Noten, Notenmappe } from "src/app/models/Noten";
import { PermissionMap } from "src/app/models/User";
import { NotenApiService } from "src/app/services/api/noten-api.service";
import { UserService } from "src/app/services/authentication/user.service";
import { InfoService } from "src/app/services/info.service";
import { NotenmappenFormHelper } from "src/app/utilities/form-components/mkj-notenmappe-form/notenmappen-form-helper.class";
import { NotenSucheOutput } from "src/app/utilities/mkj-notensuche/mkj-notensuche.component";
import { MkjToolbarService } from "src/app/utilities/mkj-toolbar/mkj-toolbar.service";

@Component({
    selector: "notenmappe-details",
    templateUrl: "./notenmappe-details.component.html",
    styleUrls: ["./notenmappe-details.component.scss"],
})
export class NotenmappeDetailsComponent implements EditComponentDeactivate {
    public formGroup: FormGroup;
    public notenMappe: Notenmappe;

    public isSaving: boolean;
    public loading: boolean;
    public tableLocked: boolean;

    public readonly Permission = PermissionMap;
    public editMode: boolean = false;
    public canDetachNoten: boolean = false;
    public canNavigateToNoten: boolean = false;

    constructor(
        private toolbarService: MkjToolbarService,
        fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private infoService: InfoService,
        private notenService: NotenApiService,
        private userService: UserService
    ) {
        this.initToolbar();
        this.canDetachNoten = this.userService.hasPermission(
            PermissionMap.NOTENMAPPE_ASSIGN
        );
        this.canNavigateToNoten = this.userService.hasPermission(
            PermissionMap.NOTEN_SAVE
        );

        this.formGroup = NotenmappenFormHelper.getNotennappeFormGroup(fb);

        const id = this.route.snapshot.params.id;
        if (id && id !== "neu") {
            this.loadMappe(id);
        } else {
            this.editMode = true;
            this.toolbarService.buttons[0].hidden = true;
        }
    }

    public canDeactivate(): boolean {
        this.initToolbar();
        const id = this.route.snapshot.params.id;
        if (id === "neu") {
            this.toolbarService.buttons[0].hidden = true;
        }
        return this.formGroup.pristine;
    }

    private initToolbar(): void {
        this.toolbarService.backButton = true;
        this.toolbarService.buttons = [
            {
                label: "Mappe bearbeiten",
                icon: "pi pi-pencil",
                click: () => {
                    this.editMode = !this.editMode;
                    this.toolbarService.buttons[0].highlighted = this.editMode;
                },
                permissions: [
                    PermissionMap.NOTENMAPPE_SAVE,
                    PermissionMap.NOTENMAPPE_ASSIGN,
                ],
            },
            {
                label: "Mappe Löschen",
                icon: "pi pi-trash",
                click: () => this.deleteNotenmappe(),
                permissions: [PermissionMap.NOTENMAPPE_DELETE],
            },
        ];
    }

    private loadMappe(id: string) {
        this.loading = true;
        this.notenService.getNotenMappe(id).subscribe({
            next: (res) => {
                NotenmappenFormHelper.patchNotenmappeFormGroup(
                    this.formGroup,
                    res
                );
                this.notenMappe = res;
                this.toolbarService.header = res.name;
                this.sortNoten();
                this.loading = false;
                this.formGroup.updateValueAndValidity();
            },
            error: (err) => {
                this.infoService.error(err);
                this.loading = false;
            },
        });
    }

    public saveMappe() {
        this.isSaving = true;
        const update = this.formGroup.controls.id.value;
        if (update) {
            this.notenService
                .updateNotenmappe(this.formGroup.getRawValue())
                .subscribe({
                    next: (res) => {
                        this.infoService.success("Mappe gespeichert!");
                        this.isSaving = false;
                        this.formGroup.markAsPristine();
                    },
                    error: (err) => {
                        this.infoService.error(err);
                        this.isSaving = false;
                    },
                });
        } else {
            this.notenService
                .createNotenmappe(this.formGroup.getRawValue())
                .subscribe({
                    next: (res) => {
                        this.infoService.success("Mappe erstellt!");
                        this.isSaving = false;
                        this.formGroup.markAsPristine();
                        this.router.navigate(["../"], {
                            relativeTo: this.route,
                        });
                    },
                    error: (err) => {
                        this.infoService.error(err);
                        this.isSaving = false;
                    },
                });
        }
    }

    public addNotenToMappe(event: NotenSucheOutput) {
        this.tableLocked = true;
        const noten = event.noten;
        const mappenId = this.formGroup.controls.id.value;
        this.notenService
            .attachNotenToMappe(noten.id, mappenId, event.verzeichnisNr)
            .subscribe({
                next: (res) => {
                    noten.pivot = { verzeichnisNr: event.verzeichnisNr };
                    this.notenMappe.noten.push(noten);
                    this.sortNoten();
                    this.tableLocked = false;
                },
                error: (err) => {
                    this.tableLocked = false;
                    this.infoService.error(err);
                },
            });
    }

    public detachNotenFromMappe(noten: Noten) {
        this.tableLocked = true;
        const mappenId = this.formGroup.controls.id.value;
        this.notenService.detachNotenFromMappe(noten.id, mappenId).subscribe({
            next: (res) => {
                this.notenMappe.noten = this.notenMappe.noten.filter(
                    (e) => e.id !== noten.id
                );
                this.tableLocked = false;
            },
            error: (err) => {
                this.tableLocked = false;
                this.infoService.error(err);
            },
        });
    }

    public deleteNotenmappe() {
        this.loading = true;
        this.infoService
            .confirmDelete("Mappe wirklich löschen?", () =>
                this.notenService.deleteNotenmappe(
                    this.formGroup?.controls.id.value
                )
            )
            .subscribe({
                next: (res) => {
                    this.infoService.success(
                        "Mappe " +
                            this.formGroup.controls.name.value +
                            " gelöscht."
                    );
                    this.router.navigate(["../"], { relativeTo: this.route });
                },
                error: (err) => {
                    this.infoService.error(err);
                    this.loading = false;
                },
            });
    }

    private sortNoten(): void {
        if (this.notenMappe.hatVerzeichnis) {
            this.notenMappe.noten?.sort((a, b) =>
                a.pivot?.verzeichnisNr?.localeCompare(b.pivot?.verzeichnisNr)
            );
        } else {
            this.notenMappe.noten?.sort((a, b) =>
                a.titel.localeCompare(b.titel)
            );
        }
    }

    public navigateToNoten(noten: Noten): void {
        this.toolbarService.resetToolbar();
        this.router.navigate(["../../archiv/", noten.id], {
            relativeTo: this.route,
        });
    }
}
