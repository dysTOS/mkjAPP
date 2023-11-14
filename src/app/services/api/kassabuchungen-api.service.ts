import { Injectable } from "@angular/core";
import { AbstractCrudApiService } from "./_abstract-crud-api-service";
import { Kassabuchung } from "src/app/models/Kassabuchung";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root",
})
export class KassabuchungenApiService extends AbstractCrudApiService<Kassabuchung> {
    protected controllerApiUrlKey: string = "kassabuchung";

    constructor(http: HttpClient) {
        super(http);
    }
}
