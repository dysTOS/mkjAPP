import { FilterMetadata } from 'primeng/api';

export interface ListConfiguration<T> {
  listName: string;
  columns: MkjListColumn<T>[];

  lazyLoad?: boolean;
  showTotalCount?: boolean;
  hideHeader?: boolean;
  selectionMode?: MkjListSelectionMode;
  sort?: MkjListSort<T>;
  globalFilter?: MkjListGlobalFilter<T>;
  rowStyle?: MkjListRowStyle<T>;
  initialFilter?: { [key: string]: FilterMetadata[] };
}

export interface MkjListColumn<T> {
  type?: 'string' | 'currency' | 'date' | 'boolean' | 'template' | 'value';

  header?: string;
  field?: keyof T;
  templateName?: string;
  styleClass?: string;
  sortable?: boolean;
  filter?: MkjListColumnFilter;
  getValue?: (item: T) => any;
}

export interface MkjListSort<T> {
  field: string;
  order: number;
}

export interface MkjListGlobalFilter<T> {
  fields: Array<keyof T>;
}

export interface MkjListColumnFilter {
  filterType?: 'dropdown' | 'multiselect' | 'date';
  filterOptions?: any;
}

export interface MkjListRowStyle<T> {
  styleClass: string;
  condition: (item: T) => boolean;
}

export type MkjListSelectionMode = 'single' | 'multiple';
