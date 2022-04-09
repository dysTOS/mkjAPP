import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-mkj-toolbar',
    templateUrl: './mkj-toolbar.component.html',
    styleUrls: ['./mkj-toolbar.component.scss']
})
export class MkjToolbarComponent implements OnInit {
    @Input()
    showAddButton = true;
    @Input()
    addButtonTooltip = 'Neu';
    @Input()
    showBackButton = true;
    @Input()
    showExportButton = true;

    @Input()
    header: string;

    @Output()
    navigateBack = new EventEmitter();
    @Output()
    clickAdd = new EventEmitter();
    @Output()
    clickExport = new EventEmitter();

    constructor() { }

    ngOnInit(): void {
    }


}
