import { Component, Input, OnInit } from '@angular/core';
import { Noten } from 'src/app/mkjInterfaces/Noten';

@Component({
    selector: 'app-noten-editor',
    templateUrl: './noten-editor.component.html',
    styleUrls: ['./noten-editor.component.scss']
})
export class NotenEditorComponent implements OnInit {
    @Input()
    noten: Noten;

    constructor() { }

    ngOnInit(): void {
    }

}
