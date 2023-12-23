import { Noten } from "src/app/models/Noten";
import { AbstractListDatasource } from "./_abstract-list-datasource.class";
import { NotenApiService } from "src/app/services/api/noten-api.service";
import { Observable } from "rxjs";
import { GetListInput, GetListOutput } from "src/app/interfaces/api-middleware";
import { TileValue } from "../mkj-tile-view/mkj-tile-view.component";
import { Injectable } from "@angular/core";

@Injectable()
export class NotenListDatasource extends AbstractListDatasource<Noten> {
    constructor(private apiService: NotenApiService) {
        super();
    }

    public getList(
        input?: GetListInput<Noten>
    ): Observable<GetListOutput<Noten>> {
        return this.apiService.getList(input);
    }

    public mapToTileValue(item: Noten): TileValue<Noten> {
        throw new Error("Method not implemented.");
    }
}
