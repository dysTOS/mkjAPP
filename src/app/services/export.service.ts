import { Injectable } from "@angular/core";
import * as FileSaver from "file-saver";
import * as ics from "ics";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import * as moment from "moment";
import { Termin } from "../models/Termin";
import { InfoService } from "./info.service";

@Injectable({
    providedIn: "root",
})
export class ExportService {
    constructor(private infoService: InfoService) {}

    public exportAusrueckungIcs(ausrueckung: Termin) {
        const event: ics.EventAttributes = {
            start: [
                moment(ausrueckung.vonDatum).year(),
                moment(ausrueckung.vonDatum).month() + 1,
                moment(ausrueckung.vonDatum).date(),
            ],
            end: [
                moment(ausrueckung.bisDatum).year(),
                moment(ausrueckung.bisDatum).month() + 1,
                moment(ausrueckung.bisDatum).date(),
            ],
            // duration: { hours: 6, minutes: 30 },
            title: ausrueckung.name,
            uid: ausrueckung.id,
            url: "https://app.mk-jainzen.at/",
            // geo: { lat: 40.0095, lon: 105.2669 },
            categories: ["MK Jainzen", "Ausrückung", ausrueckung.kategorie],
            // status: 'CONFIRMED',
            // busyStatus: 'BUSY',
            // organizer: { name: 'Admin', email: 'Race@BolderBOULDER.com' },
            // attendees: []
        };

        if (ausrueckung.vonZeit) {
            event.start.push(+ausrueckung.vonZeit.substring(0, 2));
            event.start.push(+ausrueckung.vonZeit.substring(3, 5));
        }
        if (ausrueckung.bisZeit) {
            event.end.push(+ausrueckung.bisZeit.substring(0, 2));
            event.end.push(+ausrueckung.bisZeit.substring(3, 5));
        }

        if (ausrueckung.ort) {
            event.location = ausrueckung.ort;
        }
        if (ausrueckung.beschreibung) {
            event.description = ausrueckung.beschreibung;
        }
        if (ausrueckung.infoMusiker) {
            if (event.description) {
                event.description +=
                    "\r\n\r\n Infos:\r\n" + ausrueckung.infoMusiker;
            } else {
                event.description = ausrueckung.infoMusiker;
            }
        }

        this.saveIcsEvent(event, ausrueckung.name);
    }

    private saveIcsEvent(event: ics.EventAttributes, fileName: string) {
        ics.createEvent(event, (error, value) => {
            if (error) {
                console.log(error);
                this.infoService.error(error);
                return;
            }
            if (value) {
                const data = new Blob([value], { type: "text/calendar" });
                FileSaver.saveAs(data, fileName + ".ics");
            }
        });
    }

    public exportExcel(array: any, fileName: string) {
        import("xlsx").then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(array);
            const workbook = {
                Sheets: { data: worksheet },
                SheetNames: ["data"],
            };
            const excelBuffer: any = xlsx.write(workbook, {
                bookType: "xlsx",
                type: "array",
            });
            this.saveAsExcelFile(excelBuffer, fileName);
        });
    }

    private saveAsExcelFile(buffer: any, fileName: string): void {
        const EXCEL_TYPE =
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const EXCEL_EXTENSION = ".xlsx";
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE,
        });
        FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
    }

    public savePDF(columns: any[], rows: any[], filename: string) {
        const doc: any = new jsPDF("l", "pt");

        doc.autoTable(columns, rows, {
            theme: "striped",
            styles: {},
            headStyles: { fillColor: [0, 66, 0] },
            bodyStyles: {},
            alternateRowStyles: {},
            columnStyles: { columnWidth: "auto" },
            margin: { top: 50 },
            beforePageContent: function (data) {
                doc.text(filename, 40, 30);
            },
        });
        doc.save(filename + ".pdf");
    }
}
