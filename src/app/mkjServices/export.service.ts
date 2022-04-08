import { Ausrueckung } from '../mkjInterfaces/Ausrueckung';
import { Injectable } from '@angular/core';
import * as ics from 'ics';
import * as FileSaver from 'file-saver';
import * as moment from 'moment';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

@Injectable({
    providedIn: 'root'
})
export class ExportService {

    constructor() { }

    public exportAusrueckungIcs(ausrueckung: Ausrueckung) {
        const event: ics.EventAttributes = {
            start: [moment(ausrueckung.von).year(), moment(ausrueckung.von).month(),
            moment(ausrueckung.von).day(), moment(ausrueckung.von).hour(), moment(ausrueckung.von).minute()],
            end: [moment(ausrueckung.bis).year(), moment(ausrueckung.bis).month(),
            moment(ausrueckung.bis).day(), moment(ausrueckung.bis).hour(), moment(ausrueckung.bis).minute()],
            // duration: { hours: 6, minutes: 30 },
            title: ausrueckung.name,
            url: 'http://www.mk-jainzen.at/',
            // geo: { lat: 40.0095, lon: 105.2669 },
            categories: ['MK Jainzen', 'Ausrückung', ausrueckung.kategorie],
            // status: 'CONFIRMED',
            // busyStatus: 'BUSY',
            // organizer: { name: 'Admin', email: 'Race@BolderBOULDER.com' },
            // attendees: []
        }

        if (ausrueckung.ort) {
            event.location = ausrueckung.ort;
        }
        if (ausrueckung.beschreibung) {
            event.description = ausrueckung.beschreibung;
        }
        if (ausrueckung.infoMusiker) {
            if (event.description) {
                event.description += '\r\n\r\n Infos:\r\n' + ausrueckung.infoMusiker
            } else {
                event.description = ausrueckung.infoMusiker
            }
        }

        this.saveEvent(event, ausrueckung.name);
    }

    private saveEvent(event: ics.EventAttributes, fileName: string) {
        ics.createEvent(event, (error, value) => {
            if (error) {
                console.log(error)
                return
            }
            if (value) {
                const data = new Blob([value], { type: "text/calendar" });
                FileSaver.saveAs(data, fileName + '.ics');
            }
        })
    }

    public exportExcel(array: any, fileName: string) {
        import("xlsx").then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(array);
            const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
            const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            this.saveAsExcelFile(excelBuffer, fileName);
        });
    }

    private saveAsExcelFile(buffer: any, fileName: string): void {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
    }

    public savePDF(columns, rows) {
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
}
