import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Table } from "primeng/table";
import { Noten, NotenGattungMap } from "src/app/models/Noten";
import { PermissionMap } from "src/app/models/User";
import { NotenApiService } from "src/app/services/api/noten-api.service";
import { AppConfigService } from "src/app/services/app-config.service";
import { InfoService } from "src/app/services/info.service";
import { MkjToolbarService } from "src/app/utilities/mkj-toolbar/mkj-toolbar.service";

@Component({
    selector: "app-notenarchiv",
    templateUrl: "./notenarchiv.component.html",
    styleUrls: ["./notenarchiv.component.scss"],
})
export class NotenarchivComponent implements OnInit {
    notenArray: Noten[];
    selectedNoten: Noten[];

    loading: boolean = false;

    selectedRow: any;

    public readonly GattungOptionen = NotenGattungMap;
    public readonly PermissionMap = PermissionMap;

    @ViewChild("notenTable")
    notenTable: Table;

    constructor(
        private notenService: NotenApiService,
        private infoService: InfoService,
        private toolbarService: MkjToolbarService,
        private router: Router,
        private route: ActivatedRoute,
        private namingService: AppConfigService
    ) {
        this.toolbarService.header = this.namingService.appNaming.Noten;
        this.toolbarService.backButton = null;
        this.toolbarService.buttons = [
            {
                icon: "pi pi-plus",
                label: "Neu",
                permissions: [PermissionMap.NOTEN_SAVE],
                click: () => this.navigateToEditView(),
            },
        ];
    }

    ngOnInit(): void {
        this.getAllNoten();
    }

    getAllNoten() {
        this.loading = true;
        this.notenService.getList(null).subscribe({
            next: (res) => {
                (this.notenArray = res.values), (this.loading = false);
            },
            error: (err) => {
                this.infoService.error(err), (this.loading = false);
            },
        });
    }

    setFilteredRows(e) {
        this.selectedNoten = e.filteredValue;
    }

    navigateToEditView(noten?: Noten) {
        this.router.navigate([noten?.id ?? "new"], { relativeTo: this.route });
    }
}
