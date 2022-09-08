import { AppMainComponent } from "./../../app.main.component";
import { Mitglied } from "src/app/interfaces/Mitglied";
import { AusrueckungenService } from "../../services/ausrueckungen.service";
import { Ausrueckung } from "src/app/interfaces/Ausrueckung";
import { Component, OnInit } from "@angular/core";
import { MenuLabels } from "src/app/app.menu.service";
import { UserService } from "src/app/services/authentication/user.service";

@Component({
    selector: "app-mkj-dashboard",
    templateUrl: "./mkj-dashboard.component.html",
    styleUrls: ["./mkj-dashboard.component.scss"],
})
export class MkjDashboardComponent implements OnInit {
    nextAusrueckung: Ausrueckung;
    nextAusrueckungLoading: boolean = false;

    currentMitglied: Mitglied;
    MenuLabels = MenuLabels;

    constructor(
        private ausrueckungService: AusrueckungenService,
        public userService: UserService,
        public appMain: AppMainComponent
    ) {}

    ngOnInit(): void {
        this.nextAusrueckungLoading = true;
        this.ausrueckungService.getNextAusrueckung().subscribe(
            (ausrueckung) => {
                (this.nextAusrueckung = ausrueckung),
                    (this.nextAusrueckungLoading = false);
            },
            (error) => (this.nextAusrueckungLoading = false)
        );

        this.userService
            .getCurrentMitglied()
            .subscribe((m) => (this.currentMitglied = m));
    }
}
