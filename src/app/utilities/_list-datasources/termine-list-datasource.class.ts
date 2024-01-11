import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GetListInput, GetListOutput } from "src/app/interfaces/api-middleware";
import { Termin } from "src/app/models/Termin";
import { TermineApiService } from "src/app/services/api/termine-api.service";
import { TileValue } from "../mkj-tile-view/mkj-tile-view.component";
import { AbstractListDatasource } from "./_abstract-list-datasource.class";

@Injectable()
export class TermineListDatasource extends AbstractListDatasource<Termin> {
    constructor(private apiService: TermineApiService) {
        super();
        this.preFilter = {
            field: "vonDatum",
            operator: ">=",
            value: "2023-01-11",
        };
    }

    public getList(
        input?: GetListInput<Termin>
    ): Observable<GetListOutput<Termin>> {
        if (input && this.preFilter) {
            input.filterAnd = [this.preFilter, ...input?.filterAnd];
        }

        return this.apiService.getList(input);
    }

    public mapToTileValue(item: Termin): TileValue<Termin> {
        throw new Error("Method not implemented.");
    }
}
