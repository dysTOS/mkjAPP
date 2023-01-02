import { AppMainComponent } from "../../app.main.component";
import { Mitglied } from "src/app/models/Mitglied";
import { TermineApiService } from "../../services/api/termine-api.service";
import { Termin } from "src/app/models/Termin";
import { Component, OnInit } from "@angular/core";
import { MenuLabels } from "src/app/services/menu.service";
import { UserService } from "src/app/services/authentication/user.service";

@Component({
    selector: "app-mkj-dashboard",
    templateUrl: "./mkj-dashboard.component.html",
    styleUrls: ["./mkj-dashboard.component.scss"],
})
export class MkjDashboardComponent implements OnInit {
    nextAusrueckung: Termin;
    nextAusrueckungLoading: boolean = false;

    currentMitglied: Mitglied;
    MenuLabels = MenuLabels;

    constructor(
        private ausrueckungService: TermineApiService,
        public userService: UserService,
        public appMain: AppMainComponent
    ) {}

    ngOnInit(): void {
        this.nextAusrueckungLoading = true;
        this.ausrueckungService.getNextTermin().subscribe(
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
