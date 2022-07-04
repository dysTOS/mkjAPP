import { Component, OnInit } from "@angular/core";
import { FileService } from "src/app/mkjServices/file.service";
import * as FileSaver from "file-saver";
import { NotenService } from "src/app/mkjServices/noten.service";
import { PushNotificationsService } from "src/app/mkjServices/push-notifications.service";

@Component({
    selector: "app-aatest",
    templateUrl: "./aatest.component.html",
    styleUrls: ["./aatest.component.scss"],
})
export class AatestComponent implements OnInit {
    constructor(
        private fileService: FileService,
        private notenService: NotenService,
        private pushService: PushNotificationsService
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
}
