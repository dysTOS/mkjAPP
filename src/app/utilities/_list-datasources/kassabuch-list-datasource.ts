import { Observable } from "rxjs";
import {
    GetListOutput as GetCollectionApiOutput,
    GetListInput,
} from "src/app/interfaces/api-middleware";
import { Kassabuch } from "src/app/models/Kassabuch";
import { KassabuchApiService } from "src/app/services/api/kassabuch-api.service";
import { AbstractListDatasource } from "./_abstract-list-datasource.class";
import { Injectable } from "@angular/core";
import { TileValue } from "../mkj-tile-view/mkj-tile-view.component";

@Injectable()
export class KassabuchListDatasource extends AbstractListDatasource<Kassabuch> {
    constructor(private apiService: KassabuchApiService) {
        super();
    }

    public getList(
        input?: GetListInput<Kassabuch>
    ): Observable<GetCollectionApiOutput<Kassabuch>> {
        return this.apiService.getList(input);
    }

    public mapToTileValue(item: Kassabuch): TileValue<Kassabuch> {
        return {
            label: item.name,
            value: item,
            color: item.color,
            labelBottomLeft: null,
            labelBottomRight: "€ " + item.kassastand,
        };
    }
}
