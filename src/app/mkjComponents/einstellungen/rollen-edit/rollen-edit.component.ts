import { UserService } from "src/app/mkjServices/authentication/user.service";
import { ConfirmationService } from "primeng/api";
import { InfoService } from "../../../mkjServices/info.service";
import { Permission, Role } from "../../../mkjInterfaces/User";
import { RoleService } from "../../../mkjServices/role.service";
import { Component, OnInit } from "@angular/core";

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
        private userService: UserService
    ) {}

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
                    this.userService.renewCurrentUserPermissions();
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
                        this.userService.renewCurrentUserPermissions();
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
