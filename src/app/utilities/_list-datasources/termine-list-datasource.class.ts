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
    }

    public getList(
        input?: GetListInput<Termin>
    ): Observable<GetListOutput<Termin>> {
        return this.apiService.getList(input);
    }

    public getById(id: string): Observable<Termin> {
        return this.apiService.getById(id);
    }

    public mapToTileValue(item: Termin): TileValue<Termin> {
        throw new Error("Method not implemented.");
    }
}
