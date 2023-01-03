import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { StandardHttpOptions } from "src/app/interfaces/api-middleware";
import { UserService } from "src/app/services/authentication/user.service";
import { InfoService } from "src/app/services/info.service";
import { environment } from "src/environments/environment";

@Component({
    selector: "test-api-component",
    template: `
        <div class="card">
            <button pButton label="TEST GET" (click)="testGet()"></button>
        </div>
        <div class="card">{{ testGetResponse | json }}</div>
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
}
