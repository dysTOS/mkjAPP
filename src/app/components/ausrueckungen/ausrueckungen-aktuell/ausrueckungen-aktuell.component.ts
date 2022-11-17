import { Table } from "primeng/table";
import * as moment from "moment";
import * as _ from "lodash";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ConfirmationService } from "primeng/api";
import {
    Ausrueckung,
    AusrueckungFilterInput,
    ZeitraumOptions,
    AusrueckungCsvColumnMap,
    AusrueckungKategorieMap,
    AusrueckungStatusMap,
} from "src/app/models/Ausrueckung";
import { AusrueckungenService } from "src/app/services/ausrueckungen.service";
import { ExportService } from "src/app/services/export.service";
import { MkjDatePipe } from "src/app/pipes/mkj-date.pipe";
import { InfoService } from "src/app/services/info.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { UtilFunctions } from "src/app/helpers/util-functions";
import { AppComponent } from "src/app/app.component";
import { AppMainComponent } from "src/app/app.main.component";

@Component({
    templateUrl: "./ausrueckungen-aktuell.component.html",
    styleUrls: ["./ausrueckungen-aktuell.component.scss"],
    styles: [
        `
            @media screen and (max-width: 960px) {
                :host
                    ::ng-deep
                    .p-datatable.p-datatable-ausrueckungen
                    .p-datatable-tbody
                    > tr
                    > td:last-child {
                    text-align: center;
                }

                :host
                    ::ng-deep
                    .p-datatable.p-datatable-ausrueckungen
                    .p-datatable-tbody
                    > tr
                    > td:nth-child(2) {
                    text-align: right;
                }
            }
        `,
    ],
})
export class AusrueckungenAktuellComponent implements OnInit {
    ausrueckungDialog: boolean;
    zeitraumDialog: boolean;
    exportDialogVisible: boolean = false;

    ausrueckungenArray: Ausrueckung[];
    ausrueckungFilterInput: AusrueckungFilterInput;
    filteredRows: Ausrueckung[];

    vonBisZeitraum: Date[] = [];
    zeitraumDisplayText: string;
    actualYear = new Date().getFullYear().toString();
    actualDate = moment(new Date()).format("YYYY-MM-DD").toString();
    ZeitraumOptions = ZeitraumOptions;

    submitted: boolean;
    updateAusrueckung: boolean;
    loading: boolean;
    isSaving: boolean;

    cols = AusrueckungCsvColumnMap; //columns for csv export
    kategorien = AusrueckungKategorieMap;
    status = AusrueckungStatusMap;

    @ViewChild("dt") ausrueckungenTable: Table;

    public formGroup: FormGroup;

    selectedRow: any;

    constructor(
        private ausrueckungService: AusrueckungenService,
        private infoService: InfoService,
        private confirmationService: ConfirmationService,
        private router: Router,
        private route: ActivatedRoute,
        private exportService: ExportService,
        private mkjDatePipe: MkjDatePipe,
        private fb: FormBuilder
    ) {
        this.formGroup = this.fb.group({
            ausrueckung: [],
        });
    }

    ngOnInit() {
        if (sessionStorage.getItem("ausrueckungenFilter") != null) {
            let filter = sessionStorage.getItem("ausrueckungenFilter");
            this.zeitraumDisplayText = this.generateZeitraumDisplayText(
                JSON.parse(filter)
            );
            this.ausrueckungFilterInput = JSON.parse(filter);
        } else {
            this.zeitraumDisplayText = this.actualYear;
            this.ausrueckungFilterInput = {
                vonFilter: this.actualYear + "-01-01 00:00:00",
                bisFilter: Number(this.actualYear) + 1 + "-12-31 23:59:59",
                alle: false,
            };
        }

        this.loading = true;
        if (this.ausrueckungFilterInput.alle) this.getAllAusrueckungen();
        else {
            this.ausrueckungService
                .getAusrueckungenFiltered(this.ausrueckungFilterInput)
                .subscribe(
                    (ausrueckungen) => (
                        (this.ausrueckungenArray = ausrueckungen),
                        (this.filteredRows = ausrueckungen)
                    ),
                    (error) => this.infoService.error(error),
                    () => (this.loading = false)
                );
        }
    }

    public openNew(): void {
        if (!UtilFunctions.isDesktop()) {
            this.navigateEditor();
            return;
        }
        this.formGroup.reset();
        this.formGroup.updateValueAndValidity();
        this.updateAusrueckung = false;
        this.ausrueckungDialog = true;
    }

    public editAusrueckung(ausrueckung: Ausrueckung) {
        if (!UtilFunctions.isDesktop()) {
            this.navigateEditor(ausrueckung);
            return;
        }
        this.formGroup.controls.ausrueckung.patchValue(ausrueckung);
        this.formGroup.updateValueAndValidity();
        this.updateAusrueckung = true;
        this.ausrueckungDialog = true;
    }

