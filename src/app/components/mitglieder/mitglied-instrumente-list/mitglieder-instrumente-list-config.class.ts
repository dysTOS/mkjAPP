import { Instrument } from 'src/app/models/Instrument';
import {
  ListConfiguration,
  MkjListColumn,
  MkjListSelectionMode,
  MkjListSort,
} from 'src/app/utilities/_list-configurations/_list-configuration.class';

export class MitgliedInstrumenteListConfig implements ListConfiguration<Instrument> {
  listName: string = 'mitglieder-instrumente';
  selectionMode: MkjListSelectionMode = 'single';
  hideHeader: boolean = true;
  showTotalCount = true;
  sort: MkjListSort<Instrument> = {
    field: 'marke',
    order: 1,
  };
  columns: MkjListColumn<Instrument>[] = [
    {
      header: 'Instrument',
      type: 'value',
      getValue: (item: Instrument) => item.bezeichnung + ' | ' + item.marke,
    },
  ];
}
