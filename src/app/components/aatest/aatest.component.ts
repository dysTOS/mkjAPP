import { Component, OnInit } from "@angular/core";
import { FileService } from "src/app/services/file.service";
import * as FileSaver from "file-saver";
import { NotenService } from "src/app/services/noten.service";
import { PushNotificationsService } from "src/app/services/push-notifications.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
    selector: "app-aatest",
    templateUrl: "./aatest.component.html",
    styleUrls: ["./aatest.component.scss"],
})
export class AatestComponent implements OnInit {
    constructor(
        private fileService: FileService,
        private notenService: NotenService,
        public pushService: PushNotificationsService,
        private http: HttpClient
    ) {}

    ngOnInit(): void {}

    public download() {
        this.fileService
            .getAllFiles()
            .subscribe((blob) => FileSaver.saveAs(blob, "archive.png"));
    }

    public push() {
        this.pushService.push().subscribe({
            next: (res) => console.log(res),
            error: (err) => console.log(err),
        });
    }

    public notenTest() {
        this.notenService.getNotenmappen().subscribe((res) => console.log(res));
    }

    public testOCS() {
        const url = "https://cloud.mk-jainzen.at/ocs/v1.php/cloud";
        const creds = window.btoa("admin:gmrmkjrs&1928/3");
        const headers = {
            headers: new HttpHeaders({
                "ocs-apirequest": "true",
                Authorization: creds,
            }),
        };
        this.http.get(url, headers).subscribe({
            next: (res) => console.log(res),
            error: (err) => console.log(err),
        });
    }
}
