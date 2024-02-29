import { Injectable } from '@angular/core';
import dayjs from 'dayjs';
import * as FileSaver from 'file-saver';
import * as ics from 'ics';
import 'jspdf-autotable';
import { Termin } from '../models/Termin';
import { InfoService } from './info.service';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  constructor(private infoService: InfoService) {}

  public exportAusrueckungIcs(ausrueckung: Termin) {
    const event: ics.EventAttributes = {
      start: [
        dayjs(ausrueckung.vonDatum).year(),
        dayjs(ausrueckung.vonDatum).month() + 1,
        dayjs(ausrueckung.vonDatum).date(),
      ],
      end: [
        dayjs(ausrueckung.bisDatum).year(),
        dayjs(ausrueckung.bisDatum).month() + 1,
        dayjs(ausrueckung.bisDatum).date(),
      ],
      // duration: { hours: 6, minutes: 30 },
      title: ausrueckung.name,
      uid: ausrueckung.id,
      url: 'https://app.mk-jainzen.at/',
      // geo: { lat: 40.0095, lon: 105.2669 },
      categories: ['MK Jainzen', 'Ausrückung', ausrueckung.kategorie],
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
        event.description += '\r\n\r\n Infos:\r\n' + ausrueckung.infoMusiker;
      } else {
        event.description = ausrueckung.infoMusiker;
      }
    }

    this.saveIcsEvent(event, ausrueckung.name);
  }

  private saveIcsEvent(event: ics.EventAttributes, fileName: string) {
    ics.createEvent(event, (error, value) => {
      if (error) {
        this.infoService.error(error);
        return;
      }
      if (value) {
        const data = new Blob([value], { type: 'text/calendar' });
        FileSaver.saveAs(data, fileName + '.ics');
      }
    });
  }
}
