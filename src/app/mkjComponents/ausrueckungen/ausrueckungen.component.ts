import { kategorienOptions, statusOptions, columnOptions, ZeitraumOptions } from './../../mkjInterfaces/Ausrueckung';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { AusrueckungenService } from '../../mkjServices/ausrueckungen.service';
import { Ausrueckung, AusrueckungFilterInput } from '../../mkjInterfaces/Ausrueckung';
import * as moment from 'moment';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as FileSaver from 'file-saver';
import { Table } from 'primeng/table';

@Component({
    templateUrl: './ausrueckungen.component.html',
    styleUrls: ['./ausrueckungen.scss'],
    styles: [`
        @media screen and (max-width: 960px) {
            :host ::ng-deep .p-datatable.p-datatable-customers .p-datatable-tbody > tr > td:last-child {
                text-align: center;
            }

            :host ::ng-deep .p-datatable.p-datatable-customers .p-datatable-tbody > tr > td:first-child {
                width: auto !important;
            }
        }

    `],
    providers: [MessageService, ConfirmationService]
})

export class AusrueckungenComponent implements OnInit {
    ausrueckungDialog: boolean;
    zeitraumDialog: boolean;

    ausrueckungenArray: Ausrueckung[];
    ausrueckungFilterInput: AusrueckungFilterInput;
    selectedAusrueckungen: Ausrueckung[];

    singleAusrueckung: Ausrueckung;
    vonDatumDate: Date;
    bisDatumDate: Date;
    vonZeitraum: string;
    bisZeitraum: string;
    zeitraumDisplayText: string;

    exportOptions: MenuItem[];
    zeitraumOptions: MenuItem[];
    submitted: boolean;
    updateAusrueckung: boolean;
    loading: boolean;

    cols = columnOptions; //columns for csv export
    kategorien = kategorienOptions;
    status = statusOptions;

    @ViewChild('dt') ausrueckungenTabelle: Table;
    selectedRow;

