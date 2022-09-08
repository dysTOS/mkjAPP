import { ConfirmationService } from "primeng/api";
import { RoleService } from "../../../services/role.service";
import { Role } from "../../../interfaces/User";
import { ActivatedRoute, Router } from "@angular/router";
import { MitgliederService } from "../../../services/mitglieder.service";
import { Component, OnInit } from "@angular/core";
import { Mitglied } from "src/app/interfaces/Mitglied";
import { UserService } from "src/app/services/authentication/user.service";
import { InfoService } from "src/app/services/info.service";

@Component({
    selector: "app-mitglieder-single",
    templateUrl: "./mitglieder-single.component.html",
    styleUrls: ["./mitglieder-single.component.scss"],
})
export class MitgliederSingleComponent implements OnInit {
    mitglied: Mitglied;
    selectedRoles: Role[];
    allRoles: Role[];
    mitgliedLoading: boolean = false;
    rolesLoading: boolean = false;
    rolesSaving: boolean = false;

    editMitglied: Mitglied;
    editDialogVisible: boolean = false;
    mitgliedSaving: boolean = false;

    constructor(
        private mitgliederService: MitgliederService,
        private roleService: RoleService,
        private confirmationService: ConfirmationService,
        private router: Router,
        private route: ActivatedRoute,
        private infoService: InfoService,
        private userService: UserService
    ) {}

    ngOnInit(): void {
        if (this.mitgliederService.hasSelectedMitglied()) {
            this.mitglied = this.mitgliederService.getSelectedMitglied();
            this.initRolesAndPermissions(this.mitglied.user_id);
        } else {
            this.mitgliedLoading = true;
            this.route.params.subscribe((e) => {
                this.mitgliederService.getSingleMitglied(e.id).subscribe({
                    next: (m) => {
                        this.mitglied = m;
                        this.initRolesAndPermissions(this.mitglied.user_id);
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

    initRolesAndPermissions(id: any) {
        if (!id) return;
        this.rolesLoading = true;
        this.roleService.getAllRoles().subscribe({
            next: (roles) => {
                this.allRoles = roles;
            },
            error: (err) => {
                this.infoService.error(err);
                this.allRoles = null;
            },
        });
        this.roleService.getUserRoles(id).subscribe({
            next: (roles) => {
                this.selectedRoles = roles;
                this.rolesLoading = false;
            },
            error: (error) => {
                this.rolesLoading = false;
                this.allRoles = null;
                this.infoService.error(error);
            },
        });
    }

    updateRoles() {
        this.rolesSaving = true;
        this.roleService
            .assignRolesToUser(this.selectedRoles, this.mitglied.user_id)
            .subscribe({
                next: (res) => {
                    this.selectedRoles = res;
                    this.rolesSaving = false;
                    this.userService.setCurrentUserRoles(res);
                    console.log(
                        this.mitglied.user_id,
                        this.userService.getCurrentUserId()
                    );
                    if (
                        this.mitglied.user_id ===
                        this.userService.getCurrentUserId()
                    ) {
                        this.roleService
                            .getUserPermissions(this.mitglied.user_id)
                            .subscribe({
                                next: (res) =>
                                    this.userService.setCurrentUserPermissions(
                                        res
                                    ),
                            });
                    }
                    this.infoService.success("Rollen aktualisiert!");
                },
                error: (err) => {
                    this.infoService.error(err);
                    this.selectedRoles = null;
                    this.rolesSaving = false;
                },
            });
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
