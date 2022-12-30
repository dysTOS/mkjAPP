import { Component, OnInit } from "@angular/core";
import { BugReportsService } from "src/app/services/api/bug-reports.service";
import { MkjToolbarService } from "src/app/utilities/mkj-toolbar/mkj-toolbar.service";

@Component({
    selector: "mkj-bug-report",
    templateUrl: "./bug-report.component.html",
    styleUrls: ["./bug-report.component.scss"],
})
export class BugReportComponent implements OnInit {
    public bugReports: any;

    constructor(
        private reportService: BugReportsService,
        private toolbarService: MkjToolbarService
    ) {
        this.toolbarService.header = "Bug Reports";
        this.toolbarService.buttons = [
            {
                label: "Neuer Bug Report",
                icon: "pi pi-plus",
                click: () => this.add(),
            },
        ];
    }

    public ngOnInit(): void {
        this.initBugReports();
    }

    private initBugReports() {
        this.reportService.getReports().subscribe({
            next: (res) => (this.bugReports = res),
        });
    }

    private add() {
        const report = {
            title: "test",
            mitglied_id: "asdlökfj",
            json: { key: "value" },
        };
        this.reportService.saveReport(report).subscribe();
    }
}
