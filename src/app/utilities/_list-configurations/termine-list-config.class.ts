import { Injectable } from '@angular/core';
import dayjs from 'dayjs';
import { FilterMetadata } from 'primeng/api';
import { Termin, TerminStatusMap } from 'src/app/models/Termin';
import { MkjDatePipe } from 'src/app/pipes/mkj-date.pipe';
import { ConfigurationService } from 'src/app/services/configuration.service';
import {
  ListConfiguration,
  MkjListColumn,
  MkjListGlobalFilter,
  MkjListRowStyle,
  MkjListSelectionMode,
  MkjListSort,
} from './_list-configuration.class';

@Injectable()
export class TermineListConfig implements ListConfiguration<Termin> {
  constructor(
    private configService: ConfigurationService,
    private mkjDatePipe: MkjDatePipe
  ) {}

  listName: string = 'Termine';
  selectionMode: MkjListSelectionMode = 'single';
  showTotalCount = true;
  lazyLoad: boolean = true;
  sort: MkjListSort<Termin> = {
    field: 'vonDatum',
    order: 1,
  };
  globalFilter: MkjListGlobalFilter<Termin> = {
    fields: ['name', 'vonDatum', 'kategorie'],
  };
  rowStyle: MkjListRowStyle<Termin> = {
    styleClass: 'opacity-60',
    condition: (termin) => termin.vonDatum < dayjs(new Date()).format('YYYY-MM-DD'),
  };

  initialFilter: { [key: string]: FilterMetadata[] } = {
    vonDatum: [
      {
        value: dayjs(new Date()).subtract(2, 'week').toDate(),
        matchMode: 'dateAfter',
        operator: 'and',
      },
    ],
  };

  columns: MkjListColumn<Termin>[] = [
    {
      header: 'Name',
      field: 'name',
      type: 'template',
      templateName: 'nameTemplate',
      getJsPdfValue: (termin) => {
        const name = termin.name;

        if (termin.gruppe) {
          return name + ' (' + termin.gruppe.name + ')';
        }
        return name;
      },
    },
    {
      header: 'Datum',
      field: 'vonDatum',
      type: 'template',
      templateName: 'datumTemplate',
      sortable: true,
      styleClass: 'w-17rem',
      filter: {
        filterType: 'date',
      },
      getJsPdfValue: (termin) => {
        let date =
          this.mkjDatePipe.transform(termin.vonDatum, 'E d. MMMM YYYY') +
          ' ' +
          (termin.treffzeit ?? termin.vonZeit ?? '');

        if (termin.vonDatum !== termin.bisDatum) {
          date += ' - ' + this.mkjDatePipe.transform(termin.bisDatum, 'E d. MMMM YYYY') + ' ' + (termin.bisZeit ?? '');
        }

        return date.trim();
      },
    },
    {
      header: 'Ort',
      field: 'ort',
      type: 'string',
      styleClass: 'w-12rem not-on-small',
      //   getJsPdfValue: (termin) => termin.ort,
    },
    {
      header: 'Kategorie',
      field: 'kategorie',
      type: 'template',
      templateName: 'kategorieTemplate',
      styleClass: 'not-on-small w-12rem',
      filter: {
        // filterType: 'multiselect',
        filterOptions: [
          {
            label: 'Alle',
            value: null,
          },
          ...this.configService.terminConfig.terminKategorien,
        ],
      },
      getJsPdfValue: (termin) => termin.kategorie?.toUpperCase(),
    },
    {
      header: 'Status',
      field: 'status',
      type: 'template',
      templateName: 'statusTemplate',
      styleClass: 'not-on-small w-10rem',
      filter: {
        filterOptions: [
          {
            label: 'Alle',
            value: null,
          },
          ...TerminStatusMap,
        ],
      },
      getJsPdfValue: (termin) => {
        return {
          content: termin.status?.toUpperCase(),
          styles: {
            textColor: termin.status === 'abgesagt' ? 'red' : termin.status === 'ersatztermin' ? 'blue' : null,
          },
        };
      },
    },
  ];
}
