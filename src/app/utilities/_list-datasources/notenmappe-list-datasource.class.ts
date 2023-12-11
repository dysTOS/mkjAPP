import { Notenmappe } from "src/app/models/Noten";
import { AbstractListDatasource } from "./_abstract-list-datasource.class";
import { Injectable } from "@angular/core";
import { GetListOutput } from "src/app/interfaces/api-middleware";
import { Observable } from "rxjs";
import { NotenmappenApiService } from "src/app/services/api/notenmappen-api.service";
import { TileValue } from "../mkj-tile-view/mkj-tile-view.component";

@Injectable()
export class NotenmappeListDatasource extends AbstractListDatasource<Notenmappe> {
    constructor(private apiService: NotenmappenApiService) {
        super();
    }

    public getList(): Observable<GetListOutput<Notenmappe>> {
        return this.apiService.getList(null);
    }

    public mapToTileValue(item: Notenmappe): TileValue<Notenmappe> {
        return {
            label: item.name,
            value: item,
            color: item.color,
            labelBottomLeft: item.noten?.length.toString() ?? "0",
            labelBottomRight: item.hatVerzeichnis ? "Verzeichnis" : "",
        };
    }
}
