import { Mitglied_Geschlecht } from './../../../mkjInterfaces/Mitglied';
import { Mitglied } from 'src/app/mkjInterfaces/Mitglied';
import { Component, Input } from '@angular/core';
import * as moment from 'moment'

@Component({
    selector: 'app-mitglied-editor',
    templateUrl: './mitglied-editor.component.html',
    styleUrls: ['./mitglied-editor.component.scss']
})
export class MitgliedEditorComponent {
    private _mitglied: Mitglied;
    @Input()
    public get mitglied(): Mitglied {
        return this._mitglied;
    }
    public set mitglied(value: Mitglied) {
        this._mitglied = value;
        if (this.mitglied.geburtsdatum) {
            this.geburtsdatum = new Date(this.mitglied.geburtsdatum);
        }
        if (this.mitglied.eintrittDatum) {
            this.eintrittDatum = new Date(this.mitglied.eintrittDatum);
        }
        if (this.mitglied.austrittDatum) {
            this.austrittDatum = new Date(this.mitglied.austrittDatum);
        }
    }

    @Input()
    public personalMode: boolean = false;

    public geburtsdatum: Date;
    public eintrittDatum: Date;
    public austrittDatum: Date;

    public mitgliedGeschlecht = Mitglied_Geschlecht;

    public setGeburtsdatum(date: Date) {
        if (date) {
            this.mitglied.geburtsdatum = moment(date).format('YYYY-MM-DD');
        }
        else {
            this.mitglied.geburtsdatum = null;
        }
    }
    public setEintrittDatum(date: Date) {
        if (date) {
            this.mitglied.eintrittDatum = moment(date).format('YYYY-MM-DD');
        }
        else {
            this.mitglied.eintrittDatum = null;
        }
    }
    public setAustrittDatum(date: Date) {
        if (date) {
            this.mitglied.austrittDatum = moment(date).format('YYYY-MM-DD');
        }
        else {
            this.mitglied.austrittDatum = null;
        }
    }
}

