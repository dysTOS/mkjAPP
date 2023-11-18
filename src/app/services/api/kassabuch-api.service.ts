import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Kassabuch } from "src/app/models/Kassabuch";
import { AbstractCrudApiService } from "./_abstract-crud-api-service";

@Injectable({
    providedIn: "root",
})
export class KassabuchApiService extends AbstractCrudApiService<Kassabuch> {
    protected controllerApiUrlKey: string = "kassabuch";

    constructor(http: HttpClient) {
        super(http);
    }
}
