import { NotenService } from './../../../mkjServices/noten.service';
import { AusrueckungenService } from '../../../mkjServices/ausrueckungen.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Ausrueckung } from 'src/app/mkjInterfaces/Ausrueckung';
import { Noten } from 'src/app/mkjInterfaces/Noten';

@Component({
    selector: 'app-ausrueckung-single',
    templateUrl: './ausrueckung-single.component.html',
    styleUrls: ['./ausrueckung-single.component.scss']
})
export class AusrueckungSingleComponent implements OnInit {
    ausrueckung: Ausrueckung;
    loading: boolean = true;

    gespielteNoten: Noten[] = [];
    searchNotenResult: Noten[];
    searchNotenSingle: Noten;

    constructor(private router: Router, private route: ActivatedRoute,
        private ausrueckungenService: AusrueckungenService, private notenService: NotenService) { }

    ngOnInit(): void {
        if (this.ausrueckungenService.hasSelectedAusrueckung()) {
            this.ausrueckung = this.ausrueckungenService.getSelectedAusrueckung();
            this.getGespielteNoten();
            this.loading = false;
        }
        else {
            let ausrueckungID;
            this.route.params.subscribe(e => ausrueckungID = e.id);
            this.ausrueckungenService.getSingleAusrueckung(ausrueckungID).subscribe(
                (ausrueckung) => { this.ausrueckung = ausrueckung, this.getGespielteNoten() },
                (error) => { },
                () => this.loading = false
            );
        }

    }

    getGespielteNoten() {
        this.notenService.getNotenForAusrueckung(this.ausrueckung.id).subscribe({
            next: res => this.gespielteNoten = res
        })
    }

    searchNoten(event) {
        this.notenService.searchNoten(event.query).subscribe({
            next: res => this.searchNotenResult = res
        })
    }

    attachNoten(event) {
        this.notenService.attachNotenToAusrueckung(event.id, this.ausrueckung.id).subscribe({
            next: res => console.log(res)
        })
    }

    detachNoten(event) {
        this.notenService.detachNotenFromAusrueckung(event.id, this.ausrueckung.id).subscribe({
            next: res => console.log(res)
        })
    }

    navigateBack() {
        this.ausrueckungenService.setSelectedAusrueckung(null);
        this.router.navigate(['/ausrueckungen'], { relativeTo: this.route });
    }

}
