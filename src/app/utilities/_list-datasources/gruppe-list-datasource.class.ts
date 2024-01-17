import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GetListInput, GetListOutput } from "src/app/interfaces/api-middleware";
import { Gruppe } from "src/app/models/Gruppe";
import { GruppenApiService } from "src/app/services/api/gruppen-api.service";
import { TileValue } from "../mkj-tile-view/mkj-tile-view.component";
import { AbstractListDatasource } from "./_abstract-list-datasource.class";

@Injectable()
export class GruppeListDatasource extends AbstractListDatasource<Gruppe> {
    constructor(private apiService: GruppenApiService) {
        super();
    }

    public getList(
        input?: GetListInput<Gruppe>
    ): Observable<GetListOutput<Gruppe>> {
        return this.apiService.getList(input);
    }

    public getById(id: string): Observable<Gruppe> {
        return this.apiService.getById(id);
    }

    public mapToTileValue(item: Gruppe): TileValue<Gruppe> {
        return {
            label: item.name,
            value: item,
            color: item.color,
            labelBottomLeft: item.mitglieder?.length.toString() ?? "0",
            labelBottomRight: item.register ? "Register" : "",
        };
    }
}
