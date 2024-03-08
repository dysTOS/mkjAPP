import { Noten } from 'src/app/models/Noten';
import {
  ListConfiguration,
  MkjListColumn,
  MkjListGlobalFilter,
  MkjListSelectionMode,
  MkjListSort,
} from './_list-configuration.class';
import { Injectable } from '@angular/core';
import { ConfigurationService } from 'src/app/services/configuration.service';

@Injectable()
export class NotenListConfig implements ListConfiguration<Noten> {
  constructor(private configService: ConfigurationService) {}

  listName: string = 'Noten';
  selectionMode: MkjListSelectionMode = 'single';
  showTotalCount = true;
  lazyLoad = true;
  sort: MkjListSort<Noten> = {
    field: 'titel',
    order: 1,
  };
  globalFilter: MkjListGlobalFilter<Noten> = {
    fields: ['titel', 'komponist', 'arrangeur'],
  };
  columns: MkjListColumn<Noten>[] = [
    // {
    //   header: 'ID',
    //   field: 'inventarId',
    //   type: 'string',
    //   styleClass: 'w-5rem not-on-small',
    //   sortable: true,
    // },
    {
      header: 'Titel',
      field: 'titel',
      type: 'string',
      sortable: true,
    },
    {
      header: 'Bewertung',
      field: 'bewertung',
      type: 'template',
      templateName: 'bewertungTemplate',
      styleClass: 'not-on-small',
    },
    {
      header: 'Komponist',
      field: 'komponist',
      type: 'string',
      styleClass: 'not-on-small',
    },
    {
      header: 'Arrangeur',
      field: 'arrangeur',
      type: 'string',
      styleClass: 'not-on-small',
    },
    {
      header: this.configService.uiNaming.Notengattung,
      field: 'gattung',
      type: 'string',
      styleClass: '',
      sortable: true,
      filter: {
        filterOptions: [{ label: 'Alle', value: null }, ...this.configService.notenConfig.notenGattungen],
      },
    },
    {
      header: 'Ausgeliehen',
      field: 'ausgeliehenAb',
      type: 'date',
      styleClass: 'not-on-small',
      filter: {
        filterType: 'not-null',
      },
    },
    {
      header: 'Schwierigkeit',
      field: 'schwierigkeit',
      type: 'string',
      styleClass: 'not-on-small',
      filter: {
        filterOptions: [
          { label: 'Alle', value: null },
          ...[1, 2, 3, 4, 5].map((i) => ({ label: i.toString(), value: i })),
        ],
      },
    },
  ];
}
