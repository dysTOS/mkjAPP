import { Observable } from "rxjs";
import { GetListOutput } from "src/app/interfaces/api-middleware";
import { TileValue } from "../mkj-tile-view/mkj-tile-view.component";

export abstract class AbstractListDatasource<T> {
    public abstract getList(): Observable<GetListOutput<T>>;
    public abstract mapToTileValue(item: T): TileValue<T>;
}
