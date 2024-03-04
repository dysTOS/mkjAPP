import { MkjListColumn } from '../_list-configurations/_list-configuration.class';

export interface AutoCompleteConfiguration<T> {
  searchFields: Array<keyof T>;
  columns: Array<AutoCompleteColumn<T>>;
  dataKey?: keyof T;
  controlValueIsDataKey?: boolean;
  allowCustomValues?: boolean;
  getDisplayValue: (item: T) => string;
}

export interface AutoCompleteColumn<T> extends MkjListColumn<T> {}
