export interface DisplayModelConfiguration<T> {
    fields: DisplayModelField<T>[];
}

export interface DisplayModelField<T> {
    label: string;
    type?: "value" | "links";
    field?: string;
    styleClass?: string;
    value?: unknown;
}
