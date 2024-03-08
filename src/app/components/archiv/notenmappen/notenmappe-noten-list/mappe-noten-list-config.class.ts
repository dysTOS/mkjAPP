import { Noten } from 'src/app/models/Noten';
import {
  ListConfiguration,
  MkjListColumn,
  MkjListGlobalFilter,
  MkjListSelectionMode,
  MkjListSort,
} from 'src/app/utilities/_list-configurations/_list-configuration.class';

export class MappeNotenListConfig implements ListConfiguration<Noten> {
  listName: string = 'mappe-noten';
  selectionMode: MkjListSelectionMode = 'single';
  hideHeader: boolean = false;
  showTotalCount = true;
  sort: MkjListSort<Noten> = {
    field: 'pivot.orderIndex',
    order: 1,
  };
  globalFilter: MkjListGlobalFilter<Noten> = {
    fields: ['titel'],
  };
  columns: MkjListColumn<Noten>[] = [
    {
      header: 'Titel',
      type: 'string',
      field: 'titel',
    },
    {
      header: 'Beliebtheit',
      type: 'template',
      templateName: 'bewertungTemplate',
      field: 'bewertung',
    },
  ];
}
