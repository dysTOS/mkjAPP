import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    signal,
} from "@angular/core";
import { LazyLoadEvent, TableState } from "primeng/api";
import { Table, TableRowReorderEvent } from "primeng/table";
import { InfoService } from "src/app/services/info.service";
import { ListConfiguration } from "../_list-configurations/_list-configuration.class";
import { AbstractListDatasource } from "../_list-datasources/_abstract-list-datasource.class";
import { MkjListHelper } from "./mkj-list-helper.class";

@Component({
    selector: "mkj-list",
    templateUrl: "./mkj-list.component.html",
    styleUrls: ["./mkj-list.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MkjListComponent<T> implements OnChanges {
    @ViewChild("table", { static: true })
    public table: Table;

    @Input()
    public datasource: AbstractListDatasource<T>;
    @Input()
    public configuration: ListConfiguration<T>;
    @Input()
    public templateMap: { [key: string]: TemplateRef<any> };
    @Input()
    public rowReorder: boolean = false;
    @Input()
    public disabled: boolean = false;

    @Output()
    public onSelectionChange: EventEmitter<T> = new EventEmitter<T>();
    @Output()
    public onDoubleClick: EventEmitter<T> = new EventEmitter<T>();
    @Output()
    public onRowReorder: EventEmitter<T[]> = new EventEmitter<T[]>();

    public readonly loading$ = signal<boolean>(false);

    public readonly pageSize = 25;

    public values: T[] = [];
    public totalCount: number = 0;
    public selectedRow: T;

    constructor(private infoService: InfoService) {}

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.datasource || changes.configuration) {
            this.selectedRow = null;
            if (!this.configuration?.lazyLoad) {
                this.eagerLoad();
            }
        }
    }

    public onStateRestore(event: TableState): void {
        // console.log(event);
        if (
            this.configuration.initialFilter
            // &&
            // MkjListHelper.hasSetFilters(event) === false
        ) {
            Object.entries(this.configuration.initialFilter).forEach(
                ([key, value]) => {
                    this.table.filter(value.value, key, value.matchMode);
                }
            );
        }
        // event.selection = null;
        // event.expandedRowKeys = null;
    }

    public onRowReordered(event: TableRowReorderEvent): void {
        const fromIndex = event.dragIndex;
        const toIndex = event.dropIndex;
        if (fromIndex === toIndex) {
            return;
        }
        const values = [...this.values];
        values.splice(toIndex, 0, values.splice(fromIndex, 1)[0]);
        this.onRowReorder.emit(values);
    }

    public onLazyLoad(event: LazyLoadEvent): void {
        this.loading$.set(true);
        const input = MkjListHelper.getListInput<T>(
            event,
            this.configuration.globalFilter,
            this.pageSize
        );
        this.datasource.getList(input).subscribe({
            next: (res) => {
                this.values = [...res.values];
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

    private eagerLoad(): void {
        this.loading$.set(true);
        this.datasource.getList().subscribe({
            next: (res) => {
                this.values = [...res.values];
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
