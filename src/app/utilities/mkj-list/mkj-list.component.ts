import {
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
import { FilterMetadata, LazyLoadEvent } from "primeng/api";
import { Table, TableRowReorderEvent } from "primeng/table";
import {
    GetListInput,
    MkjListInputFilter,
} from "src/app/interfaces/api-middleware";
import { InfoService } from "src/app/services/info.service";
import { ListConfiguration } from "../_list-configurations/_list-configuration.class";
import { AbstractListDatasource } from "../_list-datasources/_abstract-list-datasource.class";

@Component({
    selector: "mkj-list",
    templateUrl: "./mkj-list.component.html",
    styleUrls: ["./mkj-list.component.scss"],
})
export class MkjListComponent<T> implements OnChanges {
    @ViewChild("defaultTemplate", { static: true })
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
        const input = this.mapLazyLoadEvent(event);
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

    private mapLazyLoadEvent(event: LazyLoadEvent): GetListInput<T> {
        const result: GetListInput = {
            skip: event.first ?? 0,
            take: event.rows ?? this.pageSize,
        };
        if (event.sortField) {
            result.sort = {
                field: event.sortField,
                order: event.sortOrder === 1 ? "asc" : "desc",
            };
        }
        if (event.globalFilter && this.configuration.globalFilter) {
            result.globalFilter = {
                fields: this.configuration.globalFilter?.fields,
                value: event.globalFilter,
            };
        }

        const filters = this.getFilters(event.filters);
        result.filterAnd = filters;

        return result;
    }

    private getFilters(filters: {
        [key: string]: FilterMetadata;
    }): MkjListInputFilter<T>[] {
        const result: MkjListInputFilter<T>[] = [];
        Object.entries(filters).forEach(([key, value]) => {
            if (key === "global") return;
            const getFilter = (f: any): MkjListInputFilter<T> => {
                return {
                    field: key as keyof T,
                    value: f.value,
                    operator: f.matchMode === "contains" ? "LIKE" : "=",
                };
            };
            if (Array.isArray(value)) {
                (value as Array<any>).forEach((v) => {
                    const filter = getFilter(v);
                    if (filter.value) {
                        result.push(filter);
                    }
                });
            } else if (value.value) {
                result.push(getFilter(value));
            }
        });

        return result;
    }
}
