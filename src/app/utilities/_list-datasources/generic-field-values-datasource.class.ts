import { Observable } from 'rxjs';
import { GetListInput, GetListOutput } from 'src/app/interfaces/api-middleware';
import { GenericFieldValueService } from 'src/app/services/api/_generic-field-value-serivce.interface';
import { TileValue } from '../mkj-tile-view/mkj-tile-view.component';
import { AbstractListDatasource } from './_abstract-list-datasource.class';

export interface GenericFieldValue {
  label: string;
  value: string;
}

export class GenericFieldValueDatasource extends AbstractListDatasource<GenericFieldValue> {
  constructor(private apiService: GenericFieldValueService) {
    super();
  }

  public getList(input: GetListInput<GenericFieldValue>): Observable<GetListOutput<GenericFieldValue>> {
    return this.apiService.searchFieldValues(input.globalFilter?.fields[0], input.globalFilter?.value);
  }

  public getById(id: string): Observable<GenericFieldValue> {
    throw new Error('Method not implemented.');
  }

  public mapToTileValue(item: GenericFieldValue): TileValue<GenericFieldValue> {
    throw new Error('Method not implemented.');
  }
}
