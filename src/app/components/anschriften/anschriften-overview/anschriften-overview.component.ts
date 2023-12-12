import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Anschrift } from "src/app/models/Anschrift";
import { PermissionMap } from "src/app/models/User";
import { AnschriftenApiService } from "src/app/services/api/anschriften-api.service";
import { MkjToolbarService } from "src/app/utilities/mkj-toolbar/mkj-toolbar.service";

@Component({
    selector: "app-anschriften-overview",
    templateUrl: "./anschriften-overview.component.html",
    styleUrl: "./anschriften-overview.component.scss",
})
export class AnschriftenOverviewComponent {
    public adressen: Anschrift[];

    constructor(
        private apiService: AnschriftenApiService,
        private toolbarService: MkjToolbarService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        apiService.getList().subscribe((list) => {
            this.adressen = list.values;
        });
        toolbarService.header = "Adressen";
        toolbarService.buttons = [
            {
                icon: "pi pi-plus",
                routerLink: "/new",
                click: () =>
                    this.router.navigate(["new"], {
                        relativeTo: this.route,
                    }),
                permissions: [PermissionMap.ANSCHRIFTEN_SAVE],
            },
        ];
    }
}
