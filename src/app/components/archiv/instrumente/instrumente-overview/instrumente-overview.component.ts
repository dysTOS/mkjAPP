import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Instrument } from "src/app/models/Instrument";
import { PermissionMap } from "src/app/models/User";
import { AppConfigService } from "src/app/services/app-config.service";
import { UserService } from "src/app/services/authentication/user.service";
import { InstrumenteListConfig } from "src/app/utilities/_list-configurations/instrumente-list-config.class";
import { InstrumenteListDatasource } from "src/app/utilities/_list-datasources/instrumente-list-datasource.class";
import { MkjToolbarService } from "src/app/utilities/mkj-toolbar/mkj-toolbar.service";

@Component({
    selector: "app-instrumente-overview",
    templateUrl: "./instrumente-overview.component.html",
    styleUrls: ["./instrumente-overview.component.scss"],
    providers: [InstrumenteListDatasource, InstrumenteListConfig],
})
export class InstrumenteOverviewComponent {
    constructor(
        public datasource: InstrumenteListDatasource,
        public listConfig: InstrumenteListConfig,
        private router: Router,
        private route: ActivatedRoute,
        private userService: UserService,
        toolbarService: MkjToolbarService,
        configService: AppConfigService
    ) {
        toolbarService.header = configService.appNaming.Instrumente;
        toolbarService.buttons = [
            {
                icon: "pi pi-plus",
                label: "Neu",
                permissions: [PermissionMap.INSTRUMENTE_SAVE],
                click: () => this.navigateEditor(),
            },
        ];
    }

    public navigateEditor(instrument?: Instrument): void {
        if (!this.userService.hasPermission(PermissionMap.INSTRUMENTE_SAVE))
            return;
        this.router.navigate([instrument?.id ?? "new"], {
            relativeTo: this.route,
        });
    }
}
