import { Component, OnInit } from "@angular/core";
import * as _ from "lodash";
import { Subscription } from "rxjs";
        import { Mitglied } from "src/app/interfaces/Mitglied";
import { UserService } from "src/app/services/authentication/user.service";
import { InfoService } from "src/app/services/info.service";
import { MitgliederService } from "src/app/services/mitglieder.service";

@Component({
    selector: "app-mitglied-personal-edit",
    templateUrl: "./mitglied-personal-edit.component.html",
    styleUrls: ["./mitglied-personal-edit.component.scss"],
})
export class MitgliedPersonalEditComponent implements OnInit {
    public mitglied: Mitglied;
    private mitgliedSub$: Subscription;
    public mitgliedSaving: boolean = false;

    constructor(
        private userservice: UserService,
        private mitgliederService: MitgliederService,
        private infoService: InfoService
    ) {}

    public ngOnInit(): void {
        this.mitgliedSub$ = this.userservice.getCurrentMitglied().subscribe({
            next: (res) => (this.mitglied = _.cloneDeep(res)),
        });
    }

    public ngOnDestroy(): void {
        this.mitgliedSub$.unsubscribe();
    }

    public updateOwnMitgliedData() {
        this.mitgliedSaving = true;
        this.mitgliederService.updateOwnMitgliedData(this.mitglied).subscribe({
            next: (res) => {
                this.infoService.success("Daten aktualisiert!");
                this.userservice.setCurrentMitglied(res);
                this.mitgliedSaving = false;
            },
            error: (err) => {
                this.mitgliedSaving = false;
                this.infoService.error(err);
            },
        });
    }
}
