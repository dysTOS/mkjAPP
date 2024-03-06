import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { InstrumenteApiService } from 'src/app/services/api/instrumente-api.service';
import { MitgliedInstrumenteListConfig } from './mitglieder-instrumente-list-config.class';
import { MitgliedInstrumenteListDatasource } from './mitglieder-instrumente-list-datasource.class';
import { InstrumentDisplayModel } from 'src/app/utilities/_display-model-configurations/instrument-display-model.class';
import { displayModel } from 'src/app/providers/display-model';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionKey } from 'src/app/models/User';

@Component({
  selector: 'mkj-mitglied-instrumente-list',
  templateUrl: './mitglied-instrumente-list.component.html',
  styleUrl: './mitglied-instrumente-list.component.scss',
  providers: [displayModel(InstrumentDisplayModel)],
})
export class MitgliedInstrumenteListComponent implements OnChanges {
  @Input({ required: true })
  public mitgliedId: string;

  public listDatasource: MitgliedInstrumenteListDatasource;
  public readonly listConfig = new MitgliedInstrumenteListConfig();
  public readonly PermissionKey = PermissionKey;

  constructor(
    private instrumenteService: InstrumenteApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.mitgliedId) {
      this.setListDatasource();
    }
  }

  public navigateToInstrument(id: string): void {
    this.router.navigate(['../../archiv/instrumente', id], { relativeTo: this.route });
  }

  private setListDatasource(): void {
    if (this.mitgliedId) {
      this.listDatasource = new MitgliedInstrumenteListDatasource(this.instrumenteService, this.mitgliedId);
    } else {
      this.listDatasource = null;
    }
  }
}
