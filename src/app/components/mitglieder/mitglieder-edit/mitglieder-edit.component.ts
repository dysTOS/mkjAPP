import { Component, Injector, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { Mitglied, MitgliedGeschlechtMap } from 'src/app/models/Mitglied';
import { PermissionKey } from 'src/app/models/User';
import { UserService } from 'src/app/services/authentication/user.service';
import { AbstractFormComponent } from 'src/app/utilities/form-components/_abstract-form-component.class';
import { MitgliederApiService } from '../../../services/api/mitglieder-api.service';

@Component({
  selector: 'app-mitglieder-edit',
  templateUrl: './mitglieder-edit.component.html',
  styleUrls: ['./mitglieder-edit.component.scss'],
})
export class MitgliederEditComponent extends AbstractFormComponent<Mitglied> {
  @Input()
  public personalMode: boolean = false;

  public canAssignRoles: boolean = false;
  public rolesTouched: boolean = false;

  public readonly MitgliedGeschlechtMap = MitgliedGeschlechtMap;

  constructor(
    inj: Injector,
    apiService: MitgliederApiService,
    private confirmationService: ConfirmationService,
    private userService: UserService
  ) {
    super(inj, apiService);

    this.canAssignRoles = this.userService.hasPermission(PermissionKey.ROLE_ASSIGN);
  }

  protected initToolbar(): void {
    if (this.personalMode) return;

    this.toolbarService.backButton = true;
    const id = this.getId();
    if (id && id !== 'new') {
      this.toolbarService.header = 'Mitglied bearbeiten';
      this.toolbarService.buttons = [
        {
          icon: 'pi pi-trash',
          click: () => this.deleteMitglied(),
          permissions: [PermissionKey.MITGLIEDER_DELETE],
          label: 'Löschen',
        },
      ];
    } else {
      this.toolbarService.header = 'Neues Mitglied';
    }
  }
  protected initFormGroup(): FormGroup<any> {
    return new FormGroup({
      id: new FormControl(''),
      user_id: new FormControl(''),
      vorname: new FormControl('', Validators.required),
      zuname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      titelVor: new FormControl(''),
      titelNach: new FormControl(''),
      geburtsdatum: new FormControl(''),
      geschlecht: new FormControl(''),
      strasse: new FormControl(''),
      hausnummer: new FormControl(''),
      ort: new FormControl(''),
      plz: new FormControl(''),
      telefonHaupt: new FormControl(
        '',
        Validators.pattern(`^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$`)
      ),
      telefonMobil: new FormControl(
        '',
        Validators.pattern(`^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$`)
      ),
      beruf: new FormControl(''),
      aktiv: new FormControl(false),
      eintrittDatum: new FormControl(''),
      austrittDatum: new FormControl(''),
    });
  }
  protected getId(): string {
    return this.route.snapshot.params.id;
  }

  private deleteMitglied() {
    let name = this.formGroup.controls.vorname.value + ' ' + this.formGroup.controls.zuname.value;
    this.confirmationService.confirm({
      header: 'Mitglied ' + name + ' wirklich löschen?',
      message:
        'Inaktive Musiker sollten nicht gelöscht werden, stattdessen sollte das Datum des Austritts erfasst werden und das Mitglied auf "Inaktiv" gestellt werden...',
      icon: 'pi pi-exclamation-triangle',
      accept: () => this.delete(),
    });
  }
}
