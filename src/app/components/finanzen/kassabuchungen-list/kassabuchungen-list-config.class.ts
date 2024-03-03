import { Kassabuchung } from 'src/app/models/Kassabuch';
import {
  ListConfiguration,
  MkjListColumn,
  MkjListSelectionMode,
  MkjListSort,
} from 'src/app/utilities/_list-configurations/_list-configuration.class';

export class KassabuchungenListConfig implements ListConfiguration<Kassabuchung> {
  listName: string = 'kassabuchungen';
  selectionMode: MkjListSelectionMode = 'single';
  hideHeader: boolean = false;
  lazyLoad = true;
  showTotalCount = true;
  sort: MkjListSort<Kassabuchung> = {
    field: 'datum',
    order: -1,
  };
  columns: MkjListColumn<Kassabuchung>[] = [
    {
      header: null,
      type: 'template',
      templateName: 'tagTemplate',
      styleClass: 'w-6rem not-on-small',
    },
    {
      header: 'Nr',
      type: 'string',
      field: 'nummer',
      styleClass: 'w-8rem not-on-small',
    },
    {
      header: 'Datum',
      type: 'date',
      field: 'datum',
      styleClass: 'w-10rem',
      sortable: true,
    },
    {
      header: 'Betrag',
      type: 'currency',
      field: 'gesamtpreis',
      styleClass: 'w-10rem',
    },
    {
      header: 'Betreff',
      type: 'string',
      field: 'betreff',
    },
    {
      header: 'Kontrahent',
      type: 'value',
      getValue: (kassabuchung: Kassabuchung) => {
        return (
          kassabuchung.anschrift?.firma ??
          (kassabuchung.anschrift?.vorname ?? '') + ' ' + (kassabuchung.anschrift?.zuname ?? '')
        );
      },
    },
  ];
}
