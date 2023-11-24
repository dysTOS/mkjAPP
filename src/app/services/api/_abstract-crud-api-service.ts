import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {
    GetCollectionApiCallInput,
    GetCollectionApiCallOutput,
    StandardHttpOptions,
} from "src/app/interfaces/api-middleware";
import { environment } from "src/environments/environment";

export abstract class AbstractCrudApiService<T> {
    private _baseApiUrl = environment.apiUrl;

    protected abstract controllerApiUrlKey: string;

    constructor(private http: HttpClient) {}

    public getList(
        input?: GetCollectionApiCallInput
    ): Observable<GetCollectionApiCallOutput<T>> {
        return this.http.post<GetCollectionApiCallOutput<T>>(
            this._baseApiUrl + this.controllerApiUrlKey + "/list",
            input,
            StandardHttpOptions
        );
    }

    public getById(id: string): Observable<T> {
        return this.http.get<T>(
            this._baseApiUrl + this.controllerApiUrlKey + "/" + id,
            StandardHttpOptions
        );
    }

    public create(entity: T): Observable<T> {
        return this.http.post<T>(
            this._baseApiUrl + this.controllerApiUrlKey,
            entity,
            StandardHttpOptions
        );
    }

    public update(entity: T): Observable<T> {
        const id = (entity as any).id;
        return this.http.put<T>(
            this._baseApiUrl + this.controllerApiUrlKey + `/${id}`,
            entity,
            StandardHttpOptions
        );
    }

    public delete(id: string): Observable<T> {
        return this.http.delete<T>(
            this._baseApiUrl + this.controllerApiUrlKey + `/${id}`,
            StandardHttpOptions
        );
    }
}
