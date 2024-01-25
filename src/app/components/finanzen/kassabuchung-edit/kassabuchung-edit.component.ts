import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilFunctions } from 'src/app/helpers/util-functions';
import { Kassabuchung, KassabuchungTyp } from 'src/app/models/Kassabuch';
import { PermissionKey } from 'src/app/models/User';
import { KassabuchungenApiService } from 'src/app/services/api/kassabuchungen-api.service';
import { InfoService } from 'src/app/services/info.service';
import { AbstractFormComponent } from 'src/app/utilities/form-components/_abstract-form-component.class';
import { MkjToolbarService } from 'src/app/utilities/mkj-toolbar/mkj-toolbar.service';

@Component({
  selector: 'app-kassabuchung-edit',
  templateUrl: './kassabuchung-edit.component.html',
  styleUrls: ['./kassabuchung-edit.component.scss'],
})
export class KassabuchungEditComponent extends AbstractFormComponent<Kassabuchung> {
  protected navigateBackOnSave = true;

  public positionenFormArray: FormArray;
  public readonly typOptions = UtilFunctions.getDropdownOptionsFromEnum(KassabuchungTyp);

  constructor(
    toolbarService: MkjToolbarService,
    apiService: KassabuchungenApiService,
    infoService: InfoService,
    route: ActivatedRoute,
    router: Router
  ) {
    super(toolbarService, apiService, infoService, route, router);

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
        datum: new FormControl<string>(null, Validators.required),
        anschrift_id: new FormControl<string>(null),
        kassabuch_id: new FormControl<string>(buchId),
        gesamtpreis: new FormControl<number>(null, Validators.required),
        bezahltDatum: new FormControl<string>(null),
        anmerkungen: new FormControl<string>(null),
        positionen: new FormArray<any>([]),
        konditionen: new FormControl<any>(null),
        anschrift: new FormControl(null),
      },
      {
        validators: (group: FormGroup): ValidationErrors | null => {
          if (!group.controls.anschrift_id.value && !group.controls.anschrift.value) {
            const err = {
              Anschrift:
                'Es muss eine existierende Anschrift ausgewählt werden oder eine neue Anschrift angelegt werden.',
            };
            return err;
          }
          return null;
        },
      }
    );

    this.positionenFormArray = formGroup.controls.positionen as FormArray;
    return formGroup;
  }

  protected getId(): string {
    return this.route.snapshot.paramMap.get('id');
  }

  public addPosition(): void {
    this.positionenFormArray.push(
      new FormGroup({
        bezeichnung: new FormControl<string>(null, Validators.required),
        menge: new FormControl<number>(null, Validators.required),
        preis: new FormControl<number>(null, Validators.required),
        gesamtPreis: new FormControl<number>(null, Validators.required),
      })
    );
  }

  public removePosition(index: number): void {
    this.positionenFormArray.removeAt(index);
    this.calculateGesamtpreis();
  }

  private calculateGesamtpreis(): void {
    let gesamtpreis = 0;
    this.positionenFormArray.controls.forEach((control: FormGroup) => {
      let positionGesamtpreis: number;
      if (control.controls.menge.value != null && control.controls.preis.value != null) {
        positionGesamtpreis = control.controls.menge.value * control.controls.preis.value;
        control.controls.gesamtPreis.setValue(positionGesamtpreis, {
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
