import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
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
import { NotenListDatasource } from "src/app/utilities/_list-datasources/noten-list-datasource.class";
import { NotenAutoCompleteConfigiguration } from "src/app/utilities/_autocomplete-configurations/noten-autocomplete-config.class";
import { AppConfigService } from "src/app/services/app-config.service";
import { PermissionMap } from "src/app/models/User";

@Component({
    selector: "app-termin-details",
    templateUrl: "./termin-details.component.html",
    providers: [NotenListDatasource],
})
export class TerminDetailsComponent implements OnInit {
    termin: Termin;

    loading: boolean = true;
    notenLoading: boolean = true;

    gespielteNoten: Noten[] = [];
    selectedNoten: Noten;
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

    public readonly notenAutoCompleteConfig =
        new NotenAutoCompleteConfigiguration();

    constructor(
        public notenDatasource: NotenListDatasource,
        public configService: AppConfigService,
        private router: Router,
        private route: ActivatedRoute,
        private termineApiService: TermineApiService,
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
            this.termineApiService.getById(e.id).subscribe(
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
                icon: "pi pi-pencil",
                label: "Bearbeiten",
                permissions: [PermissionMap.TERMIN_SAVE],
                click: () =>
                    this.router.navigate(["../../", this.termin.id], {
                        relativeTo: this.route,
                    }),
            },
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
        if (!noten) return;
        this.notenLoading = true;
        this.notenService
            .attachNotenToAusrueckung(noten.id, this.termin.id)
            .subscribe({
                next: (res) => {
                    this.selectedNoten = null;
                    this.notenLoading = false;
                    this.getGespielteNoten();
                },
                error: (error) => {
                    this.selectedNoten = null;
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
