import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GetListInput, GetListOutput } from "src/app/interfaces/api-middleware";
import { Mitglied } from "src/app/models/Mitglied";
import { MitgliederApiService } from "src/app/services/api/mitglieder-api.service";
import { TileValue } from "../mkj-tile-view/mkj-tile-view.component";
import { AbstractListDatasource } from "./_abstract-list-datasource.class";

@Injectable()
export class MitgliederListDatasource extends AbstractListDatasource<Mitglied> {
    constructor(private apiService: MitgliederApiService) {
        super();
    }

    public getList(
        input?: GetListInput<Mitglied>
    ): Observable<GetListOutput<Mitglied>> {
        return this.apiService.getList(input);
    }

    public mapToTileValue(item: Mitglied): TileValue<Mitglied> {
        throw new Error("Method not implemented.");
    }
}
