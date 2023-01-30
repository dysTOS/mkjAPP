import { Table } from "primeng/table";
import * as moment from "moment";
import * as _ from "lodash";
import {
    AfterViewInit,
    Component,
    OnInit,
    TemplateRef,
    ViewChild,
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ConfirmationService, MenuItem } from "primeng/api";
import {
    Termin as Termin,
    TerminCsvColumnMap,
    TerminKategorieMap,
    TerminStatusMap,
} from "src/app/models/Termin";
import { TermineApiService } from "src/app/services/api/termine-api.service";
import { ExportService } from "src/app/services/export.service";
import { MkjDatePipe } from "src/app/pipes/mkj-date.pipe";
import { InfoService } from "src/app/services/info.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { UtilFunctions } from "src/app/helpers/util-functions";
import { PermissionMap } from "src/app/models/User";
import { MkjToolbarService } from "src/app/utilities/mkj-toolbar/mkj-toolbar.service";
import { GetCollectionApiCallInput } from "src/app/interfaces/api-middleware";
import { UserService } from "src/app/services/authentication/user.service";

@Component({
    templateUrl: "./ausrueckungen-aktuell.component.html",
    styleUrls: ["./ausrueckungen-aktuell.component.scss"],
})
export class AusrueckungenAktuellComponent implements OnInit, AfterViewInit {
    ausrueckungDialog: boolean;
    zeitraumDialog: boolean;
    exportDialogVisible: boolean = false;

    ausrueckungenArray: Termin[];
    ausrueckungFilterInput: GetCollectionApiCallInput;
    filteredRows: Termin[];

    actualDate = moment(new Date()).format("YYYY-MM-DD");

    submitted: boolean;
    updateAusrueckung: boolean;
    loading: boolean;
    isSaving: boolean;

    cols = TerminCsvColumnMap; //columns for csv export
    kategorien = TerminKategorieMap;
    status = TerminStatusMap;

    @ViewChild("dt") ausrueckungenTable: Table;
    @ViewChild("toolbarContentSection") toolbarContentSection: TemplateRef<any>;

    public formGroup: FormGroup;

    selectedRow: any;
    public hasAktionenPermissions: boolean = false;

