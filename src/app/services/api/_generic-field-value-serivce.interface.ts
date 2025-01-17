import { Observable } from 'rxjs';
import { GetListOutput } from 'src/app/interfaces/api-middleware';
import { GenericFieldValue } from 'src/app/utilities/_list-datasources/generic-field-values-datasource.class';

export interface GenericFieldValueService {
  searchFieldValues: (field: string, value: string) => Observable<GetListOutput<GenericFieldValue>>;
}
