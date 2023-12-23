import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Notenmappe } from "src/app/models/Noten";
import { PermissionMap } from "src/app/models/User";
import { AppConfigService } from "src/app/services/app-config.service";
import { NotenmappeListDatasource } from "src/app/utilities/_list-datasources/notenmappe-list-datasource.class";
import { MkjToolbarService } from "src/app/utilities/mkj-toolbar/mkj-toolbar.service";

@Component({
    selector: "app-notenmappen-overview",
    templateUrl: "./notenmappen-overview.component.html",
    providers: [NotenmappeListDatasource],
})
export class NotenmappenOverviewComponent {
    constructor(
        public datasource: NotenmappeListDatasource,
        private route: ActivatedRoute,
        private router: Router,
        private toolbarService: MkjToolbarService,
        configService: AppConfigService
    ) {
        this.toolbarService.header = configService.appNaming.Notenmappen;
        this.toolbarService.buttons = [
            {
                icon: "pi pi-plus",
                click: () => this.navigateToNotenmappe(),
                label: "Neue Mappe",
                permissions: [PermissionMap.NOTENMAPPE_SAVE],
            },
        ];
    }

    public navigateToNotenmappe(notenmappe?: Notenmappe) {
        this.router.navigate([notenmappe?.id ?? "new"], {
            relativeTo: this.route,
        });
    }
}
