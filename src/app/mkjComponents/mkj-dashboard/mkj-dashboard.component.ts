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

    constructor(private router: Router, private ausrueckungService: AusrueckungenService, private authService: AuthService, private tokenService: TokenService) { }

    ngOnInit(): void {
        this.ausrueckungService.getNextAusrueckung().subscribe((ausrueckung) => this.nextAusrueckung = ausrueckung);
    }

    logout() {
        this.authService.logout({ name: "Roland", email: "rolandsams@gmail.com", passwort: "acdc" }).subscribe
            ((res) => console.log(res), (error) => console.log(error), () => this.tokenService.removeToken());
        this.router.navigate(['login']);
    }

    deleteUser() {
        this.authService.deleteUser({ name: "Roland", email: "rolandsams@gmail.com", passwort: "acdc" }).subscribe
            ((res) => console.log(res), (error) => console.log(error), () => this.tokenService.removeToken());
        this.router.navigate(['login']);
    }
}
