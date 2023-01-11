import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { EditComponentDeactivate } from "src/app/guards/edit-deactivate.guard";
import { UtilFunctions } from "src/app/helpers/util-functions";
import { Noten, Notenmappe } from "src/app/models/Noten";
import { PermissionMap } from "src/app/models/User";
import { InfoService } from "src/app/services/info.service";
import { NotenService } from "src/app/services/noten.service";
import { NotenSucheOutput } from "src/app/utilities/mkj-notensuche/mkj-notensuche.component";
import { MkjToolbarService } from "src/app/utilities/mkj-toolbar/mkj-toolbar.service";

@Component({
    selector: "notenmappe-details",
    templateUrl: "./notenmappe-details.component.html",
    styleUrls: ["./notenmappe-details.component.scss"],
})
export class NotenmappeDetailsComponent implements EditComponentDeactivate {
    public formGroup: FormGroup;

    public isSaving: boolean;
    public loading: boolean;
    public tableLocked: boolean;

    constructor(
        private toolbarService: MkjToolbarService,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private infoService: InfoService,
        private notenService: NotenService
    ) {
        this.initToolbar();

        const id = this.route.snapshot.params.id;
        if (id && id !== "neu") {
            this.loadMappe(id);
        } else {
            this.toolbarService.buttons[0].hidden = true;
            this.formGroup = UtilFunctions.getNotenMappeFormGroup(fb);
            this.formGroup.updateValueAndValidity();
        }
    }

    public canDeactivate(): boolean {
        return this.formGroup.pristine;
    }

    private initToolbar(): void {
        this.toolbarService.backButton = true;
        this.toolbarService.buttons = [
            {
                label: "Löschen",
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
                this.formGroup = UtilFunctions.getNotenMappeFormGroup(
                    this.fb,
                    res
                );
                this.formGroup.updateValueAndValidity();
                this.sortNoten(res);
                this.loading = false;
            },
            error: (err) => {
                this.infoService.error(err);
                this.loading = false;
            },
        });
    }

    public saveMappe() {
        this.isSaving = true;
        const newMappe = this.formGroup.controls.id.value;
        if (!newMappe) {
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
                        this.loadMappe(res.id);
                        this.formGroup.markAsPristine();
                    },
                    error: (err) => {
                        this.infoService.error(err);
                        this.isSaving = false;
                    },
                });
        }
        //     this.newMappeSubmitted = true;
        //     if (!this.selectedMappe.name) return;
        //     this.loading = true;
        //     if (this.selectedMappe.id) {
        //         this.notenService.updateNotenmappe(this.selectedMappe).subscribe({
        //             next: (res) => {
        //                 const index = this.notenmappen.findIndex(
        //                     (e) => e.id === res.id
        //                 );
        //                 this.notenmappen[index] = res;
        //                 this.infoService.success(res.name + " aktualisiert!");
        //                 this.selectedMappe = null;
        //                 this.loading = false;
        //                 this.newMappeSubmitted = false;
        //                 this.addDialogVisible = false;
        //             },
        //             error: (err) => {
        //                 this.infoService.error(err);
        //                 this.selectedMappe = null;
        //                 this.loading = false;
        //                 this.addDialogVisible = false;
        //             },
        //         });
        //     } else {
        //         this.notenService.createNotenmappe(this.selectedMappe).subscribe({
        //             next: (res) => {
        //                 this.notenmappen.push(res);
        //                 this.infoService.success(res.name + " erstellt!");
        //                 this.selectedMappe = null;
        //                 this.loading = false;
        //                 this.newMappeSubmitted = false;
        //                 this.addDialogVisible = false;
        //             },
        //             error: (err) => {
        //                 this.infoService.error(err);
        //                 this.selectedMappe = null;
        //                 this.loading = false;
        //                 this.addDialogVisible = false;
        //             },
        //         });
        //     }
    }

    // public addNotenToMappe(event: NotenSucheOutput) {
    //     this.loading = true;
    //     const noten = event.noten;
    //     const mappenId = this.selectedMappe.id;
    //     this.notenService
    //         .attachNotenToMappe(noten.id, mappenId, event.verzeichnisNr)
    //         .subscribe({
    //             next: (res) => {
    //                 noten.pivot = { verzeichnisNr: event.verzeichnisNr };
    //                 this.selectedMappe.noten.push(noten);
    //                 this.sortNoten(this.selectedMappe);
    //                 this.loading = false;
    //                 this.selectedNoten = null;
    //             },
    //             error: (err) => {
    //                 this.loading = false;
    //                 this.infoService.error(err);
    //             },
    //         });
    // }

    // public detachNotenFromMappe(noten: Noten) {
    //     this.loading = true;
    //     const mappenId = this.selectedMappe.id;
    //     this.notenService.detachNotenFromMappe(noten.id, mappenId).subscribe({
    //         next: (res) => {
    //             this.selectedMappe.noten = this.selectedMappe.noten.filter(
    //                 (e) => e.id !== noten.id
    //             );
    //             this.loading = false;
    //         },
    //         error: (err) => this.infoService.error(err),
    //     });
    // }

    public deleteNotenmappe() {
        this.infoService
            .confirmDelete(null, () =>
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

    private sortNoten(mappe: Notenmappe) {
        if (mappe.hatVerzeichnis) {
            mappe.noten?.sort((a, b) =>
                a.pivot.verzeichnisNr.localeCompare(b.pivot.verzeichnisNr)
            );
        } else {
            mappe.noten?.sort((a, b) => a.titel.localeCompare(b.titel));
        }
    }
}
