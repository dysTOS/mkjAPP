import { Component, Injector } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Noten } from 'src/app/models/Noten';
import { PermissionKey } from 'src/app/models/User';
import { NotenApiService } from 'src/app/services/api/noten-api.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { AbstractFormComponent } from 'src/app/utilities/form-components/_abstract-form-component.class';

@Component({
  selector: 'app-noten-editor',
  templateUrl: './noten-editor.component.html',
  styleUrls: ['./noten-editor.component.scss'],
})
export class NotenEditorComponent extends AbstractFormComponent<Noten> {
  protected navigateBackOnSave = true;

  constructor(
    inj: Injector,
    public configService: ConfigurationService,
    apiService: NotenApiService
  ) {
    super(inj, apiService);
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
      ausgeliehenAb: new FormControl(''),
      ausgeliehenVon: new FormControl(''),
      anmerkungen: new FormControl(''),
      aufbewahrungsort: new FormControl(''),
      links: new FormControl(''),
    });
  }
}
