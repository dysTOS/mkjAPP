import { Injectable } from '@angular/core';
import { Instrument } from 'src/app/models/Instrument';
import { ConfigurationService } from 'src/app/services/configuration.service';
import {
  ListConfiguration,
  MkjListColumn,
  MkjListGlobalFilter,
  MkjListSelectionMode,
  MkjListSort,
} from './_list-configuration.class';
import { GruppenApiService } from 'src/app/services/api/gruppen-api.service';

@Injectable()
export class InstrumenteListConfig implements ListConfiguration<Instrument> {
  constructor(
    private appNaming: ConfigurationService,
    private gruppenApiService: GruppenApiService
  ) {
    this.gruppenApiService.getList({ sort: { field: 'name' } }).subscribe((gruppen) => {
      this.columns.find((c) => c.field === 'gruppe_id').filter.filterOptions = [
        ...gruppen.values.map((g) => ({ label: g.name, value: g.id })),
      ];
    });
  }

  listName: string = 'Instrumente';
  selectionMode: MkjListSelectionMode = 'single';
  lazyLoad: boolean = true;
  showTotalCount = true;
  sort: MkjListSort<Instrument> = {
    field: 'marke',
    order: 1,
  };
  globalFilter: MkjListGlobalFilter<Instrument> = {
    fields: ['bezeichnung', 'marke'],
  };
  columns: MkjListColumn<Instrument>[] = [
    {
      header: 'Bezeichung',
      field: 'bezeichnung',
      type: 'string',
      sortable: true,
    },
    {
      header: 'Marke',
      field: 'marke',
      type: 'string',
      sortable: true,
    },
    {
      header: this.appNaming.uiNaming.Gruppen,
      field: 'gruppe_id',
      templateName: 'gruppen',
      type: 'value',
      getValue: (item: Instrument) => item.gruppe?.name,
      filter: {
        filterType: 'multiselect',
        filterOptions: null, //set in constructor
      },
    },
  ];
}
