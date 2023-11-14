import { Injectable } from "@angular/core";
import { AbstractCrudApiService } from "./_abstract-crud-api-service";
import { Anschrift } from "src/app/models/Anschrift";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root",
})
export class AnschriftenApiService extends AbstractCrudApiService<Anschrift> {
    protected controllerApiUrlKey: string = "anschrift";

    constructor(http: HttpClient) {
        super(http);
    }
}
