import { Observable } from "rxjs";
import { GetListInput, GetListOutput } from "src/app/interfaces/api-middleware";
import { Kassabuchung } from "src/app/models/Kassabuch";
import { KassabuchungenApiService } from "src/app/services/api/kassabuchungen-api.service";
import { AbstractListDatasource } from "src/app/utilities/_list-datasources/_abstract-list-datasource.class";
import { TileValue } from "src/app/utilities/mkj-tile-view/mkj-tile-view.component";

export class KassabuchungenListDatasource extends AbstractListDatasource<Kassabuchung> {
    constructor(
        private apiService: KassabuchungenApiService,
        private kassabuchId: string
    ) {
        super();
    }

    public getList(
        input?: GetListInput<Kassabuchung>
    ): Observable<GetListOutput<Kassabuchung>> {
        input = {
            ...input,
            filterAnd: [
                {
                    field: "kassabuch_id",
                    value: this.kassabuchId,
                    operator: "=",
                },
                ...input.filterAnd,
            ],
        };

        return this.apiService.getList(input);
    }

    public getById(id: string): Observable<Kassabuchung> {
        return this.apiService.getById(id);
    }

    public mapToTileValue(item: Kassabuchung): TileValue<Kassabuchung> {
        throw new Error("Method not implemented.");
    }
}
