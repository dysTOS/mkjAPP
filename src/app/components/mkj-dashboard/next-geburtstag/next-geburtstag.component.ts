import { Component } from "@angular/core";
import { Mitglied } from "src/app/models/Mitglied";
import { MitgliederApiService } from "src/app/services/api/mitglieder-api.service";

@Component({
    selector: "next-geburtstag",
    templateUrl: "./next-geburtstag.component.html",
    styleUrls: ["./next-geburtstag.component.scss"],
})
export class NextGeburtstagComponent {
    public mitglieder: Mitglied[];
    public loading: boolean;

    constructor(private mitgliederService: MitgliederApiService) {
        this.getNextGeburtstage();
    }

    public getNextGeburtstage(): void {
        this.loading = true;
        this.mitgliederService.getNextGeburtstag().subscribe({
            next: (mitglied) => {
                this.mitglieder = mitglied;
                this.loading = false;
            },
            error: (error) => {
                this.loading = false;
            },
        });
    }
}
