import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Noten } from "src/app/models/Noten";
import { PermissionKey } from "src/app/models/User";
import { AppConfigService } from "src/app/services/app-config.service";
import { UserService } from "src/app/services/authentication/user.service";
import { NotenListConfig } from "src/app/utilities/_list-configurations/noten-list-config.class";
import { NotenListDatasource } from "src/app/utilities/_list-datasources/noten-list-datasource.class";
import { MkjToolbarService } from "src/app/utilities/mkj-toolbar/mkj-toolbar.service";

@Component({
    selector: "app-noten-overview",
    templateUrl: "./noten-overview.component.html",
    styleUrls: ["./noten-overview.component.scss"],
    providers: [NotenListDatasource, NotenListConfig],
})
export class NotenOverviewComponent {
    public readonly PermissionMap = PermissionKey;

    constructor(
        public datasource: NotenListDatasource,
        public listConfig: NotenListConfig,
        private toolbarService: MkjToolbarService,
        private router: Router,
        private route: ActivatedRoute,
        private namingService: AppConfigService,
        private userService: UserService
    ) {
        this.toolbarService.header = this.namingService.uiNaming.Noten;
        this.toolbarService.buttons = [
            {
                icon: "pi pi-plus",
                label: "Neu",
                permissions: [PermissionKey.NOTEN_SAVE],
                click: () => this.navigateToEditView(),
            },
        ];
    }

    public navigateToEditView(noten?: Noten) {
        if (!this.userService.hasPermission(PermissionKey.NOTEN_SAVE)) {
            return;
        }
        this.router.navigate([noten?.id ?? "new"], { relativeTo: this.route });
    }
}
