export interface ListConfiguration<T> {
    listName: string;
    columns: MkjListColumn<T>[];
    showTotalCount?: boolean;
    sort?: {
        field: string;
        order: number;
    };
    globalFilter?: {
        fields: string[];
        matchMode?: string;
    };
}

export interface MkjListColumn<T> {
    type: "string" | "currency" | "date" | "boolean" | "template";
    header?: string;
    field?: keyof T;
    styleClass?: string;
    sortable?: boolean;
    filter?: {
        filterOptions?: any;
    };
}
