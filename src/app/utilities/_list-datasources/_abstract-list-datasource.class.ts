import { Observable } from "rxjs";
import {
    GetListInput,
    GetListOutput,
    MkjListInputFilter,
} from "src/app/interfaces/api-middleware";
import { TileValue } from "../mkj-tile-view/mkj-tile-view.component";

export abstract class AbstractListDatasource<T> {
    protected preFilter: MkjListInputFilter<T>;

    public abstract getList(
        input?: GetListInput<T>
    ): Observable<GetListOutput<T>>;
    public abstract getById(id: string): Observable<T>;
    public abstract mapToTileValue(item: T): TileValue<T>;
}
