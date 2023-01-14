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
    private _skip: number = 0;
    public get skip(): number {
        return this._skip;
    }
    public set skip(value: number) {
        this._skip = value;
        this.nextAusrueckung = null;
        this.getNextTermin();
    }

    nextAusrueckung: Termin;
    nextAusrueckungLoading: boolean = false;

    currentMitglied: Mitglied;
    MenuLabels = MenuLabels;

    constructor(
        private ausrueckungService: TermineApiService,
        public userService: UserService,
        public appMain: AppMainComponent
    ) {}

    public ngOnInit(): void {
        this.userService
            .getCurrentMitglied()
            .subscribe((m) => (this.currentMitglied = m));

        this.getNextTermin();
    }

    public getNextTermin(): void {
        this.nextAusrueckungLoading = true;
        this.ausrueckungService.getNextTermin(this.skip).subscribe({
            next: (ausrueckung) => {
                this.nextAusrueckung = ausrueckung;
                this.nextAusrueckungLoading = false;
            },
            error: (error) => {
                this.nextAusrueckungLoading = false;
            },
        });
    }
}
