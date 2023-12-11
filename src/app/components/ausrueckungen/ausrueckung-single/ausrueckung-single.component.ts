import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MenuItem } from "primeng/api";
import { Menu } from "primeng/menu";
import { Mitglied } from "src/app/models/Mitglied";
import { Noten } from "src/app/models/Noten";
import { Termin } from "src/app/models/Termin";
import { InfoService } from "src/app/services/info.service";
import { MkjToolbarService } from "src/app/utilities/mkj-toolbar/mkj-toolbar.service";
import { NotenApiService } from "../../../services/api/noten-api.service";
import { TermineApiService } from "../../../services/api/termine-api.service";
import { ExportService } from "../../../services/export.service";

@Component({
    selector: "app-ausrueckung-single",
    templateUrl: "./ausrueckung-single.component.html",
    styleUrls: ["./ausrueckung-single.component.scss"],
})
export class AusrueckungSingleComponent implements OnInit {
    termin: Termin;

    loading: boolean = true;
    notenLoading: boolean = true;

    gespielteNoten: Noten[] = [];
    searchNotenResult: Noten[];

    mitglieder: Mitglied[];
    presentMitglieder: Mitglied[] = [];

    public activeTabIndex = 0;

    public exportMenuItems: MenuItem[] = [
        {
            label: "In Kalender exportieren (wird nicht aktualisiert)",
            icon: "pi pi-calendar",
            command: () => this.exportToCalendar(),
        },
    ];

    @ViewChild("exportMenu") exportMenu: Menu;

    constructor(
        private route: ActivatedRoute,
        private ausrueckungenService: TermineApiService,
        private infoService: InfoService,
        private notenService: NotenApiService,
        private calExport: ExportService,
        private toolbarService: MkjToolbarService
    ) {
        this.toolbarService.header = "Details";
        this.toolbarService.backButton = true;
    }

    ngOnInit(): void {
        this.route.params.subscribe((e) => {
            this.ausrueckungenService.getSingleTermin(e.id).subscribe(
                (ausrueckung) => {
                    this.termin = ausrueckung;
                    this.updateToolbarButtons();
                    this.getGespielteNoten();
                },
                (error) => this.infoService.error(error),
                () => (this.loading = false)
            );
        });
    }

    public updateToolbarButtons() {
        this.toolbarService.buttons = [
            {
                icon: "pi pi-download",
                label: "Exportieren",
                click: ($event) => this.exportMenu.show($event),
                visible:
                    this.termin.vonZeit !== null &&
                    this.termin.bisZeit !== null,
            },
        ];
    }

    getGespielteNoten() {
        this.notenLoading = true;
        this.notenService.getNotenForTermin(this.termin.id).subscribe({
            next: (res) => {
                this.gespielteNoten = res;
            },
            complete: () => (this.notenLoading = false),
        });
    }

    attachNoten(noten: Noten) {
        this.notenLoading = true;
        this.notenService
            .attachNotenToAusrueckung(noten.id, this.termin.id)
            .subscribe({
                next: (res) => {
                    this.gespielteNoten = [noten, ...this.gespielteNoten];
                    this.notenLoading = false;
                },
                error: (error) => {
                    this.infoService.error(error);
                    this.notenLoading = false;
                },
            });
    }

    detachNoten(noten: Noten) {
        this.notenLoading = true;
        this.notenService
            .detachNotenFromAusrueckung(noten.id, this.termin.id)
            .subscribe({
                next: (res) => {
                    this.gespielteNoten = this.gespielteNoten.filter(
                        (e) => e.id !== noten.id
                    );
                    this.notenLoading = false;
                },
                error: (error) => {
                    this.infoService.error(error);
                    this.notenLoading = false;
                },
            });
    }

    exportToCalendar() {
        this.calExport.exportAusrueckungIcs(this.termin);
    }
}