    deleteAusrueckung(ausrueckung: Ausrueckung) {
        this.confirmationService.confirm({
            header: "Ausrückung löschen?",
            icon: "pi pi-exclamation-triangle",
            accept: () => {
                this.loading = true;
                this.ausrueckungService
                    .deleteAusrueckung(ausrueckung)
                    .subscribe(
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

        const saveAusrueckung = this.formGroup
            .get("ausrueckung")
            ?.getRawValue();

        this.isSaving = true;
        if (saveAusrueckung.id) {
            //update
            let index = this.findIndexById(saveAusrueckung.id);
            this.ausrueckungService
                .updateAusrueckung(saveAusrueckung)
                .subscribe(
                    (ausrueckungFromAPI) => (
                        (this.ausrueckungenArray[index] = ausrueckungFromAPI),
                        (this.ausrueckungenArray = [...this.ausrueckungenArray])
                    ),
                    (error) => {
                        this.infoService.error(error);
                        this.isSaving = false;
                        this.formGroup.reset();
                    },
                    () => {
                        this.infoService.success("Ausrückung aktualisert!");
                        this.isSaving = false;
                        this.ausrueckungDialog = false;
                    }
                );
        } else {
            //neue
            this.ausrueckungService
                .createAusrueckung(saveAusrueckung)
                .subscribe(
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
                        this.formGroup.reset();
                    },
                    () => {
                        this.infoService.success("Ausrückung angelegt!");
                        this.isSaving = false;
                        this.ausrueckungDialog = false;
                    }
                );
        }
    }

    duplicateAusrueckung(ausrueckung: Ausrueckung) {
        this.loading = true;
        const duplicateAusrueckung = _.cloneDeep(ausrueckung);
        duplicateAusrueckung.id = null;
        duplicateAusrueckung.created_at = null;
        duplicateAusrueckung.updated_at = null;
        duplicateAusrueckung.name = duplicateAusrueckung.name + " - Kopie";
        this.ausrueckungService
            .createAusrueckung(duplicateAusrueckung)
            .subscribe({
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

    getAllAusrueckungen() {
        this.zeitraumDisplayText = "(alle)";
        this.ausrueckungFilterInput.alle = true;
        sessionStorage.setItem(
            "ausrueckungenFilter",
            JSON.stringify(this.ausrueckungFilterInput)
        );
        this.loading = true;
        this.ausrueckungService.getAusrueckungen().subscribe(
            (ausrueckungen) => {
                this.ausrueckungenArray = ausrueckungen;
                this.filteredRows = ausrueckungen;
                this.loading = false;
            },
            (error) => {
                this.infoService.error(error);
                this.loading = false;
            }
        );
    }

    saveZeitraum(zeitraum: ZeitraumOptions) {
        if (
            zeitraum == ZeitraumOptions.SpecificRange &&
            this.vonBisZeitraum[0] &&
            this.vonBisZeitraum[1]
        ) {
            this.ausrueckungFilterInput = {
                vonFilter: moment(new Date(this.vonBisZeitraum[0]))
                    .format("YYYY-MM-DD HH:mm:ss")
                    .toString(),
                bisFilter: moment(new Date(this.vonBisZeitraum[1]))
                    .format("YYYY-MM-DD HH:mm:ss")
                    .toString(),
                alle: false,
            };
            this.zeitraumDisplayText = this.generateZeitraumDisplayText(
                this.ausrueckungFilterInput
            );
            sessionStorage.setItem(
                "ausrueckungenFilter",
                JSON.stringify(this.ausrueckungFilterInput)
            );
        } else if (zeitraum == ZeitraumOptions.ActualYear) {
            this.zeitraumDisplayText = new Date().getFullYear().toString();
            let year = new Date().getFullYear();
            this.ausrueckungFilterInput = {
                vonFilter: year + "-01-01 00:00:00",
                bisFilter: year + "-12-31 23:59:59",
                alle: false,
            };
            sessionStorage.removeItem("ausrueckungenFilter");
        }

        this.loading = true;
        this.ausrueckungService
            .getAusrueckungenFiltered(this.ausrueckungFilterInput)
            .subscribe(
                (ausrueckungen) => {
                    this.ausrueckungenArray = ausrueckungen;
                    this.filteredRows = [...ausrueckungen];
                    this.loading = false;
                },
                (error) => {
                    this.infoService.error(error);
                    this.loading = false;
                }
            );

        this.zeitraumDialog = false;
    }

    generateZeitraumDisplayText(filter: AusrueckungFilterInput): string {
        return (
            moment(filter.vonFilter).format("D.MM.YYYY") +
            " bis " +
            moment(filter.bisFilter).format("D.MM.YYYY")
        );
    }

    navigateSingleAusrueckung(ausrueckung: Ausrueckung) {
        this.ausrueckungService.setSelectedAusrueckung(ausrueckung);
        this.router.navigate(["../", ausrueckung.id], {
            relativeTo: this.route,
        });
    }

    private navigateEditor(ausrueckung?: Ausrueckung) {
        this.ausrueckungService.setSelectedAusrueckung(ausrueckung);
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

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.ausrueckungenArray.length; i++) {
            if (this.ausrueckungenArray[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
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

    exportPdf() {
        const columns = [
            { title: "Name", dataKey: "name" },
            { title: "Datum", dataKey: "vonDatum" },
            { title: "Zusammenkunft", dataKey: "treffzeit" },
            { title: "Spielbeginn", dataKey: "vonZeit" },
            { title: "Status", dataKey: "status" },
            { title: "Infos", dataKey: "infosMusiker" },
        ];
        const rows = this.filteredRows.map((e) => {
            const ausr = { ...e };
            ausr.vonDatum = this.mkjDatePipe.transform(
                ausr.vonDatum,
                "E d. MMM YYYY"
            );
            return ausr;
        });

        this.exportService.savePDF(
            columns,
            rows,
            "Ausrückungen " + this.zeitraumDisplayText
        );
    }

    exportExcel() {
        this.exportService.exportExcel(
            this.filteredRows,
            "Ausrückungen " + this.zeitraumDisplayText
        );
    }

    exportToCalendar(ausrueckung: Ausrueckung) {
        this.exportService.exportAusrueckungIcs(ausrueckung);
    }
}
