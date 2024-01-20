import { Component, Input } from "@angular/core";
import { Mitglied } from "src/app/models/Mitglied";
import { Termin } from "src/app/models/Termin";
import { MitgliederApiService } from "src/app/services/api/mitglieder-api.service";
import { InfoService } from "src/app/services/info.service";

@Component({
    selector: "anwesenheits-liste",
    templateUrl: "./anwesenheits-liste.component.html",
    styleUrls: ["./anwesenheits-liste.component.scss"],
})
export class AnwesenheitsListeComponent {
    private _termin: Termin;
    @Input()
    public get termin(): Termin {
        return this._termin;
    }
    public set termin(value: Termin) {
        this._termin = value;
        if (value) {
            this.initMitglieder(value.id);
        }
    }

    public presentMitglieder: Mitglied[];
    public gruppenMitglieder: Mitglied[];

    public saving: boolean = false;

    constructor(
        private mitgliedService: MitgliederApiService,
        private infoService: InfoService
    ) {}

    public initMitglieder(id: string) {
        this.mitgliedService
            .getList({
                filterAnd: [
                    {
                        field: "aktiv",
                        operator: "=",
                        value: true,
                    },
                ],
                sort: { field: "zuname", order: "asc" },
            })
            .subscribe({
                next: (res) => (this.gruppenMitglieder = res.values),
                error: (err) => this.infoService.error(err),
            });
        this.mitgliedService.getMitgliederForAusrueckung(id).subscribe({
            next: (res) => (this.presentMitglieder = res),
            error: (err) => this.infoService.error(err),
        });
    }

    public onMitgliederChange(event) {
        this.saving = true;
        const newSelection = event.value;
        const attachMitglied = newSelection.filter(
            (e) => !this.presentMitglieder.includes(e)
        );
        const detachMitglied = this.presentMitglieder.filter(
            (e) => !newSelection.includes(e)
        );
        this.presentMitglieder = newSelection;
        if (attachMitglied[0]) {
            this.mitgliedService
                .attachMitgliedToAusrueckung(
                    this.termin.id,
                    attachMitglied[0].id
                )
                .subscribe({
                    next: (res) => {
                        this.infoService.success(res.message);
                        this.saving = false;
                    },
                    error: (error) => {
                        this.infoService.error(error);
                        this.saving = false;
                    },
                });
        }
        if (detachMitglied[0]) {
            this.mitgliedService
                .detachMitgliedFromAusrueckung(
                    this.termin.id,
                    detachMitglied[0].id
                )
                .subscribe({
                    next: (res) => {
                        this.infoService.info(res.message);
                        this.saving = false;
                    },
                    error: (error) => {
                        this.infoService.error(error);
                        this.saving = false;
                    },
                });
        }
    }
}
