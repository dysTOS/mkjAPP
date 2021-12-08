import {Component, OnInit} from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { AusrueckungenService } from '../mkjServices/ausrueckungen.service';
import { Ausrueckung } from '../mkjInterfaces/Ausrueckung';
import * as moment from 'moment';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as FileSaver from 'file-saver';

@Component({
    templateUrl: './ausrueckungen.component.html',
    styleUrls: ['./ausrueckungen.scss'],
    styles: [`
        :host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }

        @media screen and (max-width: 960px) {
            :host ::ng-deep .p-datatable.p-datatable-customers .p-datatable-tbody > tr > td:last-child {
                text-align: center;
            }

            :host ::ng-deep .p-datatable.p-datatable-customers .p-datatable-tbody > tr > td:nth-child(6) {
                display: flex;
            }
        }

    `],
    providers: [MessageService, ConfirmationService]
})
export class AusrueckungenComponent implements OnInit {
    ausrueckungDialog: boolean;

    ausrueckungenArray: Ausrueckung[]

    singleAusrueckung: Ausrueckung;
    vonDatumDate: Date;
    bisDatumDate: Date;

    selectedAusrueckungen: Ausrueckung[]; //not used atm

    submitted: boolean;
    updateAusrueckung: boolean;
    loading: boolean;

    cols: any[];

    kategorien: any[];
    status: any[];

    exportOptions: MenuItem[];

    constructor(private ausrueckungService: AusrueckungenService, private messageService: MessageService,
                private confirmationService: ConfirmationService) {}

    ngOnInit() {
        this.loading = true;
        this.ausrueckungService.getAusrueckungen().subscribe(
            ausrueckungen => (this.ausrueckungenArray = ausrueckungen),
            (error) => console.log(error),
            () => this.loading = false
        );

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'von', header: 'Datum' },
            { field: 'typ', header: 'typ' },
            { field: 'status', header: 'Status' }
        ];

        this.kategorien = [
            { typ: 'Kurkonzert'},
            { typ: 'Weckruf'},
            { typ: 'Ständchen'},
        ];

        this.status = [
            { label: 'Fixiert', value: 'fixiert'},
            { label: 'Geplant', value: 'geplant'},
            { label: 'Abgesagt', value: 'abgesagt'},
        ];

        this.exportOptions = [
            { label: 'als Excel', icon: 'pi pi-file-excel',
                command: () => this.exportExcel()
            },
            { label: 'als PDF', icon: 'pi pi-file-pdf',
                command: () => this.exportPdf()
            }];
    }


    openNew() {
        this.singleAusrueckung = {};
        this.vonDatumDate = null;
        this.bisDatumDate = null;
        this.submitted = false;
        this.updateAusrueckung = false;
        this.ausrueckungDialog = true;
    }

    editAusrueckung(ausrueckung: Ausrueckung) {
        this.singleAusrueckung = {...ausrueckung};
        this.vonDatumDate = new Date(this.singleAusrueckung.von);
        this.bisDatumDate = new Date(this.singleAusrueckung.bis);
        this.updateAusrueckung = true;
        this.ausrueckungDialog = true;
    }

    deleteAusrueckung(ausrueckung: Ausrueckung) {
        this.confirmationService.confirm({
            message: 'Soll die Ausrückung ' + ausrueckung.name + ' wirklich gelöscht werden?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.ausrueckungService.deleteAusrueckung(ausrueckung).subscribe(
                    () => this.ausrueckungenArray = this.ausrueckungenArray.filter(val => val.id !== ausrueckung.id),
                    (error) => this.messageService.add({severity: 'error', summary: 'Fehler', detail: 'Ausrückung konnte nicht gelöscht werden!', life: 3000}),
                    () => this.messageService.add({severity: 'success', summary: 'Erfolgreich', detail: 'Ausrückung gelöscht!', life: 3000})
                );
            }
        });
    }

    hideDialog() {
        this.ausrueckungDialog = false;
        this.submitted = false;
    }

    saveAusrueckung() {
        this.submitted = true;

        if (this.singleAusrueckung.name.trim()) {

            if (this.singleAusrueckung.id) { //update
                this.singleAusrueckung.von = moment(this.vonDatumDate.toISOString()).format("YYYY-MM-DD hh:mm:ss").toString();
                this.singleAusrueckung.bis = moment(this.bisDatumDate.toISOString()).format("YYYY-MM-DD hh:mm:ss").toString();

                let index = this.findIndexById(this.singleAusrueckung.id);

                this.ausrueckungService.updateAusrueckung(this.singleAusrueckung).subscribe(
                    (ausrueckungFromAPI) => this.ausrueckungenArray[index] = ausrueckungFromAPI,
                    (error) => this.messageService.add({severity: 'error', summary: 'Fehler', detail: 'Ausrückung konnte nicht aktualisiert werden!', life: 3000}),
                    () => this.messageService.add({severity: 'success', summary: 'Erfolgreich', detail: 'Ausrückung aktualisert!', life: 3000})
                );
            }
            else { //neue
                this.singleAusrueckung.von = moment(this.vonDatumDate.toISOString()).format("YYYY-MM-DD hh:mm:ss").toString();
                this.singleAusrueckung.bis = moment(this.bisDatumDate.toISOString()).format("YYYY-MM-DD hh:mm:ss").toString();

                this.ausrueckungService.createAusrueckung(this.singleAusrueckung).subscribe(
                    (ausrueckungAPI) => this.ausrueckungenArray.push(ausrueckungAPI),
                    (error) => this.messageService.add({severity: 'error', summary: 'Fehler', detail: 'Ausrückung konnte nicht erstellt werden!', life: 3000}),
                    () => this.messageService.add({severity: 'success', summary: 'Erfolgreich', detail: 'Ausrückung erstellt!', life: 3000})
                );
            }

            //console.log(this.singleAusrueckung);
            this.ausrueckungenArray = [...this.ausrueckungenArray];
            this.ausrueckungDialog = false;
            this.singleAusrueckung = {};
        }
    }

    setFilteredRows(e){
        this.selectedAusrueckungen = e.filteredValue;
        console.log(this.selectedAusrueckungen)
    }

    exportPdf() {
        let columns = ["ID", "Name", "Country"];
        let rows = [
            [1, "Shaw", "Tanzania"],
            [2, "Nelson", "Kazakhstan"],
            [3, "Garcia", "Madagascar"],
        ];
        const doc:any = new jsPDF('p','pt');

          doc.autoTable(columns, rows);
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

    onVonCalendarChange(){
        if(this.vonDatumDate){
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

}
