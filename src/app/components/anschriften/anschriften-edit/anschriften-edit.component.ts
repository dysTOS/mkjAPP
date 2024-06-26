import { Component, Injector } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Anschrift } from 'src/app/models/Anschrift';
import { PermissionKey } from 'src/app/models/User';
import { AnschriftenApiService } from 'src/app/services/api/anschriften-api.service';
import { AbstractFormComponent } from 'src/app/utilities/form-components/_abstract-form-component.class';

@Component({
  selector: 'app-anschriften-edit',
  templateUrl: './anschriften-edit.component.html',
  styleUrl: './anschriften-edit.component.scss',
})
export class AnschriftEditComponent extends AbstractFormComponent<Anschrift> {
  protected navigateBackOnSave = true;

  constructor(inj: Injector, apiService: AnschriftenApiService) {
    super(inj, apiService);
  }

  protected initToolbar(): void {
    this.toolbarService.backButton = true;

    if (this.getId() !== 'new') {
      this.toolbarService.header = 'Adresse bearbeiten';
      this.toolbarService.buttons = [
        {
          label: 'Adresse Löschen',
          icon: 'pi pi-trash',
          click: () => this.delete(),
          permissions: [PermissionKey.ANSCHRIFTEN_DELETE],
        },
      ];
    } else {
      this.toolbarService.header = 'Neue Adresse';
    }
  }
  protected initFormGroup(): FormGroup<any> {
    return new FormControl(null) as unknown as FormGroup<any>;
  }
  protected getId(): string {
    return this.route.snapshot.params.id;
  }
}
