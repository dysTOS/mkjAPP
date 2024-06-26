import { Component } from "@angular/core";
import {
    MkjAppChangeLog,
    MkjAppVersion,
} from "src/configurations/changeLogVersion";
import { MkjToolbarService } from "src/app/utilities/mkj-toolbar/mkj-toolbar.service";

@Component({
    selector: "mkj-change-logs",
    templateUrl: "./change-logs.component.html",
})
export class MkjChangeLogsComponent {
    public readonly version = MkjAppVersion;
    public readonly logs = MkjAppChangeLog;

    constructor(toolbarService: MkjToolbarService) {
        toolbarService.header = "Changelog";
        toolbarService.backButton = true;
    }
}
