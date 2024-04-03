import { Injectable } from '@angular/core';
import { Anschrift } from 'src/app/models/Anschrift';
import { FullNamePipe } from 'src/app/pipes/full-name.pipe';
import {
  DisplayModelAction,
  DisplayModelConfiguration,
  DisplayModelField,
} from './display-model-configuration.interface';
import { PermissionKey } from 'src/app/models/User';
import { Router } from '@angular/router';

@Injectable()
export class AnschriftDisplayModel implements DisplayModelConfiguration<Anschrift> {
  constructor(
    private namePipe: FullNamePipe,
    private router: Router
  ) {}

  public actions: DisplayModelAction<Anschrift>[] = [
    {
      type: 'edit',
      action: (model: Anschrift) => this.router.navigate(['finanzen/adressen', model.id]),
      permission: [PermissionKey.ANSCHRIFTEN_SAVE],
    },
  ];

  public fields: DisplayModelField<Anschrift>[] = [
    {
      label: 'Name',
      getValue: (model: Anschrift) => this.namePipe.transform(model),
    },
    {
      label: 'Firma',
      getValue: (model: Anschrift) => model.firma,
    },
    {
      label: 'Adresse',
      getValue: (model: Anschrift) =>
        `${model.strasse ?? ''} ${model.hausnummer ?? ''}
            ${model.plz ?? ''} ${model.ort ?? ''}`,
    },
    {
      label: 'Telefon Haupt',
      getValue: (model: Anschrift) => model.telefonHaupt,
    },
    {
      label: 'Telefon Mobil',
      getValue: (model: Anschrift) => model.telefonMobil,
    },
    {
      label: 'E-Mail',
      getValue: (model: Anschrift) => model.email,
    },
    {
      label: 'IBAN',
      getValue: (model: Anschrift) => model.IBAN,
    },
    {
      label: 'BIC',
      getValue: (model: Anschrift) => model.BIC,
    },
  ];
}
