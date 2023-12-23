import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GetListInput, GetListOutput } from "src/app/interfaces/api-middleware";
import { Anschrift } from "src/app/models/Anschrift";
import { AnschriftenApiService } from "src/app/services/api/anschriften-api.service";
import { TileValue } from "../mkj-tile-view/mkj-tile-view.component";
import { AbstractListDatasource } from "./_abstract-list-datasource.class";

@Injectable()
export class AnschriftenListDatasource extends AbstractListDatasource<Anschrift> {
    constructor(private apiService: AnschriftenApiService) {
        super();
    }

    public getList(
        input?: GetListInput<Anschrift>
    ): Observable<GetListOutput<Anschrift>> {
        return this.apiService.getList(input);
    }

    public mapToTileValue(item: Anschrift): TileValue<Anschrift> {
        throw new Error("Method not implemented.");
    }
}
