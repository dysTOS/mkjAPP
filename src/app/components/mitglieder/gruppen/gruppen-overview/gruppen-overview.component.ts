import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Gruppe } from "src/app/models/Gruppe";
import { Mitglied } from "src/app/models/Mitglied";
import { PermissionMap } from "src/app/models/User";
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
    public gruppen: Gruppe[];
    public mitglieder: Mitglied[];

    public gruppenLoading: boolean = false;
    public mitgliederLoading: boolean = false;

    constructor(
        public datasource: GruppeListDatasource,
        private toolbarService: MkjToolbarService,
        private router: Router,
        private route: ActivatedRoute,
        configService: AppConfigService
    ) {
        this.toolbarService.header = configService.appNaming.Gruppen;
        this.toolbarService.backButton = null;
        this.toolbarService.buttons = [
            {
                label: "Neue Gruppe",
                icon: "pi pi-plus",
                permissions: [PermissionMap.GRUPPEN_SAVE],
                click: () => this.newGruppe(),
            },
        ];
    }

    public navigateDetails(gruppe: Gruppe) {
        this.router.navigate([gruppe.id], { relativeTo: this.route });
    }

    public newGruppe() {
        this.router.navigate(["neu"], { relativeTo: this.route });
    }
}
