import {
    AfterViewInit,
    Component,
    OnInit,
    TemplateRef,
    ViewChild,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import * as _ from "lodash";
import * as moment from "moment";
import { ConfirmationService, MenuItem } from "primeng/api";
import { Menu } from "primeng/menu";
import { Table } from "primeng/table";
import { GetListInput } from "src/app/interfaces/api-middleware";
import {
    Termin,
    TerminCsvColumnMap,
    TerminKategorieMap,
    TerminStatusMap,
} from "src/app/models/Termin";
import { PermissionMap } from "src/app/models/User";
import { MkjDatePipe } from "src/app/pipes/mkj-date.pipe";
import { TermineApiService } from "src/app/services/api/termine-api.service";
import { UserService } from "src/app/services/authentication/user.service";
import { AppConfigService } from "src/app/services/app-config.service";
import { ExportService } from "src/app/services/export.service";
import { InfoService } from "src/app/services/info.service";
import { MkjToolbarService } from "src/app/utilities/mkj-toolbar/mkj-toolbar.service";

@Component({
    templateUrl: "./ausrueckungen-aktuell.component.html",
    styleUrls: ["./ausrueckungen-aktuell.component.scss"],
})
export class AusrueckungenAktuellComponent implements OnInit, AfterViewInit {
    ausrueckungenArray: Termin[];
    ausrueckungFilterInput: GetListInput;
    filteredRows: Termin[];

    actualDate = moment(new Date()).format("YYYY-MM-DD");
    filterFromDate = moment(new Date())
        .subtract(1, "week")
        .format("YYYY-MM-DD");

    loading: boolean;

    cols = TerminCsvColumnMap; //columns for csv export
    kategorien = TerminKategorieMap;
    status = TerminStatusMap;

    @ViewChild("dt") ausrueckungenTable: Table;
    @ViewChild("toolbarContentSection") toolbarContentSection: TemplateRef<any>;
    @ViewChild("exportMenu") exportMenu: Menu;

    selectedRow: any;
    public hasAktionenPermissions: boolean = false;

    public rowMenuItems: MenuItem[] = [
        {
            label: "Duplizieren",
            icon: "pi pi-copy",
            visible: this.userService.hasOneOfPermissions([
                PermissionMap.TERMIN_SAVE,
            ]),
            command: () => this.duplicateAusrueckung(this.selectedRow),
        },
        {
            label: "Editieren",
            icon: "pi pi-pencil",
            visible: this.userService.hasOneOfPermissions([
                PermissionMap.TERMIN_SAVE,
                PermissionMap.TERMIN_GRUPPENLEITER_SAVE,
            ]),
            command: () => this.navigateEditor(this.selectedRow),
        },
        {
            label: "Löschen",
            icon: "pi pi-trash",
            visible: this.userService.hasPermission(
                PermissionMap.TERMIN_DELETE
            ),
            command: () => this.deleteAusrueckung(this.selectedRow),
        },
    ];

    public exportMenuItems: MenuItem[] = [
        {
            label: "PDF",
            icon: "pi pi-file-pdf",
            command: () => this.exportPdf(),
        },
        {
            label: "Excel",
            icon: "pi pi-file-excel",
            command: () => this.exportExcel(),
        },
        {
            label: "CSV",
            icon: "pi pi-file",
            command: () => this.exportCsv(),
        },
    ];

    constructor(
        private termineApiService: TermineApiService,
        private userService: UserService,
        private infoService: InfoService,
        private confirmationService: ConfirmationService,
        private router: Router,
        private route: ActivatedRoute,
        private exportService: ExportService,
        private mkjDatePipe: MkjDatePipe,
        private namingService: AppConfigService,
        public toolbarService: MkjToolbarService
    ) {
        this.hasAktionenPermissions = this.userService.hasOneOfPermissions([
            PermissionMap.TERMIN_SAVE,
            PermissionMap.TERMIN_GRUPPENLEITER_SAVE,
            PermissionMap.TERMIN_DELETE,
        ]);
        this.toolbarService.header = this.namingService.appNaming.Termine;
        this.toolbarService.buttons = [
            {
                icon: "pi pi-filter",
                click: () => {
                    this.toolbarService.contentSectionExpanded =
                        !this.toolbarService.contentSectionExpanded;
                    this.toolbarService.buttons[0].highlighted =
                        this.toolbarService.contentSectionExpanded;
                },
                highlighted:
                    this.toolbarService.contentSectionExpanded === true,
                label: "Filtern/Suchen",
            },
            {
                icon: "pi pi-plus",
                click: () => this.navigateEditor(),
                label: "Neu",
                permissions: [
                    PermissionMap.TERMIN_SAVE,
                    PermissionMap.TERMIN_GRUPPENLEITER_SAVE,
                ],
            },
            {
                icon: "pi pi-download",
                click: ($event) => this.exportMenu.show($event),
                label: "Export",
            },
        ];
    }

    public ngOnInit() {
        this.ausrueckungFilterInput = {
            filterAnd: [
                {
                    filterField: "vonDatum",
                    value: this.filterFromDate,
                    operator: ">=",
                },
                {
                    filterField: "bisDatum",
                    value: new Date().getFullYear() + "-12-31",
                    operator: "<=",
                },
            ],
        };
        this.loadTermine();
    }

    public loadTermine(): void {
        this.loading = true;
        this.termineApiService
            .getTermineFiltered(this.ausrueckungFilterInput)
            .subscribe({
                next: (res) => {
                    this.ausrueckungenArray = res.values;
                    this.filteredRows = res.values;
                    this.loading = false;
                },
                error: (error) => {
                    this.infoService.error(error);
                    this.loading = false;
                },
            });
    }

    public ngAfterViewInit(): void {
        this.toolbarService.contentSectionTemplate = this.toolbarContentSection;
        if (this.ausrueckungenTable?.filters?.global) {
            this.toolbarService.contentSectionExpanded = true;
        }
    }

    public deleteAusrueckung(ausrueckung: Termin) {
        this.loading = true;
        this.infoService
            .confirmDelete(
                `Soll der Termin "${ausrueckung.name}" wirklich gelöscht werden?`,
                () => this.termineApiService.deleteTermin(ausrueckung)
            )
            .subscribe({
                next: () => {
                    this.ausrueckungenArray = this.ausrueckungenArray.filter(
                        (val) => val.id !== ausrueckung.id
                    );
                    this.loading = false;
                    this.infoService.success("Ausrückung gelöscht!");
                },
                error: (error) => {
                    if (error) {
                        this.infoService.error(error);
                    }
                    this.loading = false;
                },
            });
    }

    public duplicateAusrueckung(ausrueckung: Termin) {
        this.loading = true;
        const duplicateAusrueckung = _.cloneDeep(ausrueckung);
        duplicateAusrueckung.id = null;
        duplicateAusrueckung.created_at = null;
        duplicateAusrueckung.updated_at = null;
        duplicateAusrueckung.name = duplicateAusrueckung.name + " - KOPIE";

        this.termineApiService.createTermin(duplicateAusrueckung).subscribe({
            next: (res) => {
                this.ausrueckungenArray = [res, ...this.ausrueckungenArray];
                this.navigateEditor(res);
                this.infoService.success("Ausrückung dupliziert!");
                this.loading = false;
            },
            error: (err) => {
                this.infoService.error(err);
                this.loading = false;
            },
        });
    }

    public navigateSingleAusrueckung(ausrueckung: Termin) {
        this.router.navigate(["../", ausrueckung.id], {
            relativeTo: this.route,
        });
    }

    private navigateEditor(ausrueckung?: Termin) {
        if (ausrueckung?.id) {
            this.router.navigate(["../", ausrueckung.id], {
                relativeTo: this.route,
            });
        } else {
            this.router.navigate(["../neu"], {
                relativeTo: this.route,
            });
        }
    }

    setFilteredRows(e) {
        this.filteredRows = e.filteredValue;
    }

    onRowSelect(event) {
        this.ausrueckungenTable.toggleRow(event.data);
    }

    onRowUnselect(event) {
        this.ausrueckungenTable.toggleRow(event.data);
    }

    exportCsv() {
        this.ausrueckungenTable.exportCSV();
    }

    public exportPdf() {
        const columns = [
            { title: "Name", dataKey: "name" },
            { title: "Status", dataKey: "status" },
            { title: "Datum", dataKey: "vonDatum" },
            { title: "Zusammenkunft", dataKey: "treffzeit" },
            { title: "Spielbeginn", dataKey: "vonZeit" },
            { title: "Infos", dataKey: "infosMusiker" },
        ];
        const rows = this.filteredRows.map((e) => {
            const ausr = { ...e };
            ausr.status = _.startCase(ausr.status);
            ausr.vonDatum = this.mkjDatePipe.transform(
                ausr.vonDatum,
                "E d. MMM YYYY"
            );
            if (e.gruppe?.name) {
                ausr.name = ausr.name + " (" + e.gruppe.name + ")";
            }
            return ausr;
        });

        this.exportService.savePDF(columns, rows, "Termine");
    }

    public exportExcel() {
        this.exportService.exportExcel(this.filteredRows, "Ausrückungen");
    }

    public setFilterInputDates(filterIndex: number, value: string) {
        if (!value) {
            this.ausrueckungFilterInput.filterAnd[filterIndex] = null;
        } else {
            this.ausrueckungFilterInput.filterAnd[filterIndex] = {
                value: value,
                operator: filterIndex === 0 ? ">=" : "<=",
                filterField: filterIndex === 0 ? "vonDatum" : "bisDatum",
            };
        }
        this.loadTermine();
    }
}
