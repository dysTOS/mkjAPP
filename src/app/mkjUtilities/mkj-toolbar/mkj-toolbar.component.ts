import { RoleType } from './../../mkjInterfaces/User';
import { UserService } from './../../mkjServices/authentication/user.service';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Role } from 'src/app/mkjInterfaces/User';

@Component({
    selector: 'app-mkj-toolbar',
    templateUrl: './mkj-toolbar.component.html',
    styleUrls: ['./mkj-toolbar.component.scss']
})
export class MkjToolbarComponent implements OnInit {
    @Input()
    header: string;
    @Input()
    headerLeft: string;

    @Input()
    showAddButton = false;
    @Input()
    addButtonTooltip = 'Neu';
    @Input()
    showBackButton = false;
    @Input()
    showExportButton = false;
    @Input()
    exportButtonTooltip = 'Exportieren';
    @Input()
    showFilterButton = false;
    @Input()
    filterButtonTooltip = 'Filtern';
    @Input()
    showEditButton = false;
    @Input()
    editButtonTooltip = "Bearbeiten";
    @Input()
    showDeleteButton = false;
    @Input()
    deleteButtonTooltip = "Löschen";

    @Input()
    addButtonPermissionFor: RoleType[];
    addButtonPermission: boolean = false;
    @Input()
    editButtonPermissionFor: RoleType[];
    editButtonPermission: boolean = false;
    @Input()
    exportButtonPermissionFor: RoleType[];
    exportButtonPermission: boolean = false;
    @Input()
    filterButtonPermissionFor: RoleType[];
    filterButtonPermission: boolean = false;
    @Input()
    deleteButtonPermissionFor: RoleType[];
    deleteButtonPermission: boolean = false;

    @Output()
    navigateBack = new EventEmitter();
    @Output()
    clickAdd = new EventEmitter();
    @Output()
    clickExport = new EventEmitter();
    @Output()
    clickFilter = new EventEmitter();
    @Output()
    clickEdit = new EventEmitter();
    @Output()
    clickDelete = new EventEmitter();

    constructor(private userService: UserService) { }

    public ngOnInit() {
        this.userService.getCurrentUserRoles().subscribe({
            next: (res) => {
                this.checkPermissions();
            }
        })
    }

    private checkPermissions() {
        if (this.addButtonPermissionFor && !this.userService.hasOneOfRoles(this.addButtonPermissionFor)) {
            this.addButtonPermission = false;
        }
        else {
            this.addButtonPermission = true;
        }
        if (this.editButtonPermissionFor && !this.userService.hasOneOfRoles(this.editButtonPermissionFor)) {
            this.editButtonPermission = false;
        }
        else {
            this.editButtonPermission = true;
        }
        if (this.filterButtonPermissionFor && !this.userService.hasOneOfRoles(this.filterButtonPermissionFor)) {
            this.filterButtonPermission = false;
        }
        else {
            this.filterButtonPermission = true;
        }
        if (this.exportButtonPermissionFor && !this.userService.hasOneOfRoles(this.exportButtonPermissionFor)) {
            this.exportButtonPermission = false;
        }
        else {
            this.exportButtonPermission = true;
        }
        if (this.deleteButtonPermissionFor && !this.userService.hasOneOfRoles(this.deleteButtonPermissionFor)) {
            this.deleteButtonPermission = false;
        }
        else {
            this.deleteButtonPermission = true;
        }
    }
}
