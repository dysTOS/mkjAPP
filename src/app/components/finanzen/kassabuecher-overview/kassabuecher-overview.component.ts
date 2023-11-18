import { Component, OnInit } from "@angular/core";
import { KassabuchListDatasource } from "src/app/utilities/_list-datasources/kassabuch-list-datasource";
import { MkjToolbarService } from "src/app/utilities/mkj-toolbar/mkj-toolbar.service";

@Component({
    selector: "app-kassabuecher-overview",
    templateUrl: "./kassabuecher-overview.component.html",
    providers: [KassabuchListDatasource],
})
export class KassabuecherComponent implements OnInit {
    constructor(
        public datasource: KassabuchListDatasource,
        private toolbarService: MkjToolbarService
    ) {
        this.toolbarService.header = "Kassabücher";
    }

    public ngOnInit(): void {}
}
