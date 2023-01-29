import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ConfirmationService } from "primeng/api";
import { Mitglied } from "src/app/models/Mitglied";
import { InfoService } from "src/app/services/info.service";
import { MkjToolbarService } from "src/app/utilities/mkj-toolbar/mkj-toolbar.service";
import { PermissionMap, Role } from "../../../models/User";
import { MitgliederApiService } from "../../../services/api/mitglieder-api.service";

@Component({
    selector: "app-mitglieder-single",
    templateUrl: "./mitglieder-single.component.html",
    styleUrls: ["./mitglieder-single.component.scss"],
})
export class MitgliederSingleComponent implements OnInit {
    mitglied: Mitglied;
    mitgliedLoading: boolean = false;

    editMitglied: Mitglied;
    editDialogVisible: boolean = false;
    mitgliedSaving: boolean = false;

    constructor(
        private mitgliederService: MitgliederApiService,
        private confirmationService: ConfirmationService,
        private router: Router,
        private route: ActivatedRoute,
        private infoService: InfoService,
        private toolbarService: MkjToolbarService
    ) {
        this.toolbarService.header = "Mitglied";
        this.toolbarService.backButton = true;
        this.toolbarService.buttons = [
            // {
            //     icon: "pi pi-pencil",
            //     click: () => this.openEditDialog(),
            //     label: "Bearbeiten",
            //     permissions: [PermissionMap.MITGLIEDER_SAVE],
            // },
            // {
            //     icon: "pi pi-trash",
            //     click: () => this.deleteMitglied(),
            //     permissions: [PermissionMap.MITGLIEDER_DELETE],
            //     label: "Löschen",
            // },
        ];
    }

    ngOnInit(): void {
        if (this.mitgliederService.hasSelectedMitglied()) {
            this.mitglied = this.mitgliederService.getSelectedMitglied();
        } else {
            this.mitgliedLoading = true;
            this.route.params.subscribe((e) => {
                this.mitgliederService.getSingleMitglied(e.id).subscribe({
                    next: (m) => {
                        this.mitglied = m;
                        this.mitgliedLoading = false;
                    },
                    error: (error) => {
                        this.infoService.error(error);
                        this.mitgliedLoading = false;
                    },
                });
            });
        }
    }

    openEditDialog() {
        this.editMitglied = { ...this.mitglied };
        this.editDialogVisible = true;
    }

    cancelEdit() {
        this.editMitglied = null;
        this.editDialogVisible = false;
    }

    saveMitglied() {
        this.mitgliedSaving = true;
        this.mitgliederService.updateMitglied(this.editMitglied).subscribe({
            next: (res) => {
                this.mitglied = res;
                this.infoService.success("Daten gespeichert!");
                this.editDialogVisible = false;
                this.mitgliedSaving = false;
            },
            error: (error) => {
                this.mitgliedSaving = false;
                this.infoService.error(error);
            },
        });
    }

    public deleteMitglied() {
        let name = this.mitglied.vorname + " " + this.mitglied.zuname;
        this.confirmationService.confirm({
            header: "Mitglied " + name + " löschen?",
            icon: "pi pi-exclamation-triangle",
            accept: () => {
                this.mitgliederService.deleteMitglied(this.mitglied).subscribe({
                    next: (res) => {
                        this.infoService.success(
                            "Mitglied " + name + " gelöscht!"
                        );
                        this.navigateBack();
                    },
                    error: (error) => this.infoService.error(error),
                });
            },
        });
    }

    navigateBack() {
        this.mitgliederService.setSelectedMitglied(null);
        this.router.navigate(["/mitglieder"], { relativeTo: this.route });
    }
}
