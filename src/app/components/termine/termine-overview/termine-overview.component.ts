import { Component, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import * as _ from "lodash";
import * as moment from "moment";
import { MenuItem } from "primeng/api";
import { Menu } from "primeng/menu";
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
import { AppConfigService } from "src/app/services/app-config.service";
import { UserService } from "src/app/services/authentication/user.service";
import { ExportService } from "src/app/services/export.service";
import { InfoService } from "src/app/services/info.service";
import { TermineListConfig } from "src/app/utilities/_list-configurations/termine-list-config.class";
import { TermineListDatasource } from "src/app/utilities/_list-datasources/termine-list-datasource.class";
import { MkjToolbarService } from "src/app/utilities/mkj-toolbar/mkj-toolbar.service";

@Component({
    templateUrl: "./termine-overview.component.html",
    styleUrls: ["./termine-overview.component.scss"],
    providers: [TermineListDatasource, TermineListConfig],
})
export class TermineOverviewComponent {
    ausrueckungenArray: Termin[];
    ausrueckungFilterInput: GetListInput<Termin>;
    filteredRows: Termin[];

    actualDate = moment(new Date()).format("YYYY-MM-DD");
    filterFromDate = moment(new Date())
        .subtract(1, "week")
        .format("YYYY-MM-DD");

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
            // command: () => this.exportCsv(),
        },
    ];

    constructor(
        public datasource: TermineListDatasource,
        public listConfig: TermineListConfig,
        private termineApiService: TermineApiService,
        private userService: UserService,
        private infoService: InfoService,
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
                icon: "pi pi-plus",
                click: () => this.navigateEditor(),
                label: "Neu",
                permissions: [
                    PermissionMap.TERMIN_SAVE,
                    PermissionMap.TERMIN_GRUPPENLEITER_SAVE,
                ],
            },
            // {
            //     icon: "pi pi-download",
            //     click: ($event) => this.exportMenu.show($event),
            //     label: "Export",
            // },
        ];
    }

    public duplicateAusrueckung(ausrueckung: Termin) {
        const duplicateAusrueckung = _.cloneDeep(ausrueckung);
        duplicateAusrueckung.id = null;
        duplicateAusrueckung.created_at = null;
        duplicateAusrueckung.updated_at = null;
        duplicateAusrueckung.name = duplicateAusrueckung.name + " - KOPIE";

        this.termineApiService.create(duplicateAusrueckung).subscribe({
            next: (res) => {
                this.ausrueckungenArray = [res, ...this.ausrueckungenArray];
                this.navigateEditor(res);
                this.infoService.success("Termin dupliziert!");
            },
            error: (err) => {
                this.infoService.error(err);
            },
        });
    }

    public navigateSingleAusrueckung(ausrueckung: Termin) {
        this.router.navigate(["../details", ausrueckung.id], {
            relativeTo: this.route,
        });
    }

    private navigateEditor(ausrueckung?: Termin) {
        if (ausrueckung?.id) {
            this.router.navigate(["../", ausrueckung.id], {
                relativeTo: this.route,
            });
        } else {
            this.router.navigate(["../new"], {
                relativeTo: this.route,
            });
        }
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
}
