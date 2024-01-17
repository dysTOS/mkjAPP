import { Observable, map } from "rxjs";
import { GetListOutput } from "src/app/interfaces/api-middleware";
import { Mitglied } from "src/app/models/Mitglied";
import { GruppenApiService } from "src/app/services/api/gruppen-api.service";
import { AbstractListDatasource } from "src/app/utilities/_list-datasources/_abstract-list-datasource.class";
import { TileValue } from "src/app/utilities/mkj-tile-view/mkj-tile-view.component";

export class GruppeMitgliederListDatasource extends AbstractListDatasource<Mitglied> {
    constructor(
        private apiService: GruppenApiService,
        private gruppeId: string
    ) {
        super();
    }

    public getList(): Observable<GetListOutput<Mitglied>> {
        return this.apiService.getMitgliederOfGruppe(this.gruppeId).pipe(
            map((res) => {
                return {
                    values: res,
                    totalCount: res.length,
                };
            })
        );
    }

    public getById(id: string): Observable<Mitglied> {
        throw new Error("Method not implemented.");
    }

    public mapToTileValue(item: Mitglied): TileValue<Mitglied> {
        throw new Error("Method not implemented.");
    }
}
