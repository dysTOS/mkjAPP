import { Component, OnInit } from "@angular/core";
import { FileService } from "src/app/mkjServices/file.service";
import * as FileSaver from "file-saver";
import { NotenService } from "src/app/mkjServices/noten.service";

@Component({
    selector: "app-aatest",
    templateUrl: "./aatest.component.html",
    styleUrls: ["./aatest.component.scss"],
})
export class AatestComponent implements OnInit {
    constructor(
        private fileService: FileService,
        private notenService: NotenService
    ) {}

    ngOnInit(): void {}

    public download() {
        this.fileService
            .getAllFiles()
            .subscribe((blob) => FileSaver.saveAs(blob, "archive.png"));
    }

    public notenTest() {
        this.notenService.getNotenmappen().subscribe((res) => console.log(res));
    }
}
