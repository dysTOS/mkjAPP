import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Anschrift } from "src/app/models/Anschrift";
import { PermissionKey } from "src/app/models/User";
import { displayModel } from "src/app/providers/display-model";
import { UserService } from "src/app/services/authentication/user.service";
import { AnschriftDisplayModel } from "src/app/utilities/_display-model-configurations/anschrift-display-model.class";
import { AnschriftenListConfig } from "src/app/utilities/_list-configurations/anschriften-list-config.class";
import { AnschriftenListDatasource } from "src/app/utilities/_list-datasources/anschriften-list-datasource.class";
import { MkjToolbarService } from "src/app/utilities/mkj-toolbar/mkj-toolbar.service";

@Component({
    selector: "app-anschriften-overview",
    templateUrl: "./anschriften-overview.component.html",
    styleUrl: "./anschriften-overview.component.scss",
    providers: [
        AnschriftenListConfig,
        AnschriftenListDatasource,
        displayModel(AnschriftDisplayModel),
    ],
})
export class AnschriftenOverviewComponent {
    public readonly PermissionMap = PermissionKey;

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
                permissions: [PermissionKey.ANSCHRIFTEN_SAVE],
            },
        ];
    }

    public navigateToEdit(item: Anschrift): void {
        if (this.userServie.hasPermission(PermissionKey.ANSCHRIFTEN_SAVE)) {
            this.router.navigate([item.id], {
                relativeTo: this.route,
            });
        }
    }
}
