import { Injectable } from '@angular/core';
import {
  DisplayModelAction,
  DisplayModelConfiguration,
  DisplayModelField,
} from './display-model-configuration.interface';
import { Noten } from 'src/app/models/Noten';
import { MkjDatePipe } from 'src/app/pipes/mkj-date.pipe';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { ModelType } from 'src/app/models/_ModelType';
import { PermissionKey } from 'src/app/models/User';
import { Router } from '@angular/router';

@Injectable()
export class NotenDisplayModel implements DisplayModelConfiguration<Noten> {
  rateable: boolean = true;
  commentable = ModelType.Noten;

  constructor(
    private datePipe: MkjDatePipe,
    private configService: ConfigurationService,
    private router: Router
  ) {}

  public actions: DisplayModelAction<Noten>[] = [
    {
      type: 'edit',
      permission: [PermissionKey.NOTEN_SAVE],
      action: (model: Noten) => this.router.navigate(['archiv', 'noten', model.id]),
    },
  ];

  public fields: DisplayModelField<Noten>[] = [
    {
      label: 'Inventar Nr.',
      getValue: (model: Noten) => model.inventarId,
    },
    {
      label: 'Titel',
      getValue: (model: Noten) => model.titel,
    },
    {
      label: 'Komponist',
      getValue: (model: Noten) => model.komponist,
    },
    {
      label: 'Arrangeur',
      getValue: (model: Noten) => model.arrangeur,
    },
    {
      label: 'Verlag',
      getValue: (model: Noten) => model.verlag,
    },
    {
      label: this.configService.uiNaming.Notengattung,
      getValue: (model: Noten) => model.gattung,
    },
    {
      label: 'Dauer',
      getValue: (model: Noten) => model.dauer,
    },
    {
      label: 'Schwierigkeit',
      getValue: (model: Noten) => model.schwierigkeit?.toString(),
    },
    {
      label: 'Ausgeliehen von',
      getValue: (model: Noten) => model.ausgeliehenVon,
    },
    {
      label: 'Ausgeliehen seit',
      getValue: (model: Noten) => this.datePipe.transform(model.ausgeliehenAb),
    },
    {
      label: 'Aufbewahrungsort',
      getValue: (model: Noten) => model.aufbewahrungsort,
    },
    {
      label: 'Anmerkungen',
      getValue: (model: Noten) => model.anmerkungen,
      styleClass: 'lg:col-6 md:col-12 col-12',
    },
    {
      label: 'Links',
      type: 'links',
      getValue: (model: Noten) => model.links,
      styleClass: 'col-12',
    },
  ];
}