    constructor(private ausrueckungService: AusrueckungenService, private messageService: MessageService,
        private confirmationService: ConfirmationService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        this.loading = true;
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
                bisFilter: year + "-12-31 23:59:59"
            }

        }

        this.ausrueckungService.getAusrueckungenFiltered(this.ausrueckungFilterInput).subscribe(
            ausrueckungen => (this.ausrueckungenArray = ausrueckungen, this.selectedAusrueckungen = ausrueckungen,
                this.ausrueckungenArray.forEach(element => {
                    element.von = element.von.replace('-', '/'); //because of iphone/safari date problem!!
                    element.bis = element.bis.replace('-', '/');
                })),
            (error) => console.log(error.message),
            () => this.loading = false
        );

        this.exportOptions = [
            {
                label: 'als Excel', icon: 'pi pi-file-excel',
                command: () => this.exportExcel()
            },
            {
                label: 'als PDF', icon: 'pi pi-file-pdf',
                command: () => this.exportPdf()
            },
            {
                label: 'als CSV', icon: 'pi pi-file',
                command: () => this.exportCsv()
            }];

        this.zeitraumOptions = [
            {
                label: new Date().getFullYear().toString(), icon: 'pi pi-calendar-plus',
                command: () => this.saveZeitraum(ZeitraumOptions.ActualYear)
            },
            {
                label: 'Spezifisch', icon: 'pi pi-calendar-times',
                command: () => this.showZeitraumDialog()
            },
            {
                label: 'Alle Ausrückungen', icon: 'pi pi-calendar',
                command: () => this.getAllAusrueckungen()
            }];
    }


    openNew(): void {
        this.singleAusrueckung = {};
        this.singleAusrueckung.oeffentlich = true;
        this.vonDatumDate = null;
        this.bisDatumDate = null;
        this.submitted = false;
        this.updateAusrueckung = false;
        this.ausrueckungDialog = true;
    }

    editAusrueckung(ausrueckung: Ausrueckung) {
        this.singleAusrueckung = { ...ausrueckung };
        this.vonDatumDate = new Date(this.singleAusrueckung.von);
        this.bisDatumDate = new Date(this.singleAusrueckung.bis);
        this.updateAusrueckung = true;
        this.ausrueckungDialog = true;
    }

    showZeitraumDialog() {
        this.zeitraumDialog = true;
    }

    deleteAusrueckung(ausrueckung: Ausrueckung) {
        this.confirmationService.confirm({
            header: '<b>' + ausrueckung.name + '</b> löschen?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.ausrueckungService.deleteAusrueckung(ausrueckung).subscribe(
                    () => this.ausrueckungenArray = this.ausrueckungenArray.filter(val => val.id !== ausrueckung.id),
                    (error) => this.messageService.add({ severity: 'error', summary: 'Fehler', detail: 'Ausrückung konnte nicht gelöscht werden!', life: 3000 }),
                    () => this.messageService.add({ severity: 'success', summary: 'Erfolgreich', detail: 'Ausrückung gelöscht!', life: 3000 })
                );
            }
        });
    }

    hideAusrueckungDialog() {
        this.ausrueckungDialog = false;
        this.submitted = false;
    }

    hideZeitraumDialog() {
        this.zeitraumDialog = false;
        this.vonZeitraum = null;
        this.bisZeitraum = null;
    }

    saveAusrueckung() {
        this.submitted = true;

        if (!this.singleAusrueckung.name.trim() || !this.singleAusrueckung.kategorie || !this.singleAusrueckung.status || !this.singleAusrueckung.von || !this.singleAusrueckung.bis) return;


        if (this.singleAusrueckung.id) { //update
            this.singleAusrueckung.von = moment(this.vonDatumDate).format("YYYY-MM-DD HH:mm:ss").toString();
            this.singleAusrueckung.bis = moment(this.bisDatumDate).format("YYYY-MM-DD HH:mm:ss").toString();

            let index = this.findIndexById(this.singleAusrueckung.id);

            this.ausrueckungService.updateAusrueckung(this.singleAusrueckung).subscribe(
                (ausrueckungFromAPI) => (this.ausrueckungenArray[index] = ausrueckungFromAPI, this.ausrueckungenArray = [...this.ausrueckungenArray]),
                (error) => this.messageService.add({ severity: 'error', summary: 'Fehler', detail: 'Ausrückung konnte nicht aktualisiert werden! ' + error, life: 3000 }),
                () => this.messageService.add({ severity: 'success', summary: 'Erfolgreich', detail: 'Ausrückung aktualisert!', life: 3000 })
            );
        }
        else { //neue
            this.singleAusrueckung.von = moment(this.vonDatumDate).format("YYYY-MM-DD HH:mm:ss").toString();
            this.singleAusrueckung.bis = moment(this.bisDatumDate).format("YYYY-MM-DD HH:mm:ss").toString();

            this.ausrueckungService.createAusrueckung(this.singleAusrueckung).subscribe(
                (ausrueckungAPI) => { this.ausrueckungenArray.push(ausrueckungAPI); this.ausrueckungenArray = [...this.ausrueckungenArray] },
                (error) => this.messageService.add({ severity: 'error', summary: 'Fehler', detail: 'Ausrückung konnte nicht erstellt werden! ' + error, life: 3000 }),
                () => this.messageService.add({ severity: 'success', summary: 'Erfolgreich', detail: 'Ausrückung erstellt!', life: 3000 })
            );
        }

        this.ausrueckungDialog = false;
        this.singleAusrueckung = {};
    }

    getAllAusrueckungen() {
        this.zeitraumDisplayText = "(Alle)";
        sessionStorage.removeItem("ausrueckungenFilter");
        this.loading = true;
        this.ausrueckungService.getAusrueckungen().subscribe(
            ausrueckungen => (this.ausrueckungenArray = ausrueckungen, this.selectedAusrueckungen = ausrueckungen,
                this.ausrueckungenArray.forEach(element => {
                    element.von = element.von.replace('-', '/'); //because of iphone/safari date problem!!
                    element.bis = element.bis.replace('-', '/');
                })),
            (error) => this.messageService.add({ severity: 'error', summary: 'Fehler', detail: 'Ausrückungen konnten nicht geladen werden! ' + error, life: 3000 }),
            () => (this.messageService.add({ severity: 'success', summary: 'Erfolgreich', detail: 'Alle Ausrückungen geladen!', life: 3000 }), this.loading = false)
        );
    }

    saveZeitraum(zeitraum: ZeitraumOptions) {
        if (zeitraum == ZeitraumOptions.SpecificRange && this.vonZeitraum && this.bisZeitraum) {
            this.ausrueckungFilterInput = {
                vonFilter: moment(new Date(this.vonZeitraum)).format("YYYY-MM-DD HH:mm:ss").toString(),
                bisFilter: moment(new Date(this.bisZeitraum)).format("YYYY-MM-DD HH:mm:ss").toString()
            }
            this.zeitraumDisplayText = this.generateZeitraumDisplayText(this.ausrueckungFilterInput);
            sessionStorage.setItem("ausrueckungenFilter", JSON.stringify(this.ausrueckungFilterInput));
        }
        else if (zeitraum == ZeitraumOptions.ActualYear) {
            this.zeitraumDisplayText = new Date().getFullYear().toString();
            let year = new Date().getFullYear();
            this.ausrueckungFilterInput = {
                vonFilter: year + "-01-01 00:00:00",
                bisFilter: year + "-12-31 23:59:59"
            }
            sessionStorage.removeItem("ausrueckungenFilter");
        }

        this.loading = true;
        this.ausrueckungService.getAusrueckungenFiltered(this.ausrueckungFilterInput).subscribe(
            ausrueckungen => (this.ausrueckungenArray = ausrueckungen, this.selectedAusrueckungen = [...ausrueckungen],
                this.ausrueckungenArray.forEach(element => {
                    element.von = element.von.replace('-', '/'); //because of iphone/safari date problem!!
                    element.bis = element.bis.replace('-', '/');
                })),
            (error) => this.messageService.add({ severity: 'error', summary: 'Fehler', detail: 'Zeitraum konnte nicht geändert werden! ' + error, life: 3000 }),
            () => (this.messageService.add({ severity: 'success', summary: 'Erfolgreich', detail: 'Zeitraum geändert!', life: 3000 }), this.loading = false)
        );

        this.zeitraumDialog = false;
    }

    generateZeitraumDisplayText(filter: AusrueckungFilterInput): string {
        return moment(filter.vonFilter).format("D. M. YYYY") + " bis " + moment(filter.bisFilter).format("D. M. YYYY");
    }

    navigateSingleAusrueckung(id: number) {
        this.router.navigate(['../ausrueckung/' + id], { relativeTo: this.route });
    }

    setFilteredRows(e) {
        this.selectedAusrueckungen = e.filteredValue;
    }

    exportCsv() {
        this.ausrueckungenTabelle.exportCSV({ filteredValues: true });
    }

    exportPdf() {
        let columns = [
            { title: "Name", dataKey: "name" },
            { title: "Datum", dataKey: "von" },
            { title: "Kategorie", dataKey: "typ" },
            { title: "Status", dataKey: "status" },
            { title: "Beschreibung", dataKey: "beschreibung" },
            { title: "Infos", dataKey: "infosMusiker" }
        ];
        let rows = this.selectedAusrueckungen;
        const doc: any = new jsPDF('l', 'pt');

        doc.autoTable(columns, rows, {
            theme: 'striped',
            styles: {},
            headstyles: { fillColor: [0, 66, 0] },
            bodyStyles: {},
            alternateRowStyles: {},
            columnStyles: { columnWidth: 'auto' },
            margin: { top: 50 },
            beforePageContent: function (data) {
                doc.text("Ausrückungen", 40, 30);
            }
        });
        doc.save("Ausrückungen.pdf");
    }

    exportExcel() {
        import("xlsx").then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(this.selectedAusrueckungen);
            const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
            const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            this.saveAsExcelFile(excelBuffer, "Ausrückungen");
        });
    }

    saveAsExcelFile(buffer: any, fileName: string): void {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    }

    onVonCalendarChange() {
        if (this.vonDatumDate) {
            let v = moment(this.vonDatumDate);
            let b = v.add(2, 'h');
            this.bisDatumDate = new Date(b.toISOString());
        }
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
        this.ausrueckungenTabelle.toggleRow(event.data);
    }

    onRowUnselect(event) {
        this.ausrueckungenTabelle.toggleRow(event.data);
    }

}
