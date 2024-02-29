import { Component, Injector } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import dayjs from 'dayjs';
import { Termin, TerminStatusMap } from 'src/app/models/Termin';
import { PermissionKey } from 'src/app/models/User';
import { GruppenApiService } from 'src/app/services/api/gruppen-api.service';
import { TermineApiService } from 'src/app/services/api/termine-api.service';
import { UserService } from 'src/app/services/authentication/user.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { AbstractFormComponent } from 'src/app/utilities/form-components/_abstract-form-component.class';

@Component({
  templateUrl: './termin-edit.component.html',
  styleUrls: ['./termin-edit.component.scss'],
})
export class TerminEditComponent extends AbstractFormComponent<Termin> {
  public readonly StatusMap = TerminStatusMap;
  public readonly KategorieMap = this.configService.terminConfig.terminKategorien;
  public GruppenMap: { label: string; value: string }[];

  public severalDays: boolean = false;

  constructor(
    inj: Injector,
    terminApiService: TermineApiService,
    private configService: ConfigurationService,
    private userService: UserService,
    private gruppenService: GruppenApiService
  ) {
    super(inj, terminApiService);
    this.getGruppen();
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.subs.add(
      this.formGroup.get('vonDatum').valueChanges.subscribe((value) => {
        if (this.severalDays === false) {
          this.formGroup.get('bisDatum').setValue(value, { emitEvent: false });
        }
        this.updateSeveralDays();
      }),
      this.formGroup.get('bisDatum').valueChanges.subscribe((value) => {
        this.updateSeveralDays();
      }),
      this.formGroup.get('vonZeit').valueChanges.subscribe((value) => {
        this.onVonZeitChange(value);
      })
    );
  }

  protected initToolbar(): void {
    this.toolbarService.header = 'Termin';
    this.toolbarService.backButton = true;
    this.toolbarService.buttons = [
      {
        label: 'Löschen',
        icon: 'pi pi-trash',
        hidden: this.getId() === 'new',
        click: () => this.delete(),
        permissions: [PermissionKey.TERMIN_DELETE],
      },
    ];
  }
  protected initFormGroup(): FormGroup<any> {
    return new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, Validators.required),
      beschreibung: new FormControl(null),
      infoMusiker: new FormControl(null),
      oeffentlich: new FormControl(false),
      ort: new FormControl(null),
      kategorie: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required),
      vonDatum: new FormControl(null, Validators.required),
      vonZeit: new FormControl(null),
      bisDatum: new FormControl(null, Validators.required),
      bisZeit: new FormControl(null),
      treffzeit: new FormControl(null),
      gruppe_id: new FormControl(null),
    });
  }
  protected getId(): string {
    return this.route.snapshot.params.id;
  }

  public onSeveralDaysUserChange(value: boolean) {
    this.formGroup.markAsDirty();
    const vonDatum = this.formGroup.get('vonDatum')?.value;
    if (!vonDatum) {
      this.formGroup.get('bisDatum').setValue(null, { emitEvent: false });
      return;
    }

    if (value) {
      let bisDatum = dayjs(new Date(vonDatum));
      this.formGroup.get('bisDatum').setValue(bisDatum.add(1, 'day').format('YYYY-MM-DD'));
    } else {
      this.formGroup.get('bisDatum').setValue(vonDatum);
    }
  }

  private updateSeveralDays() {
    if (this.formGroup?.get('vonDatum').value === this.formGroup?.get('bisDatum').value) {
      this.severalDays = false;
    } else {
      this.severalDays = true;
    }
  }

  private onVonZeitChange(value: any) {
    if (!value) {
      this.formGroup.get('bisZeit').setValue(null, { emitEvent: false });
      this.formGroup.get('treffzeit').setValue(null, { emitEvent: false });
      return;
    }

    const objectBisZeit = dayjs(new Date('2022-01-01T' + value));
    const objectTreffzeit = dayjs(new Date('2022-01-01T' + value));
    this.formGroup.get('bisZeit').setValue(objectBisZeit.add(2, 'hours').format('HH:mm'), {
      emitEvent: false,
    });
    this.formGroup.get('treffzeit').setValue(objectTreffzeit.subtract(30, 'minutes').format('HH:mm'), {
      emitEvent: false,
    });
  }

  private getGruppen() {
    let gruppenleiterMitgliedId = null;
    if (
      this.userService.hasPermission(PermissionKey.TERMIN_GRUPPENLEITER_SAVE) &&
      this.userService.hasPermissionNot(PermissionKey.TERMIN_SAVE)
    ) {
      gruppenleiterMitgliedId = this.userService.currentMitglied.getValue().id;
    }
    this.gruppenService.getList().subscribe((res) => {
      let gruppen = res.values;
      if (gruppenleiterMitgliedId) {
        gruppen = gruppen.filter((g) => g.gruppenleiter_mitglied_id === gruppenleiterMitgliedId);
      }

      this.GruppenMap = gruppen.map((e) => {
        return {
          label: e.name,
          value: e.id,
        };
      });
    });
  }
}
