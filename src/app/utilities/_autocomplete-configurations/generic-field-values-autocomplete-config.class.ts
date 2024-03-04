import { KeyOf } from 'src/app/types/KeyOf';
import { GenericFieldValue } from '../_list-datasources/generic-field-values-datasource.class';
import { AutoCompleteColumn, AutoCompleteConfiguration } from './_autocomplete-configuration.class';

export class GenericFieldValuesAutoCompleteConfigiguration<T> implements AutoCompleteConfiguration<any> {
  public readonly allowCustomValues: boolean = true;
  public readonly dataKey: keyof GenericFieldValue = 'value';
  public readonly controlValueIsDataKey = false;
  public searchFields: (string | number | symbol)[];
  public columns: AutoCompleteColumn<any>[] = [];

  constructor(searchField: KeyOf<T>, header: string) {
    this.searchFields = [searchField];
    this.columns = [
      {
        header,
        field: 'value',
      },
    ];
  }

  public getDisplayValue = (item: any) => item.value;
}
