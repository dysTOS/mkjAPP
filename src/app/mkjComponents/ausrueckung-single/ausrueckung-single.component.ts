import { AusrueckungenService } from './../../mkjServices/ausrueckungen.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Ausrueckung } from 'src/app/mkjInterfaces/Ausrueckung';

@Component({
    selector: 'app-ausrueckung-single',
    templateUrl: './ausrueckung-single.component.html',
    styleUrls: ['./ausrueckung-single.component.scss']
})
export class AusrueckungSingleComponent implements OnInit {
    ausrueckung: Ausrueckung;
    loading: boolean = true;

    constructor(private router: Router, private route: ActivatedRoute, private ausrueckungenService: AusrueckungenService) { }

    ngOnInit(): void {
        if (this.ausrueckungenService.hasSelectedAusrueckung()) {
            this.ausrueckung = this.ausrueckungenService.getSelectedAusrueckung();
            this.loading = false;
        }
        else {
            let ausrueckungID;
            this.route.params.subscribe(e => ausrueckungID = e.id);
            this.ausrueckungenService.getSingleAusrueckung(ausrueckungID).subscribe(
                (ausrueckung) => this.ausrueckung = ausrueckung,
                (error) => { },
                () => this.loading = false
            );
        }
    }

    navigateBack() {
        this.ausrueckungenService.setSelectedAusrueckung(null);
        this.router.navigate(['/ausrueckungen'], { relativeTo: this.route });
    }

}
