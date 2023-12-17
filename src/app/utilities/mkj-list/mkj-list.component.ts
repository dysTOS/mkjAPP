import {
    Component,
    Input,
    OnInit,
    TemplateRef,
    ViewChild,
    signal,
} from "@angular/core";
import { InfoService } from "src/app/services/info.service";
import { ListConfiguration } from "../_list-configurations/_list-configuration.class";
import { AbstractListDatasource } from "../_list-datasources/_abstract-list-datasource.class";
import { Table } from "primeng/table";

@Component({
    selector: "mkj-list",
    templateUrl: "./mkj-list.component.html",
    styleUrls: ["./mkj-list.component.scss"],
})
export class MkjListComponent<T> implements OnInit {
    @ViewChild("defaultTemplate", { static: true })
    public table: Table;

    @Input()
    public datasource: AbstractListDatasource<T>;

    @Input()
    public configuration: ListConfiguration<T>;

    @Input()
    public templateMap: { [key: string]: TemplateRef<any> };

    public readonly loading$ = signal<boolean>(false);

    public values: T[] = [];
    public totalCount: number = 0;
    public selectedRow: T;

    constructor(private infoService: InfoService) {}

    public ngOnInit(): void {
        this.initialLoad();
    }

    private initialLoad(): void {
        this.loading$.set(true);
        this.datasource.getList().subscribe({
            next: (res) => {
                this.values = res.values;
                this.totalCount = res.totalCount;
                this.loading$.set(false);
            },
            error: (err) => {
                this.values = [];
                this.totalCount = 0;
                this.loading$.set(false);
                this.infoService.error(err);
            },
        });
    }
}
