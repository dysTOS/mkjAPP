import { InfoService } from "./../../../mkjServices/info.service";
import { ExportService } from "../../../mkjServices/export.service";
import { MitgliederService } from "./../../../mkjServices/mitglieder.service";
import { Mitglied } from "src/app/mkjInterfaces/Mitglied";
import { NotenService } from "./../../../mkjServices/noten.service";
import { AusrueckungenService } from "../../../mkjServices/ausrueckungen.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Ausrueckung } from "src/app/mkjInterfaces/Ausrueckung";
import { Noten } from "src/app/mkjInterfaces/Noten";

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
        private calExport: ExportService
    ) {}

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

    navigateBack() {
        this.ausrueckungenService.setSelectedAusrueckung(null);
        this.router.navigate(["../"], { relativeTo: this.route });
    }

    exportToCalendar() {
        this.calExport.exportAusrueckungIcs(this.ausrueckung);
    }
}
