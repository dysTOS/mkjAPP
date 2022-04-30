import { ExportService } from './../../mkjServices/export.service';
import { RoleType } from './../../mkjInterfaces/User';
import { CsvColumns, KategorienOptions, StatusOptions, ZeitraumOptions } from './../../mkjInterfaces/Ausrueckung';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { AusrueckungenService } from '../../mkjServices/ausrueckungen.service';
import { Ausrueckung, AusrueckungFilterInput } from '../../mkjInterfaces/Ausrueckung';
import { Table } from 'primeng/table';
import { MkjDatePipe } from 'src/app/mkjUtilities/mkj-date.pipe';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
    templateUrl: './ausrueckungen.component.html',
    styleUrls: ['./ausrueckungen.scss'],
    styles: [`
        @media screen and (max-width: 960px) {
            :host ::ng-deep .p-datatable.p-datatable-ausrueckungen .p-datatable-tbody > tr > td:last-child {
                text-align: center;
            }

            :host ::ng-deep .p-datatable.p-datatable-ausrueckungen .p-datatable-tbody > tr > td:nth-child(2) {
                text-align: right;
            }
        }

    `]
})

export class AusrueckungenComponent implements OnInit {
    ausrueckungDialog: boolean;
    zeitraumDialog: boolean;
    exportDialogVisible: boolean = false;

    ausrueckungenArray: Ausrueckung[];
    ausrueckungFilterInput: AusrueckungFilterInput;
    selectedAusrueckungen: Ausrueckung[];

    singleAusrueckung: Ausrueckung;

    vonZeitraum: string;
    bisZeitraum: string;
    zeitraumDisplayText: string;

    exportOptions: MenuItem[];
    zeitraumOptions: MenuItem[];
    submitted: boolean;
    updateAusrueckung: boolean;
    loading: boolean;
    isSaving: boolean;

    cols = CsvColumns; //columns for csv export
    kategorien = KategorienOptions;
    status = StatusOptions;

    RoleType = RoleType;

    @ViewChild('dt') ausrueckungenTable: Table;

    selectedRow: any;

    constructor(private ausrueckungService: AusrueckungenService, private messageService: MessageService,
        private confirmationService: ConfirmationService, private router: Router, private route: ActivatedRoute,
        private exportService: ExportService, private mkjDate: MkjDatePipe) { }

    ngOnInit() {
        if (sessionStorage.getItem("ausrueckungenFilter") != null) {
            let filter = sessionStorage.getItem("ausrueckungenFilter");
            this.zeitraumDisplayText = this.generateZeitraumDisplayText(JSON.parse(filter));
            this.ausrueckungFilterInput = JSON.parse(filter);
        }
        else {
            let year = new Date().getFullYear().toString();
            this.zeitraumDisplayText = year;
            this.ausrueckungFilterInput = {
                vonFilter: year + "-01-01 00:00:00",
                bisFilter: year + "-12-31 23:59:59",
                alle: false
            }
        }

        if (this.ausrueckungService.hasAusrueckungArray()) {
            this.ausrueckungenArray = this.ausrueckungService.getAusrueckungArray();
            this.selectedAusrueckungen = this.ausrueckungService.getAusrueckungArray();
        }
        else {
            this.loading = true;
            if (this.ausrueckungFilterInput.alle) this.getAllAusrueckungen();
            else {
                this.ausrueckungService.getAusrueckungenFiltered(this.ausrueckungFilterInput).subscribe(
                    ausrueckungen => (
                        this.ausrueckungenArray = ausrueckungen,
                        this.selectedAusrueckungen = ausrueckungen),
                    (error) => console.log(error.error.message),
                    () => this.loading = false
                );
            }
        }

        this.exportOptions = [
            {
                label: 'als Excel', icon: 'pi pi-file-excel',
                command: () => this.exportExcel()
            },
            {
                label: 'als PDF', icon: 'pi pi-file-pdf',
                command: () => { this.exportPdf(), this.exportDialogVisible = false }
            },
            {
                label: 'als CSV', icon: 'pi pi-file',
                command: () => this.exportCsv()
            }];

        this.zeitraumOptions = [
            {
                label: new Date().getFullYear().toString(), icon: 'pi pi-calendar-plus',
                command: () => { this.saveZeitraum(ZeitraumOptions.ActualYear); this.zeitraumDialog = false; }
            },
            {
                label: 'Alle Ausrückungen', icon: 'pi pi-calendar',
                command: () => { this.getAllAusrueckungen(); this.zeitraumDialog = false; }
            }];
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

    showZeitraumDialog() {
        this.zeitraumDialog = true;
    }

    deleteAusrueckung(ausrueckung: Ausrueckung) {
        this.confirmationService.confirm({
            header: 'Ausrückung löschen?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.loading = true;
                this.ausrueckungService.deleteAusrueckung(ausrueckung).subscribe(
                    () => {
                        this.ausrueckungenArray = this.ausrueckungenArray.filter(val => val.id !== ausrueckung.id);
                        this.loading = false;
                    },
                    (error) => {
                        this.messageService.add(
                            { severity: 'error', summary: 'Fehler', detail: 'Ausrückung konnte nicht gelöscht werden!' });
                        this.loading = false;
                    },
                    () => this.messageService.add({ severity: 'success', summary: 'Erfolgreich', detail: 'Ausrückung gelöscht!', life: 3000 })
                );
            }
        });
    }

