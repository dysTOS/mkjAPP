import { ActivatedRoute, Router } from '@angular/router';
import { MitgliederService } from './../../../mkjServices/mitglieder.service';
import { Component, OnInit } from '@angular/core';
import { Mitglied } from 'src/app/mkjInterfaces/Mitglied';

@Component({
    selector: 'app-mitglieder-single',
    templateUrl: './mitglieder-single.component.html',
    styleUrls: ['./mitglieder-single.component.scss']
})
export class MitgliederSingleComponent implements OnInit {
    mitglied: Mitglied;
    loading: boolean = true;

    constructor(private mitgliederService: MitgliederService,
        private router: Router, private route: ActivatedRoute) { }

    ngOnInit(): void {
        if (this.mitgliederService.hasSelectedMitglied()) {
            this.mitglied = this.mitgliederService.getSelectedMitglied();
        }
        else {
            let mitgliedID;
            this.route.params.subscribe(e => mitgliedID = e.id);
            this.mitgliederService.getSingleMitglied(mitgliedID).subscribe(
                (m) => this.mitglied = m,
                (error) => { },
                () => this.loading = false
            );
        }
    }

    navigateBack() {
        this.mitgliederService.setSelectedMitglied(null);
        this.router.navigate(['/mitglieder'], { relativeTo: this.route });
    }

}
