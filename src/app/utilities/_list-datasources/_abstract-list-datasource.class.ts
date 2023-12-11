import { Observable } from "rxjs";
import { GetListOutput } from "src/app/interfaces/api-middleware";
import { TileValue } from "../mkj-tile-view/mkj-tile-view.component";

export interface ListDatasource<T> {
    getList(): Observable<GetListOutput<T>>;
    mapToTileValue?(item: T): TileValue<T>;
}

export abstract class AbstractListDatasource<T> implements ListDatasource<T> {
    public abstract getList(): Observable<GetListOutput<T>>;
}
