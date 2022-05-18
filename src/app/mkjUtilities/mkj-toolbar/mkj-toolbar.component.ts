import { UserService } from './../../mkjServices/authentication/user.service';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

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
    addButtonPermissionFor: string[];
    addButtonPermission: boolean = false;
    @Input()
    editButtonPermissionFor: string[];
    editButtonPermission: boolean = false;
    @Input()
    exportButtonPermissionFor: string[];
    exportButtonPermission: boolean = false;
    @Input()
    filterButtonPermissionFor: string[];
    filterButtonPermission: boolean = false;
    @Input()
    deleteButtonPermissionFor: string[];
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
        this.userService.currentPermissions.subscribe({
            next: (res) => {
                this.checkPermissions();
            }
        })
    }

    private checkPermissions() {
        if (this.addButtonPermissionFor && !this.userService.hasOneOfPermissions(this.addButtonPermissionFor)) {
            this.addButtonPermission = false;
        }
        else {
            this.addButtonPermission = true;
        }
        if (this.editButtonPermissionFor && !this.userService.hasOneOfPermissions(this.editButtonPermissionFor)) {
            this.editButtonPermission = false;
        }
        else {
            this.editButtonPermission = true;
        }
        if (this.filterButtonPermissionFor && !this.userService.hasOneOfPermissions(this.filterButtonPermissionFor)) {
            this.filterButtonPermission = false;
        }
        else {
            this.filterButtonPermission = true;
        }
        if (this.exportButtonPermissionFor && !this.userService.hasOneOfPermissions(this.exportButtonPermissionFor)) {
            this.exportButtonPermission = false;
        }
        else {
            this.exportButtonPermission = true;
        }
        if (this.deleteButtonPermissionFor && !this.userService.hasOneOfPermissions(this.deleteButtonPermissionFor)) {
            this.deleteButtonPermission = false;
        }
        else {
            this.deleteButtonPermission = true;
        }
    }
}
