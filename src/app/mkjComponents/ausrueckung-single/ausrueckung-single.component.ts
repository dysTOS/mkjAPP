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
        let ausrueckungID;
        this.route.params.subscribe(e => ausrueckungID = e.id);
        this.ausrueckungenService.getSingleAusrueckung(ausrueckungID).subscribe(
            (ausrueckung) => this.ausrueckung = ausrueckung,
            (error) => { },
            () => this.loading = false
        );
    }

    navigateBack() {
        this.router.navigate(['/ausrueckungen'], { relativeTo: this.route });
    }

}
