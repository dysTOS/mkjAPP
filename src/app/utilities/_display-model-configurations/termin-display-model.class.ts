import { Injectable } from '@angular/core';
import { Termin } from 'src/app/models/Termin';
import { MkjDatePipe } from 'src/app/pipes/mkj-date.pipe';
import {
  DisplayModelAction,
  DisplayModelConfiguration,
  DisplayModelField,
} from './display-model-configuration.interface';
import { PermissionKey } from 'src/app/models/User';
import { Router } from '@angular/router';
import _ from 'lodash';
import { TermineApiService } from 'src/app/services/api/termine-api.service';
import { InfoService } from 'src/app/services/info.service';

@Injectable()
export class TerminDisplayModel implements DisplayModelConfiguration<Termin> {
  constructor(
    private datePipe: MkjDatePipe,
    private router: Router,
    private termineApiService: TermineApiService,
    private infoService: InfoService
  ) {}

  public actions: DisplayModelAction<Termin>[] = [
    {
      type: 'details',
      action: (model: Termin) => this.router.navigate(['termine/details', model.id]),
    },
    {
      type: 'duplicate',
      action: (model: Termin) => this.duplicateAusrueckung(model),
      permission: [PermissionKey.TERMIN_SAVE],
    },
    {
      type: 'edit',
      action: (model: Termin) => this.router.navigate(['termine', model.id]),
      permission: [PermissionKey.TERMIN_SAVE, PermissionKey.TERMIN_GRUPPENLEITER_SAVE],
    },
  ];

  public fields: DisplayModelField<Termin>[] = [
    {
      label: 'Gruppe',
      getValue: (model: Termin) => model.gruppe?.name?.toUpperCase(),
    },
    {
      label: 'Name',
      getValue: (model: Termin) => model.name,
    },
    {
      label: 'Termin',
      getValue: (model: Termin) => {
        const vonDatum = this.datePipe.transform(model.vonDatum, 'd. MMMM YYYY');

        if (model.treffzeit) {
          return `${vonDatum} ${model.treffzeit}`;
        } else if (model.vonZeit) {
          return `${vonDatum} ${model.vonZeit}`;
        } else {
          return vonDatum;
        }
      },
    },
    {
      label: 'Dauert bis',
      getValue: (model: Termin) => {
        if (model.vonDatum === model.bisDatum) {
          return model.bisZeit;
        }

        const bisDatum = this.datePipe.transform(model.bisDatum, 'd. MMMM YYYY');

        if (model.bisZeit) {
          return `${bisDatum} ${model.bisZeit}`;
        } else {
          return bisDatum;
        }
      },
    },
    {
      label: 'Ort',
      getValue: (model: Termin) => model.ort,
    },
    {
      label: 'Infos',
      getValue: (model: Termin) => model.infoMusiker,
      styleClass: 'md:col-6 col-12',
    },
    {
      label: 'Öffentliche Beschreibung',
      getValue: (model: Termin) => model.beschreibung,
      styleClass: 'md:col-6 col-12',
    },
  ];

  public duplicateAusrueckung(termin: Termin) {
    const duplicateAusrueckung = _.cloneDeep(termin);
    duplicateAusrueckung.id = null;
    duplicateAusrueckung.created_at = null;
    duplicateAusrueckung.updated_at = null;
    duplicateAusrueckung.name = duplicateAusrueckung.name + ' - KOPIE';

    this.termineApiService.create(duplicateAusrueckung).subscribe({
      next: (res) => {
        this.router.navigate(['termine', res.id]);
        this.infoService.success('Termin dupliziert!');
      },
      error: (err) => {
        this.infoService.error(err);
      },
    });
  }
}
