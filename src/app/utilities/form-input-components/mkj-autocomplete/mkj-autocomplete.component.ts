import { Component, Injector, Input, TemplateRef } from '@angular/core';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { GetListInput } from 'src/app/interfaces/api-middleware';
import { AutoCompleteConfiguration } from '../../_autocomplete-configurations/_autocomplete-configuration.class';
import { AbstractListDatasource } from '../../_list-datasources/_abstract-list-datasource.class';
import { AbstractControlAccessor } from '../abstract-control-accessor';
import { controlValueAccessor } from 'src/app/providers/control-value-accessor';

@Component({
  selector: 'mkj-autocomplete',
  templateUrl: './mkj-autocomplete.component.html',
  styleUrl: './mkj-autocomplete.component.scss',
  providers: [controlValueAccessor(MkjAutocompleteComponent)],
})
export class MkjAutocompleteComponent<
  TModel,
  TControlModel = TModel | string,
> extends AbstractControlAccessor<TControlModel> {
  @Input({ required: true })
  public datasource: AbstractListDatasource<TModel>;
  @Input({ required: true })
  public listConfig: AutoCompleteConfiguration<TModel>;
  @Input()
  public templateMap: { [key: string]: TemplateRef<any> };
  @Input()
  public showClear: boolean = false;

  public internalModel: TModel;
  public searchResults: TModel[];

  public loading: boolean = false;

  private _getListInput: GetListInput = {};

  constructor(inj: Injector) {
    super(inj);
    this.subs.add(
      this.value$.subscribe((value) => {
        this.setInternalModel(value);
      })
    );
  }

  public search(event: AutoCompleteCompleteEvent): void {
    const query = event.query;

    this._getListInput.globalFilter = {
      fields: this.listConfig.searchFields,
      value: query,
    };

    this.datasource.getList(this._getListInput).subscribe((result) => {
      this.searchResults = result.values;
    });
  }

  public onSelect(value: TModel): void {
    if (this.listConfig.controlValueIsDataKey || this.listConfig.allowCustomValues) {
      const dataKey = this.listConfig.dataKey ?? 'id';
      const string = typeof value === 'string' ? value : value?.[dataKey as keyof TModel];
      this.change(string as TControlModel);
    } else {
      this.change(value as unknown as TControlModel);
    }
  }

  private setInternalModel(value: TModel | TControlModel): void {
    if (!value) {
      this.internalModel = null;
      return;
    }

    if (this.listConfig?.controlValueIsDataKey && value) {
      this.setDisabledState(true);
      this.loading = true;
      this.datasource.getById(value as string).subscribe((result) => {
        this.internalModel = result;
        this.setDisabledState(false);
        this.loading = false;
      });
    } else {
      this.internalModel = value as TModel;
    }
  }
}
