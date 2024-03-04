import { Component, Injector } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Noten } from 'src/app/models/Noten';
import { PermissionKey } from 'src/app/models/User';
import { NotenApiService } from 'src/app/services/api/noten-api.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { AutoCompleteConfiguration } from 'src/app/utilities/_autocomplete-configurations/_autocomplete-configuration.class';
import { GenericFieldValuesAutoCompleteConfigiguration } from 'src/app/utilities/_autocomplete-configurations/generic-field-values-autocomplete-config.class';
import { GenericFieldValueDatasource } from 'src/app/utilities/_list-datasources/generic-field-values-datasource.class';
import { AbstractFormComponent } from 'src/app/utilities/form-components/_abstract-form-component.class';

@Component({
  selector: 'app-noten-editor',
  templateUrl: './noten-editor.component.html',
  styleUrls: ['./noten-editor.component.scss'],
})
export class NotenEditorComponent extends AbstractFormComponent<Noten> {
  protected navigateBackOnSave = true;

  public readonly valuesDatasource = new GenericFieldValueDatasource(this.notenApiService);
  public readonly komponistAutocompleteConfig = new GenericFieldValuesAutoCompleteConfigiguration<Noten>(
    'komponist',
    'Komponist'
  );
  public readonly arrangeurAutocompleteConfig = new GenericFieldValuesAutoCompleteConfigiguration<Noten>(
    'arrangeur',
    'Arrangeur'
  );
  public readonly verlagAutocompleteConfig = new GenericFieldValuesAutoCompleteConfigiguration<Noten>(
    'verlag',
    'Verlag'
  );

  public readonly komponistAutoCompleteConfig: AutoCompleteConfiguration<any> = {
    searchFields: ['komponist'],
    controlValueIsDataKey: false,
    allowCustomValues: true,
    dataKey: 'value',
    columns: [{ header: 'Komponist', field: 'value' }],
    getDisplayValue: (item: any) => `${item.value}`,
  };
  public readonly arrangeurAutoCompleteConfig: AutoCompleteConfiguration<any> = {
    searchFields: ['arrangeur'],
    controlValueIsDataKey: false,
    allowCustomValues: true,
    dataKey: 'value',
    columns: [{ header: 'Arrangeur', field: 'value' }],
    getDisplayValue: (item: any) => `${item.value}`,
  };
  public readonly verlagAutoCompleteConfig: AutoCompleteConfiguration<any> = {
    searchFields: ['verlag'],
    controlValueIsDataKey: false,
    allowCustomValues: true,
    dataKey: 'value',
    columns: [{ header: 'Verlag', field: 'value' }],
    getDisplayValue: (item: any) => `${item.value}`,
  };

  constructor(
    inj: Injector,
    private notenApiService: NotenApiService,
    public configService: ConfigurationService
  ) {
    super(inj, notenApiService);
  }

  protected getId(): string {
    return this.route.snapshot.params.id;
  }

  protected initToolbar(): void {
    this.toolbarService.backButton = true;
    if (this.getId() !== 'new') {
      this.toolbarService.header = 'Noten bearbeiten';
      this.toolbarService.buttons = [
        {
          label: 'Mappe Löschen',
          icon: 'pi pi-trash',
          click: () => this.delete(),
          permissions: [PermissionKey.NOTEN_DELETE],
        },
      ];
    } else {
      this.toolbarService.header = 'Neue Noten';
    }
  }

  protected initFormGroup(): FormGroup<any> {
    return new FormGroup({
      titel: new FormControl('', Validators.required),
      komponist: new FormControl(''),
      inventarId: new FormControl(''),
      arrangeur: new FormControl(''),
      verlag: new FormControl(''),
      gattung: new FormControl(''),
      dauer: new FormControl('', Validators.pattern('^(?:(?:[0-1]?[0-9]|2[0-3]):)?(?:[0-5]?[0-9]:)?[0-5]?[0-9]$')),
      schwierigkeit: new FormControl(null),
      ausgeliehenAb: new FormControl(''),
      ausgeliehenVon: new FormControl(''),
      anmerkungen: new FormControl(''),
      aufbewahrungsort: new FormControl(''),
      links: new FormControl(''),
    });
  }
}
