import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Instrument } from "src/app/models/Instrument";
import { PermissionKey } from "src/app/models/User";
import { ConfigurationService } from "src/app/services/configuration.service";
import { UserService } from "src/app/services/authentication/user.service";
import { InstrumenteListConfig } from "src/app/utilities/_list-configurations/instrumente-list-config.class";
import { InstrumenteListDatasource } from "src/app/utilities/_list-datasources/instrumente-list-datasource.class";
import { MkjToolbarService } from "src/app/utilities/mkj-toolbar/mkj-toolbar.service";
import { displayModel } from "src/app/providers/display-model";
import { InstrumentDisplayModel } from "src/app/utilities/_display-model-configurations/instrument-display-model.class";

@Component({
    selector: "app-instrumente-overview",
    templateUrl: "./instrumente-overview.component.html",
    styleUrls: ["./instrumente-overview.component.scss"],
    providers: [
        InstrumenteListDatasource,
        InstrumenteListConfig,
        displayModel(InstrumentDisplayModel),
    ],
})
export class InstrumenteOverviewComponent {
    public readonly PermissionMap = PermissionKey;

    constructor(
        public datasource: InstrumenteListDatasource,
        public listConfig: InstrumenteListConfig,
        private router: Router,
        private route: ActivatedRoute,
        private userService: UserService,
        toolbarService: MkjToolbarService,
        configService: ConfigurationService
    ) {
        toolbarService.header = configService.uiNaming.Instrumente;
        toolbarService.buttons = [
            {
                icon: "pi pi-plus",
                label: "Neu",
                permissions: [PermissionKey.INSTRUMENTE_SAVE],
                click: () => this.navigateEditor(),
            },
        ];
    }

    public navigateEditor(instrument?: Instrument): void {
        if (!this.userService.hasPermission(PermissionKey.INSTRUMENTE_SAVE))
            return;
        this.router.navigate([instrument?.id ?? "new"], {
            relativeTo: this.route,
        });
    }
}
