import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Gruppe } from "src/app/models/Gruppe";
import { PermissionKey } from "src/app/models/User";
import { AppConfigService } from "src/app/services/app-config.service";
import { GruppeListDatasource } from "src/app/utilities/_list-datasources/gruppe-list-datasource.class";
import { MkjToolbarService } from "src/app/utilities/mkj-toolbar/mkj-toolbar.service";

@Component({
    selector: "gruppen-overview",
    templateUrl: "./gruppen-overview.component.html",
    styleUrls: ["./gruppen-overview.component.scss"],
    providers: [GruppeListDatasource],
})
export class GruppenOverviewComponent {
    constructor(
        public datasource: GruppeListDatasource,
        private toolbarService: MkjToolbarService,
        private router: Router,
        private route: ActivatedRoute,
        configService: AppConfigService
    ) {
        this.toolbarService.header = configService.uiNaming.Gruppen;
        this.toolbarService.buttons = [
            {
                label: "Neue Gruppe",
                icon: "pi pi-plus",
                permissions: [PermissionKey.GRUPPEN_SAVE],
                click: () => this.navigateDetails(),
            },
        ];
    }

    public navigateDetails(gruppe?: Gruppe) {
        this.router.navigate([gruppe?.id ?? "new"], { relativeTo: this.route });
    }
}
