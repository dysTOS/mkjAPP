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
    CsvColumns,
    KategorienOptions,
    StatusOptions,
} from "src/app/mkjInterfaces/Ausrueckung";
import { AusrueckungenService } from "src/app/mkjServices/ausrueckungen.service";
import { ExportService } from "src/app/mkjServices/export.service";
import { InfoService } from "src/app/mkjServices/info.service";
import { MkjDatePipe } from "src/app/mkjUtilities/mkj-date.pipe";

@Component({
    templateUrl: "./ausrueckungen.component.html",
    styleUrls: ["./ausrueckungen.scss"],
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
export class AusrueckungenComponent implements OnInit {
    ausrueckungDialog: boolean;
    zeitraumDialog: boolean;
    exportDialogVisible: boolean = false;

    ausrueckungenArray: Ausrueckung[];
    ausrueckungFilterInput: AusrueckungFilterInput;
    selectedAusrueckungen: Ausrueckung[];

    singleAusrueckung: Ausrueckung;

    vonBisZeitraum: Date[] = [];
    zeitraumDisplayText: string;
    actualYear = new Date().getFullYear().toString();
    actualDate = moment(new Date()).format("YYYY-MM-DD").toString();
    ZeitraumOptions = ZeitraumOptions;

    submitted: boolean;
    updateAusrueckung: boolean;
    loading: boolean;
    isSaving: boolean;

    cols = CsvColumns; //columns for csv export
    kategorien = KategorienOptions;
    status = StatusOptions;

    @ViewChild("dt") ausrueckungenTable: Table;

    selectedRow: any;

    constructor(
        private ausrueckungService: AusrueckungenService,
        private infoService: InfoService,
        private confirmationService: ConfirmationService,
        private router: Router,
        private route: ActivatedRoute,
        private exportService: ExportService,
        private mkjDatePipe: MkjDatePipe
    ) {}

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
                bisFilter: this.actualYear + "-12-31 23:59:59",
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
                        (this.selectedAusrueckungen = ausrueckungen)
                    ),
                    (error) => this.infoService.error(error),
                    () => (this.loading = false)
                );
        }
    }

    openNew(): void {
        this.singleAusrueckung = {};
        this.singleAusrueckung.oeffentlich = true;
        this.submitted = false;
        this.updateAusrueckung = false;
        this.ausrueckungDialog = true;
    }

    editAusrueckung(ausrueckung: Ausrueckung) {
        this.singleAusrueckung = { ...ausrueckung };
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
        this.singleAusrueckung = {};
    }

    saveAusrueckung() {
        this.submitted = true;

        if (
            !this.singleAusrueckung.name.trim() ||
            !this.singleAusrueckung.kategorie ||
            !this.singleAusrueckung.status ||
            !this.singleAusrueckung.vonDatum ||
            !this.singleAusrueckung.bisDatum
        )
            return;

        this.isSaving = true;
        if (this.singleAusrueckung.id) {
            //update
            let index = this.findIndexById(this.singleAusrueckung.id);
            this.ausrueckungService
                .updateAusrueckung(this.singleAusrueckung)
                .subscribe(
                    (ausrueckungFromAPI) => (
                        (this.ausrueckungenArray[index] = ausrueckungFromAPI),
                        (this.ausrueckungenArray = [...this.ausrueckungenArray])
                    ),
                    (error) => {
                        this.infoService.error(error);
                        this.isSaving = false;
                        this.singleAusrueckung = {};
                    },
                    () => {
                        this.infoService.success("Ausrückung aktualisert!");
                        this.isSaving = false;
                        this.submitted = true;
                        this.ausrueckungDialog = false;
                    }
                );
        } else {
            //neue
            this.ausrueckungService
                .createAusrueckung(this.singleAusrueckung)
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
                        this.singleAusrueckung = {};
                    },
                    () => {
                        this.infoService.success("Ausrückung angelegt!");
                        this.isSaving = false;
                        this.submitted = true;
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
                this.selectedAusrueckungen = ausrueckungen;
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
                    this.selectedAusrueckungen = [...ausrueckungen];
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
        this.router.navigate(["../ausrueckung/" + ausrueckung.id], {
            relativeTo: this.route,
        });
    }

    setFilteredRows(e) {
        this.selectedAusrueckungen = e.filteredValue;
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
        const rows = this.selectedAusrueckungen.map((e) => {
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
            this.selectedAusrueckungen,
            "Ausrückungen " + this.zeitraumDisplayText
        );
    }

    exportToCalendar(ausrueckung: Ausrueckung) {
        this.exportService.exportAusrueckungIcs(ausrueckung);
    }
}
