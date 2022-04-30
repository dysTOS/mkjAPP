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
            start: [moment(ausrueckung.vonDatum).year(), moment(ausrueckung.vonDatum).month() + 1,
            moment(ausrueckung.vonDatum).date(), +ausrueckung.vonZeit.substring(0, 2), +ausrueckung.vonZeit.substring(4, 6)],
            end: [moment(ausrueckung.bisDatum).year(), moment(ausrueckung.bisDatum).month() + 1,
            moment(ausrueckung.bisDatum).date(), +ausrueckung.bisZeit.substring(0, 2), +ausrueckung.bisZeit.substring(4, 6)],
            // duration: { hours: 6, minutes: 30 },
            title: ausrueckung.name,
            url: 'https://www.mk-jainzen.at/',
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

        this.saveIcsEvent(event, ausrueckung.name);
    }

    private saveIcsEvent(event: ics.EventAttributes, fileName: string) {
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
        const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const EXCEL_EXTENSION = '.xlsx';
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
