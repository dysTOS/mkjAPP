import { ConfirmationService } from "primeng/api";
import { Permission, PermissionMap, Role } from "../../../models/User";
import { RoleService } from "../../../services/role.service";
import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/authentication/user.service";
import { InfoService } from "src/app/services/info.service";
import { MkjToolbarService } from "src/app/utilities/mkj-toolbar/mkj-toolbar.service";

@Component({
    selector: "app-rollen-edit",
    templateUrl: "./rollen-edit.component.html",
    styleUrls: ["./rollen-edit.component.scss"],
})
export class RollenEditComponent implements OnInit {
    public roles: Role[];
    public selectedRole: Role;
    public permissions: Permission[];
    public rolePermissions: Permission[];

    public rolesLoading = false;
    public permissionsLoading = false;
    public rolePermissionsLoading = false;
    public isSaving = false;
    public isCreating = false;

    public addDialogVisible = false;
    public addRoleName: string;

    constructor(
        private roleService: RoleService,
        private infoService: InfoService,
        private confirmationService: ConfirmationService,
        private userService: UserService,
        private toolbarService: MkjToolbarService
    ) {
        this.toolbarService.header = "Rollen & Rechte";
        this.toolbarService.buttons = [
            {
                label: "Neue Rolle",
                click: () => {
                    this.addDialogVisible = true;
                },
                icon: "pi pi-plus",
                permissions: [PermissionMap.ROLE_SAVE],
            },
        ];
    }

    public ngOnInit(): void {
        this.init();
    }

    private init() {
        this.rolesLoading = true;
        this.permissionsLoading = true;
        this.roleService.getAllRoles().subscribe({
            next: (res) => {
                this.roles = res;
                this.rolesLoading = false;
            },
            error: (err) => {
                this.rolesLoading = false;
                this.infoService.error(err);
            },
        });
        this.roleService.getAllPermissions().subscribe({
            next: (res) => {
                this.permissions = res;
                this.permissionsLoading = false;
            },
            error: (err) => {
                this.permissionsLoading = false;
                this.infoService.error(err);
            },
        });
    }

    public loadPermissionsForRole() {
        this.rolePermissions = null;
        if (!this.selectedRole) return;
        this.rolePermissionsLoading = true;
        this.roleService.getPermissionsForRole(this.selectedRole.id).subscribe({
            next: (res) => {
                this.rolePermissions = res;
                this.rolePermissionsLoading = false;
            },
            error: (err) => {
                this.rolePermissionsLoading = false;
                this.infoService.error(err);
            },
        });
    }

    public saveRolePermissions() {
        this.isSaving = true;
        this.roleService
            .updateRole(this.selectedRole, this.rolePermissions)
            .subscribe({
                next: (res) => {
                    this.selectedRole = res;
                    this.isSaving = false;
                    this.userService.renewCurrentUserData();
                    this.infoService.success("Rolle aktualisiert!");
                },
                error: (err) => {
                    this.isSaving = false;
                    this.infoService.error(err);
                },
            });
    }

    public createRole(name: string) {
        this.isCreating = true;
        this.roleService.createRole(name, this.rolePermissions).subscribe({
            next: (res) => {
                this.init();
                this.isCreating = false;
                this.infoService.success("Rolle erstellt!");
                this.addRoleName = null;
                this.rolePermissions = null;
                this.addDialogVisible = false;
            },
            error: (err) => {
                this.isCreating = false;
                this.infoService.error(err);
            },
        });
    }

    public deleteRole(role: Role) {
        this.confirmationService.confirm({
            header: "Rolle " + role.name + " löschen?",
            icon: "pi pi-exclamation-triangle",
            accept: () => {
                this.rolesLoading = true;
                this.roleService.deleteRole(role).subscribe({
                    next: (res) => {
                        this.init();
                        this.userService.renewCurrentUserData();
                        this.infoService.success("Rolle gelöscht!");
                    },
                    error: (err) => {
                        this.init();
                        this.infoService.error(err);
                    },
                });
            },
        });
    }
}
