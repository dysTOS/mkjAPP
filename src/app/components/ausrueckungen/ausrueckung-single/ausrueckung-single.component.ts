import { ExportService } from "../../../services/export.service";
import { MitgliederService } from "../../../services/mitglieder.service";
import { Mitglied } from "src/app/models/Mitglied";
import { NotenService } from "../../../services/noten.service";
import { AusrueckungenService } from "../../../services/ausrueckungen.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Ausrueckung } from "src/app/models/Ausrueckung";
import { Noten } from "src/app/models/Noten";
import { InfoService } from "src/app/services/info.service";
import { MkjToolbarService } from "src/app/utilities/mkj-toolbar/mkj-toolbar.service";

@Component({
    selector: "app-ausrueckung-single",
    templateUrl: "./ausrueckung-single.component.html",
    styleUrls: ["./ausrueckung-single.component.scss"],
})
export class AusrueckungSingleComponent implements OnInit {
    ausrueckung: Ausrueckung;

    loading: boolean = true;
    notenLoading: boolean = true;

    gespielteNoten: Noten[] = [];
    searchNotenResult: Noten[];
    selectedNoten: Noten;

    mitglieder: Mitglied[];
    presentMitglieder: Mitglied[] = [];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private ausrueckungenService: AusrueckungenService,
        private infoService: InfoService,
        private mitgliedService: MitgliederService,
        private notenService: NotenService,
        private calExport: ExportService,
        private toolbarService: MkjToolbarService
    ) {
        this.toolbarService.header = "Details";
        this.toolbarService.backButton = true;
    }

    ngOnInit(): void {
        if (this.ausrueckungenService.hasSelectedAusrueckung()) {
            this.ausrueckung =
                this.ausrueckungenService.getSelectedAusrueckung();
            this.loading = false;
            this.getGespielteNoten();
            this.getAktiveMitglieder(this.ausrueckung.id);
        } else {
            this.route.params.subscribe((e) => {
                this.getAktiveMitglieder(e.id);
                this.ausrueckungenService.getSingleAusrueckung(e.id).subscribe(
                    (ausrueckung) => {
                        (this.ausrueckung = ausrueckung),
                            this.getGespielteNoten();
                    },
                    (error) => this.infoService.error(error),
                    () => (this.loading = false)
                );
            });
        }
    }

    getAktiveMitglieder(id: string) {
        this.mitgliedService.getAllMitglieder().subscribe({
            next: (res) => {
                this.mitglieder = res;
            },
            error: (err) => this.infoService.error(err),
        });
        this.mitgliedService.getMitgliederForAusrueckung(id).subscribe({
            next: (res) => (this.presentMitglieder = res),
            error: (err) => this.infoService.error(err),
        });
    }

    onMitgliederChange(event) {
        console.log(event);
        let newSelection = event.value;
        let attachMitglied = newSelection.filter(
            (e) => !this.presentMitglieder.includes(e)
        );
        let detachMitglied = this.presentMitglieder.filter(
            (e) => !newSelection.includes(e)
        );
        // console.log("ATTACH", attachRole, "DETACH", detachMitglied)
        this.presentMitglieder = newSelection;
        if (attachMitglied[0]) {
            this.mitgliedService
                .attachMitgliedToAusrueckung(
                    this.ausrueckung.id,
                    attachMitglied[0].id
                )
                .subscribe({
                    next: (res) => this.infoService.success(res.message),
                    error: (error) => this.infoService.error(error),
                });
        }
        if (detachMitglied[0]) {
            this.mitgliedService
                .detachMitgliedFromAusrueckung(
                    this.ausrueckung.id,
                    detachMitglied[0].id
                )
                .subscribe({
                    next: (res) => this.infoService.success(res.message),
                    error: (error) => this.infoService.error(error),
                });
        }
    }

    getGespielteNoten() {
        this.notenLoading = true;
        this.notenService
            .getNotenForAusrueckung(this.ausrueckung.id)
            .subscribe({
                next: (res) => {
                    this.gespielteNoten = res;
                },
                complete: () => (this.notenLoading = false),
            });
    }

    attachNoten(event) {
        this.notenLoading = true;
        this.notenService
            .attachNotenToAusrueckung(event.id, this.ausrueckung.id)
            .subscribe({
                next: (res) => {
                    this.gespielteNoten = [event, ...this.gespielteNoten];
                    this.notenLoading = false;
                    this.selectedNoten = null;
                },
                error: (error) => {
                    this.infoService.error(error);
                    this.notenLoading = false;
                    this.selectedNoten = null;
                },
            });
    }

    detachNoten(event) {
        this.notenLoading = true;
        this.notenService
            .detachNotenFromAusrueckung(event.id, this.ausrueckung.id)
            .subscribe({
                next: (res) => {
                    this.gespielteNoten = this.gespielteNoten.filter(
                        (e) => e.id !== event.id
                    );
                    this.notenLoading = false;
                    this.selectedNoten = null;
                },
                error: (error) => {
                    this.infoService.error(error);
                    this.notenLoading = false;
                    this.selectedNoten = null;
                },
            });
    }

    exportToCalendar() {
        this.calExport.exportAusrueckungIcs(this.ausrueckung);
    }
}