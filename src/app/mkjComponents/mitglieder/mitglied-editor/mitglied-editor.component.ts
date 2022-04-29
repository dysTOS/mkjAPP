import { Mitglied } from 'src/app/mkjInterfaces/Mitglied';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-mitglied-editor',
    templateUrl: './mitglied-editor.component.html',
    styleUrls: ['./mitglied-editor.component.scss']
})
export class MitgliedEditorComponent implements OnInit {
    @Input()
    mitglied: Mitglied;

    constructor() { }

    ngOnInit(): void {
    }

}
