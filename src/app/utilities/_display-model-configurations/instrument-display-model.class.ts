import { Injectable } from '@angular/core';
import { Instrument } from 'src/app/models/Instrument';
import { FullNamePipe } from 'src/app/pipes/full-name.pipe';
import {
  DisplayModelAction,
  DisplayModelConfiguration,
  DisplayModelField,
} from './display-model-configuration.interface';
import { Router } from '@angular/router';
import { PermissionKey } from 'src/app/models/User';

@Injectable()
export class InstrumentDisplayModel implements DisplayModelConfiguration<Instrument> {
  constructor(
    private namePipe: FullNamePipe,
    private router: Router
  ) {}

  public actions: DisplayModelAction<Instrument>[] = [
    {
      type: 'edit',
      action: (model: Instrument) => this.router.navigate(['archiv/instrumente', model.id]),
      permission: [PermissionKey.INSTRUMENTE_SAVE],
    },
  ];

  public fields: DisplayModelField<Instrument>[] = [
    {
      label: 'Bezeichung',
      getValue: (model: Instrument) => model.bezeichnung,
    },
    {
      label: 'Marke',
      getValue: (model: Instrument) => model.marke,
    },
    {
      label: 'Aufbewahrungsort',
      getValue: (model: Instrument) => model.aufbewahrungsort,
    },
    {
      label: 'Ausgegeben an',
      getValue: (model: Instrument) => this.namePipe.transform(model.mitglied),
    },
    {
      label: 'Gruppe',
      getValue: (model: Instrument) => model.gruppe?.name,
    },
    {
      label: 'Schäden',
      getValue: (model: Instrument) => model.schaeden,
      styleClass: 'md:col-6 col-12',
    },
    {
      label: 'Anmerkungen',
      getValue: (model: Instrument) => model.anmerkungen,
      styleClass: 'md:col-6 col-12',
    },
  ];
}
