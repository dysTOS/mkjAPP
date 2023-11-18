import { Observable } from "rxjs";
import { GetCollectionApiCallOutput } from "src/app/interfaces/api-middleware";
import { TileValue } from "../mkj-tile-view/mkj-tile-view.component";

export interface ListDatasource<T> {
    getList(): Observable<GetCollectionApiCallOutput<T>>;
    mapToTileValue?(item: T): TileValue<T>;
}

export abstract class AbstractListDatasource<T> implements ListDatasource<T> {
    public abstract getList(): Observable<GetCollectionApiCallOutput<T>>;
}
