export interface ListConfiguration<T> {
    listName: string;
    columns: MkjListColumn<T>[];
    lazyLoad?: boolean;
    showTotalCount?: boolean;
    hideHeader?: boolean;
    selectionMode?: MkjListSelectionMode;
    sort?: MkjListSort<T>;
    globalFilter?: MkjListGlobalFilter<T>;
}

export interface MkjListColumn<T> {
    type: "string" | "currency" | "date" | "boolean" | "template" | "value";
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
    filterOptions?: any;
}

export type MkjListSelectionMode = "single" | "multiple";
