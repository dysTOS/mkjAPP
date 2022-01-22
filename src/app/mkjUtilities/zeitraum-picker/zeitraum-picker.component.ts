import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
    selector: 'app-zeitraum-picker',
    templateUrl: './zeitraum-picker.component.html',
    styleUrls: ['./zeitraum-picker.component.scss']
})
export class ZeitraumPickerComponent implements OnInit {
    private _vonDatum: String;

    @Input()
    public get vonDatum(): String {
        return this._vonDatum;
    }
    public set vonDatum(value: String) {
        this._vonDatum = value;
    }
    private _bisDatum: String;

    @Input()
    public get bisDatum(): String {
        return this._bisDatum;
    }
    public set bisDatum(value: String) {
        this._bisDatum = value;
    }

    @Output()
    vonDatumChange = new EventEmitter();
    @Output()
    bisDatumChange = new EventEmitter();

    constructor() { }

    ngOnInit(): void { }

    checkVonDate() {
        let date = this.vonDatum.split(". ");
        if (Number(date[2]) < 1893 || Number(date[2]) > 3000)
            date[2] = "____";
        if (Number(date[1]) < 1 || Number(date[1]) > 12)
            date[1] = "__";
        if (Number(date[0]) < 1 || Number(date[0]) > 31)
            date[0] = "__";

        this.vonDatum = date[0] + ". " + date[1] + ". " + date[2];
        this.vonDatumChange.emit(date[2] + "/" + date[1] + "/" + date[0]);
    }
    checkBisDate() {
        let date = this.bisDatum.split(". ");
        if (Number(date[2]) < 1893 || Number(date[2]) > 3000)
            date[2] = "____";
        if (Number(date[1]) < 1 || Number(date[1]) > 12)
            date[1] = "__";
        if (Number(date[0]) < 1 || Number(date[0]) > 31)
            date[0] = "__";

        this.bisDatum = date[0] + ". " + date[1] + ". " + date[2];
        this.bisDatumChange.emit(date[2] + "/" + date[1] + "/" + date[0]);
    }

}
