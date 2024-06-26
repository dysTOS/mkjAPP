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
} from '@angular/core';
import { LazyLoadEvent, TableState } from 'primeng/api';
import { Table } from 'primeng/table';
import { Observable, of } from 'rxjs';
import { GetListInput, GetListOutput } from 'src/app/interfaces/api-middleware';
import { InfoService } from 'src/app/services/info.service';
import { ListConfiguration } from '../_list-configurations/_list-configuration.class';
import { AbstractListDatasource } from '../_list-datasources/_abstract-list-datasource.class';
import { MkjListHelper } from './mkj-list-helper.class';

@Component({
  selector: 'mkj-list',
  templateUrl: './mkj-list.component.html',
  styleUrls: ['./mkj-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MkjListComponent<T> implements OnChanges {
  @ViewChild('table', { static: true })
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

  private _lastListInput: GetListInput<T>;

  constructor(private infoService: InfoService) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.datasource || changes.configuration) {
      this.setInitialFilter();
      this.selectedRow = null;
      if (!this.configuration?.lazyLoad) {
        this.loadData();
      }
    }
  }

  public onStateRestore(event: TableState): void {
    // console.log(event);
    // event.selection = null;
    // event.expandedRowKeys = null;
  }

  public onRowReordered(rowIndex: number, direction: 1 | -1): void {
    const fromIndex = rowIndex;
    let toIndex = rowIndex + direction;
    if (toIndex < 0) {
      toIndex = this.values.length - 1;
    }
    if (toIndex >= this.values.length) {
      toIndex = 0;
    }
    const values = [...this.values];
    values.splice(toIndex, 0, values.splice(fromIndex, 1)[0]);
    this.values = [...values];
    this.table.clear();
    this.onRowReorder.emit(this.values);
  }

  public loadData(event?: LazyLoadEvent): void {
    this.loading$.set(true);
    const input = MkjListHelper.getListInput<T>(event, this.configuration.globalFilter, this.pageSize);
    this._lastListInput = input;
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

  public getFullFilteredData(listInput?: GetListInput<T>): Observable<GetListOutput<T>> {
    const input = listInput ?? this._lastListInput;
    if (input == null) return of(null);

    input.skip = null;
    input.take = null;
    return this.datasource.getList(input);
  }

  public getLastListInput(): GetListInput<T> {
    return this._lastListInput;
  }

  private setInitialFilter(): void {
    const sessionState = JSON.parse(sessionStorage.getItem(this.configuration.listName + '-list')) as TableState;
    if (
      this.configuration.initialFilter &&
      sessionState != null &&
      MkjListHelper.hasSetFilters(sessionState) === false
    ) {
      sessionState.filters = this.configuration.initialFilter || {};
      sessionStorage.setItem(this.configuration.listName + '-list', JSON.stringify(sessionState));
    }
  }
}
