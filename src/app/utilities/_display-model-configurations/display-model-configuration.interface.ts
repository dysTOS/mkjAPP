export interface DisplayModelConfiguration<T> {
  fields: DisplayModelField<T>[];
  rateable?: boolean;
}

export interface DisplayModelField<T> {
  label: string;
  getValue: (model: T) => unknown;
  type?: 'value' | 'links';
  styleClass?: string;
  value?: unknown;
}
