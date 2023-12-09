import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Kassabuch } from "src/app/models/Kassabuch";
import { PermissionMap } from "src/app/models/User";
import { KassabuchListDatasource } from "src/app/utilities/_list-datasources/kassabuch-list-datasource";
import { MkjToolbarService } from "src/app/utilities/mkj-toolbar/mkj-toolbar.service";

@Component({
    selector: "app-kassabuecher-overview",
    templateUrl: "./kassabuecher-overview.component.html",
    providers: [KassabuchListDatasource],
})
export class KassabuecherComponent {
    constructor(
        public datasource: KassabuchListDatasource,
        private toolbarService: MkjToolbarService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.toolbarService.header = "Kassabücher";
        this.toolbarService.buttons = [
            {
                icon: "pi pi-plus",
                label: "Neu",
                click: () => {
                    this.router.navigate(["../buch/new"], {
                        relativeTo: this.route,
                    });
                },
                permissions: [PermissionMap.KASSABUCH_SAVE],
            },
        ];
    }

    public navigateDetails(buch: Kassabuch): void {
        this.router.navigate(["../details", buch.id], {
            relativeTo: this.route,
        });
    }
}
