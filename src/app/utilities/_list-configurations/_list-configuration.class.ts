export interface ListConfiguration<T> {
    listName: string;
    columns: MkjListColumn<T>[];
    showTotalCount?: boolean;
    sort?: MkjListSortConfiguration<T>;
    globalFilter?: MkjListGlobalFilterConfiguration<T>;
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

export interface MkjListSortConfiguration<T> {
    field: keyof T;
    order: number;
}

export interface MkjListGlobalFilterConfiguration<T> {
    fields: Array<keyof T>;
    matchMode?: string;
}

export interface MkjListColumnFilter {
    filterOptions?: any;
}