    hideAusrueckungDialog() {
        this.ausrueckungDialog = false;
        this.submitted = false;
        this.singleAusrueckung = {};
    }

    hideZeitraumDialog() {
        this.zeitraumDialog = false;
        this.vonZeitraum = null;
        this.bisZeitraum = null;
    }

    saveAusrueckung() {
        this.submitted = true;

        if (!this.singleAusrueckung.name.trim() || !this.singleAusrueckung.kategorie ||
            !this.singleAusrueckung.status || !this.singleAusrueckung.vonDatum || !this.singleAusrueckung.bisDatum) return;

        this.isSaving = true;
        if (this.singleAusrueckung.id) { //update
            let index = this.findIndexById(this.singleAusrueckung.id);
            this.ausrueckungService.updateAusrueckung(this.singleAusrueckung).subscribe(
                (ausrueckungFromAPI) => (this.ausrueckungenArray[index] = ausrueckungFromAPI, this.ausrueckungenArray = [...this.ausrueckungenArray]),
                (error) => {
                    this.messageService.add({
                        severity: 'error', summary: 'Fehler', detail: 'Ausrückung konnte nicht aktualisiert werden! ' + error, life: 3000
                    });
                    this.isSaving = false;
                    this.singleAusrueckung = {};
                },
                () => {
                    this.messageService.add({
                        severity: 'success', summary: 'Erfolgreich', detail: 'Ausrückung aktualisert!', life: 3000
                    });
                    this.isSaving = false;
                    this.ausrueckungDialog = false;
                }
            );
        }
        else { //neue
            this.ausrueckungService.createAusrueckung(this.singleAusrueckung).subscribe(
                (ausrueckungAPI) => {
                    this.ausrueckungenArray = [ausrueckungAPI, ...this.ausrueckungenArray];
                    this.ausrueckungenTable.sort({ field: 'vonDatum', order: '1' });
                },
                (error) => {
                    this.messageService.add({
                        severity: 'error', summary: 'Fehler', detail: 'Ausrückung konnte nicht aktualisiert werden! ' + error, life: 3000
                    });
                    this.isSaving = false;
                    this.singleAusrueckung = {};
                },
                () => {
                    this.messageService.add({
                        severity: 'success', summary: 'Erfolgreich', detail: 'Ausrückung erstellt!', life: 3000
                    });
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
        duplicateAusrueckung.name = duplicateAusrueckung.name + ' - Kopie';
        this.ausrueckungService.createAusrueckung(duplicateAusrueckung).subscribe({
            next: res => {
                this.ausrueckungenArray = [res, ... this.ausrueckungenArray];
                this.editAusrueckung(res);
                this.messageService.add({
                    severity: 'success', summary: 'Erfolgreich', detail: 'Ausrückung dupliziert!', life: 3000
                });
                this.loading = false;
            },
            error: err => {
                this.messageService.add({
                    severity: 'error', summary: 'Fehler', detail: 'Ausrückung konnte nicht dupliziert werden! ' + err.error.message
                }); this.loading = false;
            }
        });
    }

    getAllAusrueckungen() {
        this.zeitraumDisplayText = "(alle)";
        this.ausrueckungFilterInput.alle = true;
        sessionStorage.setItem("ausrueckungenFilter", JSON.stringify(this.ausrueckungFilterInput));
        this.loading = true;
        this.ausrueckungService.getAusrueckungen().subscribe(
            ausrueckungen => { this.ausrueckungenArray = ausrueckungen; this.selectedAusrueckungen = ausrueckungen; this.loading = false; },
            (error) => {
                this.messageService.add({ severity: 'error', summary: 'Fehler', detail: 'Ausrückungen konnten nicht geladen werden! ' + error, life: 3000 })
                    ; this.loading = false;
            });
    }

    saveZeitraum(zeitraum: ZeitraumOptions) {
        if (zeitraum == ZeitraumOptions.SpecificRange && this.vonZeitraum && this.bisZeitraum) {
            this.ausrueckungFilterInput = {
                vonFilter: moment(new Date(this.vonZeitraum)).format("YYYY-MM-DD HH:mm:ss").toString(),
                bisFilter: moment(new Date(this.bisZeitraum)).format("YYYY-MM-DD HH:mm:ss").toString(),
                alle: false
            }
            this.zeitraumDisplayText = this.generateZeitraumDisplayText(this.ausrueckungFilterInput);
            sessionStorage.setItem("ausrueckungenFilter", JSON.stringify(this.ausrueckungFilterInput));
        }
        else if (zeitraum == ZeitraumOptions.ActualYear) {
            this.zeitraumDisplayText = new Date().getFullYear().toString();
            let year = new Date().getFullYear();
            this.ausrueckungFilterInput = {
                vonFilter: year + "-01-01 00:00:00",
                bisFilter: year + "-12-31 23:59:59",
                alle: false
            }
            sessionStorage.removeItem("ausrueckungenFilter");
        }

        this.loading = true;
        this.ausrueckungService.getAusrueckungenFiltered(this.ausrueckungFilterInput).subscribe(
            ausrueckungen => { this.ausrueckungenArray = ausrueckungen; this.selectedAusrueckungen = [...ausrueckungen]; this.loading = false; },
            (error) => {
                this.messageService.add({
                    severity: 'error', summary: 'Fehler', detail: 'Zeitraum konnte nicht geändert werden! ' + error, life: 3000
                }); this.loading = false;
            });

        this.zeitraumDialog = false;
    }

    generateZeitraumDisplayText(filter: AusrueckungFilterInput): string {
        return moment(filter.vonFilter).format("D.MM.YYYY") + " bis " + moment(filter.bisFilter).format("D.MM.YYYY");
    }

    navigateSingleAusrueckung(ausrueckung: Ausrueckung) {
        this.ausrueckungService.setAusrueckungArray(this.ausrueckungenArray);
        this.ausrueckungService.setSelectedAusrueckung(ausrueckung);
        this.router.navigate(['../ausrueckung/' + ausrueckung.id], { relativeTo: this.route });
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
        let columns = [
            { title: "Name", dataKey: "name" },
            { title: "Datum", dataKey: "vonDatum" },
            { title: "Ort", dataKey: "ort" },
            // { title: "Kategorie", dataKey: "typ" },
            { title: "Status", dataKey: "status" },
            // { title: "Beschreibung", dataKey: "beschreibung" },
            { title: "Infos", dataKey: "infosMusiker" }
        ];
        let rows = this.selectedAusrueckungen.map(e => {
            const r = { ...e };
            // r.von = this.mkjDate.transform(r.von, "E dd. MMM YYYY") + this.mkjDate.transform(r.treffzeit, ", HH:mm");
            return r;
        });

        this.exportService.savePDF(columns, rows);

    }

    exportExcel() {
        this.exportService.exportExcel(this.selectedAusrueckungen, "Ausrückungen");
    }

    exportToCalendar(ausrueckung: Ausrueckung) {
        this.exportService.exportAusrueckungIcs(ausrueckung);
    }
}
