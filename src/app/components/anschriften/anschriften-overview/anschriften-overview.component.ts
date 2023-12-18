import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Anschrift } from "src/app/models/Anschrift";
import { PermissionMap } from "src/app/models/User";
import { UserService } from "src/app/services/authentication/user.service";
import { AnschriftenListConfig } from "src/app/utilities/_list-configurations/anschriften-list-config.class";
import { AnschriftenListDatasource } from "src/app/utilities/_list-datasources/anschriften-list-datasource.class";
import { MkjToolbarService } from "src/app/utilities/mkj-toolbar/mkj-toolbar.service";

@Component({
    selector: "app-anschriften-overview",
    templateUrl: "./anschriften-overview.component.html",
    styleUrl: "./anschriften-overview.component.scss",
    providers: [AnschriftenListConfig, AnschriftenListDatasource],
})
export class AnschriftenOverviewComponent {
    constructor(
        public datasource: AnschriftenListDatasource,
        public listConfig: AnschriftenListConfig,
        toolbarService: MkjToolbarService,
        private router: Router,
        private route: ActivatedRoute,
        private userServie: UserService
    ) {
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

    public navigateToEdit(item: Anschrift): void {
        if (this.userServie.hasPermission(PermissionMap.ANSCHRIFTEN_SAVE)) {
            this.router.navigate([item.id], {
                relativeTo: this.route,
            });
        }
    }
}
