import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Instrument } from "src/app/models/Instrument";
import { PermissionMap } from "src/app/models/User";
import { MkjToolbarService } from "src/app/utilities/mkj-toolbar/mkj-toolbar.service";
import { AppConfigService } from "src/app/services/app-config.service";
import { InstrumenteApiService } from "src/app/services/api/instrumente-api.service";

@Component({
    selector: "app-instrumente-overview",
    templateUrl: "./instrumente-overview.component.html",
    styleUrls: ["./instrumente-overview.component.scss"],
})
export class InstrumenteOverviewComponent implements OnInit {
    public values: Instrument[];
    public readonly PermissionMap = PermissionMap;

    constructor(
        private toolbarService: MkjToolbarService,
        private apiService: InstrumenteApiService,
        private router: Router,
        private route: ActivatedRoute,
        configService: AppConfigService
    ) {
        this.toolbarService.header = configService.appNaming.Instrumente;
        this.toolbarService.backButton = null;
        this.toolbarService.buttons = [
            {
                icon: "pi pi-plus",
                label: "Neu",
                permissions: [PermissionMap.INSTRUMENTE_SAVE],
                click: () => {
                    this.router.navigate(["new"], { relativeTo: this.route });
                },
            },
        ];
    }

    public ngOnInit(): void {
        this.apiService.getList(null).subscribe((data) => {
            this.values = data.values;
        });
    }

    public navigateEditor(instrument: Instrument): void {
        this.router.navigate([instrument.id], { relativeTo: this.route });
    }
}
