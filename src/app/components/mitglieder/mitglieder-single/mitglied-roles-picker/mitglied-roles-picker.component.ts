import { Component, EventEmitter, Input, Output } from "@angular/core";
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
    private _userId: string;
    @Input()
    public get userId(): string {
        return this._userId;
    }
    public set userId(value: string) {
        this._userId = value;
        this.initRolesAndPermissions(value);
    }

    public rolesLoading: boolean = false;
    public rolesSaving: boolean = false;

    public selectedRoles: Role[];
    public allRoles: Role[];

    public rolesTouched: boolean = false;

    @Output()
    public touched = new EventEmitter<boolean>();

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
            .assignRolesToUser(this.selectedRoles, this.userId)
            .subscribe({
                next: (res) => {
                    this.selectedRoles = res;
                    this.rolesSaving = false;
                    if (this.userId === this.userService.getCurrentUserId()) {
                        this.userService.renewCurrentUserData();
                    }
                    this.infoService.success("Rollen aktualisiert!");
                    this.rolesTouched = false;
                    this.touched.emit(false);
                },
                error: (err) => {
                    this.infoService.error(err);
                    this.selectedRoles = null;
                    this.rolesSaving = false;
                },
            });
    }
}
