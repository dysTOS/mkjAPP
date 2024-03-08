import { Inject, Component, Input, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DisplayModelConfiguration } from '../_display-model-configurations/display-model-configuration.interface';
import { DISPLAY_MODEL } from 'src/app/providers/display-model';
import { BewertungenApiService } from 'src/app/services/api/bewertungen-api.service';
import { InfoService } from 'src/app/services/info.service';
import { Noten } from 'src/app/models/Noten';
import { Bewertung } from 'src/app/models/Bewertung';

@Component({
  selector: 'mkj-display-model',
  templateUrl: './mkj-display-model.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MkjDisplayModelComponent<T> implements AfterViewInit {
  @Input({ required: true })
  public model: T;

  public bewertung: Bewertung = null;

  constructor(
    @Inject(DISPLAY_MODEL)
    public config: DisplayModelConfiguration<T>,
    private cd: ChangeDetectorRef,
    private bewertungenService: BewertungenApiService,
    private infoService: InfoService
  ) {}

  public ngAfterViewInit(): void {
    this.setValues();
    if (this.config.rateable) {
      this.bewertungenService.getNotenVote((this.model as Noten).id).subscribe((res) => {
        this.bewertung = res;
        this.cd.markForCheck();
      });
    }
    this.cd.markForCheck();
  }

  private setValues(): void {
    this.config.fields.forEach((field) => {
      field.value = field.getValue(this.model);
    });
  }

  public setVote(noten: Noten, vote: number): void {
    this.bewertungenService.setNotenVote(noten.id, vote).subscribe((res) => {
      this.infoService.success('Bewertung gespeichert');
    });
  }
}
