import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Instrument } from "src/app/models/Instrument";
import { PermissionMap } from "src/app/models/User";
import { MkjToolbarService } from "src/app/utilities/mkj-toolbar/mkj-toolbar.service";
import { InstrumenteUiService } from "../instrumente-ui.service";

@Component({
    selector: "app-instrumente-overview",
    templateUrl: "./instrumente-overview.component.html",
    styleUrls: ["./instrumente-overview.component.scss"],
})
export class InstrumenteOverviewComponent implements OnInit {
    public values: Instrument[];
    public readonly PermissionMap = PermissionMap;

    constructor(
        public uiService: InstrumenteUiService,
        private toolbarService: MkjToolbarService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.toolbarService.header = "Instrumente";
        this.toolbarService.backButton = null;
        this.toolbarService.buttons = [
            {
                icon: "pi pi-plus",
                label: "Neu",
                permissions: [PermissionMap.INSTRUMENTE_SAVE],
                click: () => {
                    this.router.navigate(["neu"], { relativeTo: this.route });
                },
            },
        ];
    }

    public ngOnInit(): void {
        this.uiService.getAllInstrumente().subscribe((data) => {
            this.values = data;
        });
    }

    public navigateEditor(instrument: Instrument): void {
        this.uiService.editInstrument = instrument;
        this.router.navigate([instrument.id], { relativeTo: this.route });
    }
}
