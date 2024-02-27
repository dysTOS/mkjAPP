import { Injectable } from '@angular/core';
import { Mitglied } from 'src/app/models/Mitglied';
import {
  ListConfiguration,
  MkjListColumn,
  MkjListGlobalFilter,
  MkjListSelectionMode,
  MkjListSort,
} from './_list-configuration.class';
import { FilterMetadata } from 'primeng/api';

@Injectable()
export class MitgliederListConfig implements ListConfiguration<Mitglied> {
  listName: string = 'Mitglieder';
  selectionMode: MkjListSelectionMode = 'single';
  showTotalCount = true;
  lazyLoad: boolean = true;
  sort: MkjListSort<Mitglied> = {
    field: 'zuname',
    order: 1,
  };
  globalFilter: MkjListGlobalFilter<Mitglied> = {
    fields: ['vorname', 'zuname', 'email'],
  };
  initialFilter: { [key: string]: FilterMetadata[] } = {
    aktiv: [
      {
        value: 1,
        matchMode: 'equals',
        operator: 'and',
      },
    ],
  };
  columns: MkjListColumn<Mitglied>[] = [
    {
      header: 'Status',
      field: 'aktiv',
      type: 'template',
      templateName: 'aktivTemplate',
      styleClass: 'w-10rem',
      filter: {
        filterOptions: [
          {
            label: 'Alle',
            value: null,
          },
          {
            label: 'Aktiv',
            value: 1,
          },
          {
            label: 'Inaktiv',
            value: 0,
          },
        ],
      },
    },
    {
      header: 'Vorname',
      field: 'vorname',
      type: 'string',
      sortable: true,
    },
    {
      header: 'Nachname',
      field: 'zuname',
      type: 'string',
      sortable: true,
    },
  ];
}
