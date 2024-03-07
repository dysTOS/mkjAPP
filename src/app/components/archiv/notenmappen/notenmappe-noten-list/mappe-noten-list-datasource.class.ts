import { Observable, map } from 'rxjs';
import { GetListOutput } from 'src/app/interfaces/api-middleware';
import { Noten } from 'src/app/models/Noten';
import { NotenmappenApiService } from 'src/app/services/api/notenmappen-api.service';
import { AbstractListDatasource } from 'src/app/utilities/_list-datasources/_abstract-list-datasource.class';
import { TileValue } from 'src/app/utilities/mkj-tile-view/mkj-tile-view.component';

export class MappeNotenListDatasource extends AbstractListDatasource<Noten> {
  constructor(
    private apiService: NotenmappenApiService,
    private mappeId: string
  ) {
    super();
  }

  public getList(): Observable<GetListOutput<Noten>> {
    return this.apiService.getNotenOfMappe(this.mappeId).pipe(
      map((res) => {
        this.sortNoten(res);
        return {
          values: res,
          totalCount: res.length,
        };
      })
    );
  }

  public getById(id: string): Observable<Noten> {
    throw new Error('Method not implemented.');
  }

  public mapToTileValue(item: Noten): TileValue<Noten> {
    throw new Error('Method not implemented.');
  }

  private sortNoten(noten: Noten[]): void {
    // noten.sort((a, b) => a.pivot?.orderIndex - b.pivot?.orderIndex);
  }
}
