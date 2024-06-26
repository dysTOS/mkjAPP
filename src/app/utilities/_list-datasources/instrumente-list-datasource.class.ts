import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GetListInput, GetListOutput } from "src/app/interfaces/api-middleware";
import { Instrument } from "src/app/models/Instrument";
import { InstrumenteApiService } from "src/app/services/api/instrumente-api.service";
import { TileValue } from "../mkj-tile-view/mkj-tile-view.component";
import { AbstractListDatasource } from "./_abstract-list-datasource.class";

@Injectable()
export class InstrumenteListDatasource extends AbstractListDatasource<Instrument> {
    constructor(private apiService: InstrumenteApiService) {
        super();
    }

    public getList(
        input?: GetListInput<Instrument>
    ): Observable<GetListOutput<Instrument>> {
        return this.apiService.getList(input);
    }

    public getById(id: string): Observable<Instrument> {
        return this.apiService.getById(id);
    }

    public mapToTileValue(item: Instrument): TileValue<Instrument> {
        throw new Error("Method not implemented.");
    }
}
