import { Component, Injector } from '@angular/core';
import { FormArray, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UtilFunctions } from 'src/app/helpers/util-functions';
import { Kassabuchung, KassabuchungTyp } from 'src/app/models/Kassabuch';
import { PermissionKey } from 'src/app/models/User';
import { KassabuchungenApiService } from 'src/app/services/api/kassabuchungen-api.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { AbstractFormComponent } from 'src/app/utilities/form-components/_abstract-form-component.class';

export interface KassabuchungPositionenFormGroup {
  bezeichnung: FormControl<string>;
  menge: FormControl<number>;
  einzelpreis: FormControl<number>;
  gesamtpreis: FormControl<number>;
}

@Component({
  selector: 'app-kassabuchung-edit',
  templateUrl: './kassabuchung-edit.component.html',
  styleUrls: ['./kassabuchung-edit.component.scss'],
})
export class KassabuchungEditComponent extends AbstractFormComponent<Kassabuchung> {
  protected navigateBackOnSave = true;

  public positionenFormArray: FormArray<FormGroup<KassabuchungPositionenFormGroup>>;
  public readonly typOptions = UtilFunctions.getDropdownOptionsFromEnum(KassabuchungTyp);

  constructor(
    inj: Injector,
    buchungenApiService: KassabuchungenApiService,
    public configService: ConfigurationService
  ) {
    super(inj, buchungenApiService);
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.subs.add(
      this.formGroup.controls.anschrift.valueChanges.subscribe((anschrift) => {
        if (anschrift.id) {
          this.formGroup.controls.anschrift_id.setValue(anschrift.id);
        } else {
          this.formGroup.controls.anschrift_id.setValue(null);
        }
      }),
      this.positionenFormArray.valueChanges.subscribe(() => {
        this.calculateGesamtpreis();
      })
    );
  }

  protected initToolbar(): void {
    this.toolbarService.header = 'Buchung';
    this.toolbarService.backButton = true;
    this.toolbarService.buttons = [
      {
        label: 'Löschen',
        icon: 'pi pi-trash',
        hidden: this.getId() === 'new',
        click: () => {
          this.delete();
        },
        permissions: [PermissionKey.KASSABUCHUNG_DELETE],
      },
    ];
  }

  protected initFormGroup(): FormGroup<any> {
    const buchId = this.route.snapshot.paramMap.get('buchId');
    const formGroup = new FormGroup(
      {
        id: new FormControl<string>(null),
        typ: new FormControl<KassabuchungTyp>(null, Validators.required),
        nummer: new FormControl<string>(null),
        betreff: new FormControl<string>(null, Validators.required),
        datum: new FormControl<string>(null, Validators.required),
        anschrift_id: new FormControl<string>(null),
        kassabuch_id: new FormControl<string>(buchId, Validators.required),
        gesamtpreis: new FormControl<number>(0, Validators.required),
        bezahltDatum: new FormControl<string>(null),
        anmerkungen: new FormControl<string>(null),
        positionen: new FormArray<FormGroup<KassabuchungPositionenFormGroup>>([]),
        konditionen: new FormControl<any>(null),
        anschrift: new FormControl(null),
      },
      {
        validators: (group: FormGroup): ValidationErrors | null => {
          if (!group.controls.anschrift_id.value && !group.controls.anschrift.value) {
            const err = {
              [this.configService.uiNaming.Anschrift]:
                `Es muss eine existierende ${this.configService.uiNaming.Anschrift} ausgewählt oder eine neue angelegt werden.`,
            };
            return err;
          }
          return null;
        },
      }
    );

    this.positionenFormArray = formGroup.controls.positionen as FormArray;
    this.addPosition();
    return formGroup;
  }

  protected getId(): string {
    return this.route.snapshot.paramMap.get('id');
  }

  protected dataLoaded(data: Kassabuchung): void {
    this.removePosition(0);
    if (data.positionen && data.positionen.length > 0) {
      for (let i = this.positionenFormArray.length; i < data.positionen.length; i++) {
        this.addPosition();
      }
    }
  }

  public addPosition(): void {
    this.positionenFormArray.push(
      new FormGroup<KassabuchungPositionenFormGroup>({
        bezeichnung: new FormControl<string>(null, Validators.required),
        menge: new FormControl<number>(1, Validators.required),
        einzelpreis: new FormControl<number>(null, Validators.required),
        gesamtpreis: new FormControl<number>(0, Validators.required),
      })
    );
  }

  public removePosition(index: number): void {
    this.positionenFormArray.removeAt(index);
    this.calculateGesamtpreis();
  }

  private calculateGesamtpreis(): void {
    if (this.positionenFormArray.controls.length === 0) return;

    let gesamtpreis = 0;
    this.positionenFormArray.controls.forEach((control: FormGroup<KassabuchungPositionenFormGroup>) => {
      let positionGesamtpreis: number;
      if (!control.controls.menge.value) {
        control.controls.menge.setValue(1, {
          emitEvent: true,
          onlySelf: false,
        });
      }
      if (control.controls.einzelpreis.value != null) {
        positionGesamtpreis = control.controls.menge.value * control.controls.einzelpreis.value;
        control.controls.gesamtpreis.setValue(positionGesamtpreis, {
          emitEvent: false,
          onlySelf: true,
        });
      }
      if (positionGesamtpreis) gesamtpreis += positionGesamtpreis;
    });
    this.formGroup.controls.gesamtpreis.setValue(gesamtpreis, {
      emitEvent: false,
      onlySelf: true,
    });
  }
}
