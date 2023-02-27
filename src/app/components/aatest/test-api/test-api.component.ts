import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { StandardHttpOptions } from "src/app/interfaces/api-middleware";
import { UserService } from "src/app/services/authentication/user.service";
import { InfoService } from "src/app/services/info.service";
import { environment } from "src/environments/environment";

@Component({
    selector: "test-api-component",
    template: `
        <p-tabView>
            <p-tabPanel header="GET">
                <div class="card">
                    <button
                        pButton
                        label="TEST GET"
                        (click)="testGet()"
                    ></button>
                </div>
                <div class="card">{{ testGetResponse | json }}</div>
            </p-tabPanel>
            <p-tabPanel header="POST">
                <div class="card">
                    <button
                        pButton
                        label="TEST Post"
                        (click)="testPost()"
                    ></button>
                </div>
                <div class="card">{{ testPostResponse | json }}</div>
            </p-tabPanel>
        </p-tabView>
    `,
})
export class TestApiComponent {
    public testGetResponse: any;
    public testPostResponse: any;
    public testPutResponse: any;
    public testDeleteResponse: any;

    constructor(
        private http: HttpClient,
        private infoService: InfoService,
        private userService: UserService
    ) {}

    public testGet() {
        this.http
            .get(environment.apiUrl + "test", StandardHttpOptions)
            .subscribe({
                next: (res) => {
                    this.testGetResponse = res;
                },
                error: (err) => this.infoService.error(err),
            });
    }

    public testPost() {
        this.http
            .post(
                environment.apiUrl + "test",
                {
                    id: null,
                    name: "Musi-Eisstockschießen - gruppe",
                    beschreibung: null,
                    oeffentlich: 0,
                    infoMusiker: null,
                    ort: null,
                    treffzeit: null,
                    kategorie: "sonstige",
                    status: "fixiert",
                    vonDatum: "2023-02-04",
                    bisDatum: "2023-02-04",
                    vonZeit: null,
                    bisZeit: null,
                    gruppe_id: "91cf872d-d0ca-45ad-872a-f9ce86f90f5b",
                    created_at: "2023-02-01T21:21:35.000000Z",
                    updated_at: "2023-02-06T20:39:07.000000Z",
                    gruppe: {
                        id: "91cf872d-d0ca-45ad-872a-f9ce86f90f5b",
                        name: "Flügelhörners",
                        gruppenleiter_mitglied_id:
                            "c42bd1f0-c87d-11ec-953d-6805ca938b9a",
                        color: "#6ac92a",
                        created_at: "2022-12-31T21:06:18.000000Z",
                        updated_at: "2023-01-30T20:13:53.000000Z",
                    },
                },
                StandardHttpOptions
            )
            .subscribe({
                next: (res) => {
                    this.testPostResponse = res;
                },
                error: (err) => this.infoService.error(err),
            });
    }
}
