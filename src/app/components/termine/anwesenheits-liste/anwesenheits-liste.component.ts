import { Component, Input } from "@angular/core";
import { SelectItemGroup } from "primeng/api";
import { Gruppe } from "src/app/models/Gruppe";
import { Mitglied } from "src/app/models/Mitglied";
import { Termin } from "src/app/models/Termin";
import { GruppenApiService } from "src/app/services/api/gruppen-api.service";
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
    public gruppenMitglieder: SelectItemGroup[];

    public saving: boolean = false;

    constructor(
        private mitgliedService: MitgliederApiService,
        private gruppenService: GruppenApiService,
        private infoService: InfoService
    ) {}

    public initMitglieder(id: string) {
        this.gruppenService.getList().subscribe({
            next: (res) => {
                this.gruppenMitglieder = res.values.map((g) => {
                    return {
                        label: g.name,
                        value: g,
                        items: g.mitglieder.map((m) => {
                            return {
                                label: m.vorname + " " + m.zuname,
                                value: m,
                            };
                        }),
                    };
                });
            },
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
