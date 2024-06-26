import { Component, Input, TemplateRef } from "@angular/core";
import { MkjListColumn } from "../../_list-configurations/_list-configuration.class";

@Component({
    selector: "mkj-list-cell",
    templateUrl: "./mkj-list-cell.component.html",
    styleUrl: "./mkj-list-cell.component.scss",
})
export class MkjListCellComponent<T> {
    @Input({ required: true })
    public value: T;

    @Input({ required: true })
    public colConfig: MkjListColumn<T>;

    @Input()
    public templateMap: { [key: string]: TemplateRef<any> };
}
