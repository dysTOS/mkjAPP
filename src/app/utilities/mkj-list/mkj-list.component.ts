import { Component, Input } from "@angular/core";
import { AbstractListDatasource } from "../_list-datasources/_abstract-list-datasource.class";
import { ListConfiguration } from "../_list-configurations/_list-configuration.class";

@Component({
    selector: "mkj-list",
    templateUrl: "./mkj-list.component.html",
    styleUrls: ["./mkj-list.component.scss"],
})
export class MkjListComponent<T> {
    @Input()
    public datasource: AbstractListDatasource<T>;

    @Input()
    public configuration: ListConfiguration<T>;

    constructor() {}
}
