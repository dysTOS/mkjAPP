import { MenuLabels } from './../../mkjInterfaces/Menu';
import { AppMainComponent } from './../../app.main.component';
import { Mitglied } from 'src/app/mkjInterfaces/Mitglied';
import { UserService } from './../../mkjServices/authentication/user.service';
import { AusrueckungenService } from './../../mkjServices/ausrueckungen.service';
import { Ausrueckung } from 'src/app/mkjInterfaces/Ausrueckung';
import { Component, OnInit } from '@angular/core';
import { RoleType } from 'src/app/mkjInterfaces/User';


@Component({
    selector: 'app-mkj-dashboard',
    templateUrl: './mkj-dashboard.component.html',
    styleUrls: ['./mkj-dashboard.component.scss']
})
export class MkjDashboardComponent implements OnInit {
    nextAusrueckung: Ausrueckung;
    nextAusrueckungLoading: boolean = false;

    currentMitglied: Mitglied;

    RoleType = RoleType;
    MenuLabels = MenuLabels;

    constructor(private ausrueckungService: AusrueckungenService,
        public userService: UserService, public appMain: AppMainComponent) { }

    ngOnInit(): void {
        this.nextAusrueckungLoading = true;
        this.ausrueckungService.getNextAusrueckung().subscribe((ausrueckung) => {
            this.nextAusrueckung = ausrueckung, this.nextAusrueckungLoading = false
        }, (error) => this.nextAusrueckungLoading = false);

        this.userService.getCurrentMitglied().subscribe((m) => this.currentMitglied = m)
    }

}




