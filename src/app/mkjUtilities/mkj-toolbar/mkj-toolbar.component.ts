import { Subscription } from 'rxjs';
import { UserService } from './../../mkjServices/authentication/user.service';
import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'app-mkj-toolbar',
    templateUrl: './mkj-toolbar.component.html',
    styleUrls: ['./mkj-toolbar.component.scss']
})
export class MkjToolbarComponent implements OnInit, OnDestroy {
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
    addButtonPermissions: string[];
    addButtonPermission: boolean = false;
    @Input()
    editButtonPermissions: string[];
    editButtonPermission: boolean = false;
    @Input()
    exportButtonPermissions: string[];
    exportButtonPermission: boolean = false;
    @Input()
    filterButtonPermissions: string[];
    filterButtonPermission: boolean = false;
    @Input()
    deleteButtonPermissions: string[];
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

    private userSub$: Subscription;

    constructor(private userService: UserService) { }

    public ngOnInit() {
        this.userSub$ = this.userService.getCurrentUserPermissions().subscribe({
            next: (res) => {
                this.checkPermissions();
            }
        })
    }

    public ngOnDestroy(): void {
        this.userSub$.unsubscribe();
    }

    private checkPermissions() {
        if (this.addButtonPermissions && !this.userService.hasOneOfPermissions(this.addButtonPermissions)) {
            this.addButtonPermission = false;
        }
        else {
            this.addButtonPermission = true;
        }
        if (this.editButtonPermissions && !this.userService.hasOneOfPermissions(this.editButtonPermissions)) {
            this.editButtonPermission = false;
        }
        else {
            this.editButtonPermission = true;
        }
        if (this.filterButtonPermissions && !this.userService.hasOneOfPermissions(this.filterButtonPermissions)) {
            this.filterButtonPermission = false;
        }
        else {
            this.filterButtonPermission = true;
        }
        if (this.exportButtonPermissions && !this.userService.hasOneOfPermissions(this.exportButtonPermissions)) {
            this.exportButtonPermission = false;
        }
        else {
            this.exportButtonPermission = true;
        }
        if (this.deleteButtonPermissions && !this.userService.hasOneOfPermissions(this.deleteButtonPermissions)) {
            this.deleteButtonPermission = false;
        }
        else {
            this.deleteButtonPermission = true;
        }
    }
}
