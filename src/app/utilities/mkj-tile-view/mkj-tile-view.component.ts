import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { InfoService } from "src/app/services/info.service";
import { ListDatasource } from "../_list-datasources/_abstract-list-datasource.class";

export interface TileValue<T> {
    label: string;
    value: T;
    color?: string;
    labelBottomLeft?: string;
    labelBottomRight?: string;
}

@Component({
    selector: "mkj-tile-view",
    templateUrl: "./mkj-tile-view.component.html",
    styleUrls: ["./mkj-tile-view.component.scss"],
})
export class MkjTileViewComponent<T> implements OnInit {
    @Input()
    public datasource: ListDatasource<T>;

    @Output()
    public clicked = new EventEmitter<T>();

    private _loading = new BehaviorSubject<boolean>(false);
    public readonly loading$ = this._loading.asObservable();

    public values: TileValue<T>[] = [];

    constructor(private infoService: InfoService) {}

    public ngOnInit(): void {
        this.loadData();
    }

    private loadData(): void {
        this._loading.next(true);
        this.datasource.getList().subscribe({
            next: (res) => {
                this.values = res.values
                    .map((item) => this.datasource.mapToTileValue(item))
                    .sort((a, b) => b.color?.localeCompare(a.color));
                this._loading.next(false);
            },
            error: (err) => {
                this.values = [];
                this.infoService.error(err);
                this._loading.next(false);
            },
        });
    }
}