    public rowMenuItems: MenuItem[] = [
        {
            label: "Duplizieren",
            icon: "pi pi-copy",
            visible: this.userService.hasPermission(
                PermissionMap.AUSRUECKUNG_SAVE
            ),
            command: () => this.duplicateAusrueckung(this.selectedRow),
        },
        {
            label: "Editieren",
            icon: "pi pi-pencil",
            visible: this.userService.hasPermission(
                PermissionMap.AUSRUECKUNG_SAVE
            ),
            command: () => this.editAusrueckung(this.selectedRow),
        },
        {
            label: "Löschen",
            icon: "pi pi-trash",
            visible: this.userService.hasPermission(
                PermissionMap.AUSRUECKUNG_DELETE
            ),
            command: () => this.deleteAusrueckung(this.selectedRow),
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
        private fb: FormBuilder,
        public toolbarService: MkjToolbarService
    ) {
        this.formGroup = UtilFunctions.getAusrueckungFormGroup(this.fb);
        this.hasAktionenPermissions = this.userService.hasOneOfPermissions([
            PermissionMap.AUSRUECKUNG_SAVE,
            PermissionMap.AUSRUECKUNG_DELETE,
        ]);
        this.toolbarService.header = "Termine";
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
                click: () => this.openNew(),
                label: "Neu",
                permissions: [PermissionMap.AUSRUECKUNG_SAVE],
            },
            {
                icon: "pi pi-download",
                click: () => (this.exportDialogVisible = true),
                label: "Export",
            },
        ];
    }

    public ngOnInit() {
        this.ausrueckungFilterInput = {
            filterAnd: [
                {
                    filterField: "vonDatum",
                    value: this.actualDate,
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

    public openNew(): void {
        if (!UtilFunctions.isDesktop()) {
            this.navigateEditor();
            return;
        }
        this.formGroup = UtilFunctions.getAusrueckungFormGroup(this.fb);
        this.formGroup.updateValueAndValidity();
        this.updateAusrueckung = false;
        this.ausrueckungDialog = true;
    }

    public editAusrueckung(ausrueckung: Termin) {
        if (!UtilFunctions.isDesktop()) {
            this.navigateEditor(ausrueckung);
            return;
        }
        this.formGroup = UtilFunctions.getAusrueckungFormGroup(
            this.fb,
            ausrueckung
        );
        this.formGroup.updateValueAndValidity();
        this.updateAusrueckung = true;
        this.ausrueckungDialog = true;
    }

    deleteAusrueckung(ausrueckung: Termin) {
        this.confirmationService.confirm({
            header: "Ausrückung löschen?",
            icon: "pi pi-exclamation-triangle",
            accept: () => {
                this.loading = true;
                this.termineApiService.deleteTermin(ausrueckung).subscribe(
                    () => {
                        this.ausrueckungenArray =
                            this.ausrueckungenArray.filter(
                                (val) => val.id !== ausrueckung.id
                            );
                        this.loading = false;
                        this.infoService.success("Ausrückung gelöscht!");
                    },
                    (error) => {
                        this.infoService.error(error);
                        this.loading = false;
                    }
                );
            },
        });
    }

    hideAusrueckungDialog() {
        this.ausrueckungDialog = false;
        this.submitted = false;
        this.formGroup.reset();
    }

    saveAusrueckung() {
        this.submitted = true;

        const saveAusrueckung = this.formGroup?.getRawValue();

        this.isSaving = true;
        if (saveAusrueckung.id) {
            //update
            let index = UtilFunctions.findIndexById(
                saveAusrueckung.id,
                this.ausrueckungenArray
            );
            this.termineApiService.updateTermin(saveAusrueckung).subscribe(
                (ausrueckungFromAPI) => (
                    (this.ausrueckungenArray[index] = ausrueckungFromAPI),
                    (this.ausrueckungenArray = [...this.ausrueckungenArray])
                ),
                (error) => {
                    this.infoService.error(error);
                    this.isSaving = false;
                },
                () => {
                    this.infoService.success("Ausrückung aktualisert!");
                    this.isSaving = false;
                    this.ausrueckungDialog = false;
                }
            );
        } else {
            //neue
            this.termineApiService.createTermin(saveAusrueckung).subscribe(
                (ausrueckungAPI) => {
                    this.ausrueckungenArray = [
                        ausrueckungAPI,
                        ...this.ausrueckungenArray,
                    ];
                    this.ausrueckungenTable.sort({
                        field: "vonDatum",
                        order: "1",
                    });
                },
                (error) => {
                    this.infoService.error(error);
                    this.isSaving = false;
                },
                () => {
                    this.infoService.success("Ausrückung angelegt!");
                    this.isSaving = false;
                    this.ausrueckungDialog = false;
                }
            );
        }
    }

    duplicateAusrueckung(ausrueckung: Termin) {
        this.loading = true;
        const duplicateAusrueckung = _.cloneDeep(ausrueckung);
        duplicateAusrueckung.id = null;
        duplicateAusrueckung.created_at = null;
        duplicateAusrueckung.updated_at = null;
        duplicateAusrueckung.name = duplicateAusrueckung.name + " - Kopie";

        this.termineApiService.createTermin(duplicateAusrueckung).subscribe({
            next: (res) => {
                this.ausrueckungenArray = [res, ...this.ausrueckungenArray];
                this.editAusrueckung(res);
                this.infoService.success("Ausrückung dupliziert!");
                this.loading = false;
            },
            error: (err) => {
                this.infoService.error(err);
                this.loading = false;
            },
        });
    }

    navigateSingleAusrueckung(ausrueckung: Termin) {
        this.router.navigate(["../", ausrueckung.id], {
            relativeTo: this.route,
        });
    }

    private navigateEditor(ausrueckung?: Termin) {
        if (ausrueckung) {
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
        this.ausrueckungenTable.exportCSV({ filteredValues: true });
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
