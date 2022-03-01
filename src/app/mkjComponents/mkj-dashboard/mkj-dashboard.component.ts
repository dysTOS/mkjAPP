import { Mitglied } from 'src/app/mkjInterfaces/Mitglied';
import { UserService } from './../../mkjServices/authentication/user.service';
import { Router } from '@angular/router';
import { TokenService } from './../../mkjServices/authentication/token.service';
import { AuthService } from './../../mkjServices/authentication/auth.service';
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
    nextAusrueckungLoading: boolean = false;

    currentMitglied: Mitglied;

    constructor(private ausrueckungService: AusrueckungenService,
        private userService: UserService) { }

    ngOnInit(): void {
        this.nextAusrueckungLoading = true;
        this.ausrueckungService.getNextAusrueckung().subscribe((ausrueckung) => {
            this.nextAusrueckung = ausrueckung, this.nextAusrueckungLoading = false
        }, (error) => this.nextAusrueckungLoading = false);

        this.userService.getCurrentMitglied().subscribe((m) => this.currentMitglied = m)
        this.userService.getCurrentUser().subscribe((m) => console.log(m))
        this.userService.getCurrentUserRoles().subscribe((m) => console.log(m))
    }



}
