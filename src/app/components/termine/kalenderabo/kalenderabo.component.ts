import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/authentication/user.service";
import { environment } from "src/environments/environment";

@Component({
    selector: "app-kalenderabo",
    templateUrl: "./kalenderabo.component.html",
    styleUrls: ["./kalenderabo.component.scss"],
})
export class KalenderaboComponent implements OnInit {
    public calendarSubUrl: string = environment.apiUrl + "calendarsub";

    constructor(private userService: UserService) {}

    public ngOnInit(): void {
        const userId = this.userService.getCurrentUserId();
        if (userId) {
            this.calendarSubUrl = environment.apiUrl + "calendarsub/" + userId;
        }
    }

    public copyToClipboard() {
        navigator.clipboard.writeText(this.calendarSubUrl).then(() => {
            alert("Link wurde kopiert!");
        });
    }
}
