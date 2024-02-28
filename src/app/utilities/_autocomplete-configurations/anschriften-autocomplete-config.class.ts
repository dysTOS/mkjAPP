import { Anschrift } from 'src/app/models/Anschrift';
import { KeyOf } from 'src/app/types/KeyOf';
import { AutoCompleteColumn, AutoCompleteConfiguration } from './_autocomplete-configuration.class';

export class AnschriftenAutoCompleteConfigiguration implements AutoCompleteConfiguration<Anschrift> {
  constructor(public controlValueIsDataKey = true) {
    this.controlValueIsDataKey = controlValueIsDataKey;
  }

  public searchFields: Array<KeyOf<Anschrift>> = ['vorname', 'zuname', 'firma'];
  public columns: AutoCompleteColumn<Anschrift>[] = [
    {
      header: 'Vorname',
      field: 'vorname',
    },
    {
      header: 'Zuname',
      field: 'zuname',
    },
    {
      header: 'Firma',
      field: 'firma',
    },
  ];

  public getDisplayValue = (item: Anschrift) => {
    if (item?.firma) {
      return item.firma;
    }
    return `${item.vorname} ${item.zuname}`;
  };
}
