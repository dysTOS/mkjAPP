import { Component, OnInit } from "@angular/core";
import { Mitglied } from "src/app/models/Mitglied";
import { UserService } from "src/app/services/authentication/user.service";
import { AppMainComponent } from "../../app.main.component";

@Component({
    selector: "app-mkj-dashboard",
    templateUrl: "./mkj-dashboard.component.html",
    styleUrls: ["./mkj-dashboard.component.scss"],
})
export class MkjDashboardComponent implements OnInit {
    public currentMitglied: Mitglied;

    constructor(
        public userService: UserService,
        public appMain: AppMainComponent
    ) {}

    public ngOnInit(): void {
        this.userService
            .getCurrentMitglied()
            .subscribe((m) => (this.currentMitglied = m));
    }
}
