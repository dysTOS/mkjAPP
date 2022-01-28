import { AusrueckungenService } from './../../mkjServices/ausrueckungen.service';
import { Ausrueckung } from 'src/app/mkjInterfaces/Ausrueckung';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-mkj-dashboard',
    templateUrl: './mkj-dashboard.component.html',
    styleUrls: ['./mkj-dashboard.component.scss']
})
export class MkjDashboardComponent implements OnInit {
    nextAusrueckung: Ausrueckung;

    constructor(private ausrueckungService: AusrueckungenService) { }

    ngOnInit(): void {
        this.ausrueckungService.getNextAusrueckung().subscribe((ausrueckung) => this.nextAusrueckung = ausrueckung);
    }

}
