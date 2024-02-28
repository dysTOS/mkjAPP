import { Component, Injector } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UiDropdownOption } from 'src/app/interfaces/UiConfigurations';
import { Kassabuch } from 'src/app/models/Kassabuch';
import { PermissionKey } from 'src/app/models/User';
import { GruppenApiService } from 'src/app/services/api/gruppen-api.service';
import { KassabuchApiService } from 'src/app/services/api/kassabuch-api.service';
import { AbstractFormComponent } from 'src/app/utilities/form-components/_abstract-form-component.class';

@Component({
  selector: 'app-kassabuch-edit',
  templateUrl: './kassabuch-edit.component.html',
  styleUrls: ['./kassabuch-edit.component.scss'],
})
export class KassabuchEditComponent extends AbstractFormComponent<Kassabuch> {
  protected navigateBackRouteString = '../../list';
  protected navigateBackOnSave = false;

  public GruppeDropdown: UiDropdownOption<string>[] = [];

  constructor(apiService: KassabuchApiService, gruppenService: GruppenApiService, inj: Injector) {
    super(inj, apiService);
    this.subs.sink = gruppenService.getList(null).subscribe((result) => {
      this.GruppeDropdown = result.values.map((item) => {
        return {
          label: item.name,
          value: item.id,
        };
      });
    });
  }
  protected initToolbar(): void {
    this.toolbarService.backButton = true;
    this.toolbarService.buttons = [
      {
        label: 'Löschen',
        icon: 'pi pi-trash',
        hidden: this.getId() === 'new',
        click: () => {
          this.delete();
        },
        permissions: [PermissionKey.KASSABUCH_DELETE],
      },
    ];
  }

  protected getId(): string {
    const id = this.route.snapshot.paramMap.get('buchId');
    return id;
  }

  protected initFormGroup(): FormGroup<any> {
    return new FormGroup({
      id: new FormControl<string>(null),
      name: new FormControl<string>(null),
      aktiv: new FormControl<boolean>(false),
      color: new FormControl<string>(null),
      gruppe_id: new FormControl<string>(null),
      anmerkungen: new FormControl<string>(null),
    });
  }
}
