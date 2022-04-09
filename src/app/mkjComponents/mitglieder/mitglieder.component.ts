import { Router, ActivatedRoute } from '@angular/router';
import { MitgliederService } from './../../mkjServices/mitglieder.service';
import { Component, OnInit } from '@angular/core';
import { Mitglied } from 'src/app/mkjInterfaces/Mitglied';
import { RoleType } from 'src/app/mkjInterfaces/User';

@Component({
    selector: 'app-mitglieder',
    templateUrl: './mitglieder.component.html',
    styleUrls: ['./mitglieder.component.scss']
})
export class MitgliederComponent implements OnInit {
    mitglieder: Array<Mitglied>;

    loading: boolean = false;
    RoleType = RoleType;

    constructor(private mitgliederService: MitgliederService,
        private router: Router, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.loadMitglieder();
    }

    private loadMitglieder() {
        this.loading = true;
        this.mitgliederService.getAllMitglieder().subscribe(
            (res) => { this.mitglieder = res, this.loading = false },
            (error) => { this.loading = false; },
        );
    }

    navigateSingleMitglied(mitglied: Mitglied) {
        this.mitgliederService.setSelectedMitglied(mitglied);
        this.router.navigate(['../mitglieder/' + mitglied.id], { relativeTo: this.route });
    }

}
