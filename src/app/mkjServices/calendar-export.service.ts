import { Ausrueckung } from './../mkjInterfaces/Ausrueckung';
import { Injectable } from '@angular/core';
import * as ics from 'ics';
import * as FileSaver from 'file-saver';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class CalendarExportService {

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
            attendees: []
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

        this.saveEvent(event, ausrueckung.name + '.ics');
    }

    private saveEvent(event: ics.EventAttributes, fileName: string) {
        ics.createEvent(event, (error, value) => {
            if (error) {
                console.log(error)
                return
            }
            if (value) {
                const data = new File([value], "cal", { type: "text/plain" });
                FileSaver.saveAs(data, fileName);
            }
        })
    }
}
