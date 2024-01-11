import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Mitglied } from "src/app/models/Mitglied";
import { PermissionMap } from "src/app/models/User";
import { AppConfigService } from "src/app/services/app-config.service";
import { UserService } from "src/app/services/authentication/user.service";
import { MitgliederListConfig } from "src/app/utilities/_list-configurations/mitglieder-list-config.class";
import { MitgliederListDatasource } from "src/app/utilities/_list-datasources/mitglieder-list-datasource.class";
import { MkjToolbarService } from "src/app/utilities/mkj-toolbar/mkj-toolbar.service";

@Component({
    selector: "app-mitglieder-overview",
    templateUrl: "./mitglieder-overview.component.html",
    styleUrls: ["./mitglieder-overview.component.scss"],
    providers: [MitgliederListDatasource, MitgliederListConfig],
})
export class MitgliederOverviewComponent {
    public readonly PermissionMap = PermissionMap;

    constructor(
        public datasource: MitgliederListDatasource,
        public listConfig: MitgliederListConfig,
        private router: Router,
        private route: ActivatedRoute,
        private toolbarService: MkjToolbarService,
        private userService: UserService,
        appconfig: AppConfigService
    ) {
        this.toolbarService.header = appconfig.appNaming.Mitglieder;
        this.toolbarService.buttons = [
            {
                icon: "pi pi-plus",
                click: () => this.navigateSingleMitglied(),
                label: "Neu",
                permissions: [PermissionMap.MITGLIEDER_SAVE],
            },
        ];
    }

    public navigateSingleMitglied(mitglied?: Mitglied) {
        if (this.userService.hasPermissionNot(PermissionMap.MITGLIEDER_SAVE))
            return;
        this.router.navigate(["../" + (mitglied?.id ?? "new")], {
            relativeTo: this.route,
        });
    }
}
