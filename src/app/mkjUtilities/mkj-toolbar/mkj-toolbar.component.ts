import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-mkj-toolbar',
    templateUrl: './mkj-toolbar.component.html',
    styleUrls: ['./mkj-toolbar.component.scss']
})
export class MkjToolbarComponent {
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

    constructor() { }
}
