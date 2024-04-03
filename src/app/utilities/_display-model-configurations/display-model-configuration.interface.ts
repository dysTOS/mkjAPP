import { PermissionKey } from 'src/app/models/User';
import { ModelType } from 'src/app/models/_ModelType';

export interface DisplayModelConfiguration<T> {
  fields: DisplayModelField<T>[];
  rateable?: boolean;
  commentable?: ModelType;
  actions: DisplayModelAction<T>[];
}

export interface DisplayModelField<T> {
  label: string;
  getValue: (model: T) => unknown;
  type?: 'value' | 'links';
  styleClass?: string;
  value?: unknown;
}

export interface DisplayModelAction<T> {
  type: 'details' | 'duplicate' | 'edit' | 'delete' | 'custom';
  routerLink?: string;
  action?: (model: T) => void;
  permission?: PermissionKey[];
}
