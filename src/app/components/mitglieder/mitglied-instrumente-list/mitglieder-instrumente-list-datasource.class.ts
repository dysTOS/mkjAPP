import { Observable, map } from 'rxjs';
import { GetListOutput } from 'src/app/interfaces/api-middleware';
import { Instrument } from 'src/app/models/Instrument';
import { InstrumenteApiService } from 'src/app/services/api/instrumente-api.service';
import { AbstractListDatasource } from 'src/app/utilities/_list-datasources/_abstract-list-datasource.class';
import { TileValue } from 'src/app/utilities/mkj-tile-view/mkj-tile-view.component';

export class MitgliedInstrumenteListDatasource extends AbstractListDatasource<Instrument> {
  constructor(
    private apiService: InstrumenteApiService,
    private mitgliedId: string
  ) {
    super();
  }

  public getList(): Observable<GetListOutput<Instrument>> {
    return this.apiService.getInstrumenteOfMitglied(this.mitgliedId).pipe(
      map((res) => {
        return {
          values: res,
          totalCount: res.length,
        };
      })
    );
  }

  public getById(id: string): Observable<Instrument> {
    throw new Error('Method not implemented.');
  }

  public mapToTileValue(item: Instrument): TileValue<Instrument> {
    throw new Error('Method not implemented.');
  }
}
