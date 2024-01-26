import { Injectable } from '@angular/core';
import { Termin, TerminStatusMap } from 'src/app/models/Termin';
import {
  ListConfiguration,
  MkjListColumn,
  MkjListGlobalFilter,
  MkjListRowStyle,
  MkjListSelectionMode,
  MkjListSort,
} from './_list-configuration.class';
import dayjs from 'dayjs';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { FilterMetadata } from 'primeng/api';

@Injectable()
export class TermineListConfig implements ListConfiguration<Termin> {
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

  initialFilter: { [key: string]: FilterMetadata } = {
    vonDatum: {
      value: dayjs(new Date()).subtract(2, 'week').toDate(),
      matchMode: 'dateAfter',
      operator: 'and',
    },
  };

  columns: MkjListColumn<Termin>[] = [
    {
      header: 'Name',
      field: 'name',
      type: 'template',
      templateName: 'nameTemplate',
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
    },
    {
      header: 'Kategorie',
      field: 'kategorie',
      type: 'template',
      templateName: 'kategorieTemplate',
      styleClass: 'not-on-small w-12rem',
      filter: {
        filterOptions: [
          {
            label: 'Alle',
            value: null,
          },
          ...this.configService.terminConfig.terminKategorien,
        ],
      },
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
    },
  ];

  constructor(private configService: ConfigurationService) {}
}
