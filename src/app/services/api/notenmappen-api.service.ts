import { Injectable } from "@angular/core";
import { AbstractCrudApiService } from "./_abstract-crud-api-service";
import { Noten, Notenmappe } from "src/app/models/Noten";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { StandardHttpOptions } from "src/app/interfaces/api-middleware";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class NotenmappenApiService extends AbstractCrudApiService<Notenmappe> {
    protected controllerApiUrlKey: string = "notenmappe";

    constructor(private httpClient: HttpClient) {
        super(httpClient);
    }

    public getNotenOfMappe(mappeId: string): Observable<Noten[]> {
        const url =
            environment.apiUrl + this.controllerApiUrlKey + "/noten/" + mappeId;
        return this.httpClient.get<Noten[]>(url, StandardHttpOptions);
    }

    public syncNoten(mappeId: string, noten: Noten[]): Observable<void> {
        const url = environment.apiUrl + this.controllerApiUrlKey + "/noten";
        const input = {
            collectionId: mappeId,
            values: noten,
        };
        return this.httpClient.post<void>(url, input, StandardHttpOptions);
    }

    public attachNotenToMappe(
        notenId: string,
        mappeId: string,
        verzeichnisNr: string = null
    ): Observable<any> {
        const url = environment.apiUrl + this.controllerApiUrlKey + "/attach";
        return this.httpClient.post<any>(
            url,
            {
                noten_id: notenId,
                mappe_id: mappeId,
                verzeichnisNr: verzeichnisNr,
            },
            StandardHttpOptions
        );
    }

    public detachNotenFromMappe(
        notenId: string,
        mappeId: string
    ): Observable<any> {
        const url = environment.apiUrl + this.controllerApiUrlKey + "/detach";
        return this.httpClient.post<any>(
            url,
            { noten_id: notenId, mappe_id: mappeId },
            StandardHttpOptions
        );
    }
}
