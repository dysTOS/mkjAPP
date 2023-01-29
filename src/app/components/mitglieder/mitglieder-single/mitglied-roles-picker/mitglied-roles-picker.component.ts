import { Component, Input } from "@angular/core";
import { Mitglied } from "src/app/models/Mitglied";
import { Role } from "src/app/models/User";
import { UserService } from "src/app/services/authentication/user.service";
import { InfoService } from "src/app/services/info.service";
import { RoleService } from "src/app/services/role.service";

@Component({
    selector: "mitglied-roles-picker",
    templateUrl: "./mitglied-roles-picker.component.html",
    styleUrls: ["./mitglied-roles-picker.component.sass"],
})
export class MitgliedRolesPickerComponent {
    private _mitglied: Mitglied;
    @Input()
    public get mitglied(): Mitglied {
        return this._mitglied;
    }
    public set mitglied(value: Mitglied) {
        this._mitglied = value;
        this.initRolesAndPermissions(value.user_id);
    }

    public rolesLoading: boolean = false;
    public rolesSaving: boolean = false;

    public selectedRoles: Role[];
    public allRoles: Role[];

    constructor(
        private roleService: RoleService,
        private infoService: InfoService,
        private userService: UserService
    ) {}

    public initRolesAndPermissions(id: any) {
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

    public updateRoles() {
        this.rolesSaving = true;
        this.roleService
            .assignRolesToUser(this.selectedRoles, this.mitglied.user_id)
            .subscribe({
                next: (res) => {
                    this.selectedRoles = res;
                    this.rolesSaving = false;
                    if (
                        this.mitglied.user_id ===
                        this.userService.getCurrentUserId()
                    ) {
                        this.userService.renewCurrentUserData();
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
}
