import { AfterViewInit, ChangeDetectorRef, Component, Inject, Input } from '@angular/core';
import { Bewertung } from 'src/app/models/Bewertung';
import { Noten } from 'src/app/models/Noten';
import { DISPLAY_MODEL } from 'src/app/providers/display-model';
import { BewertungenApiService } from 'src/app/services/api/bewertungen-api.service';
import { InfoService } from 'src/app/services/info.service';
import { DisplayModelConfiguration } from '../_display-model-configurations/display-model-configuration.interface';

@Component({
  selector: 'mkj-display-model',
  templateUrl: './mkj-display-model.component.html',
})
export class MkjDisplayModelComponent<T> implements AfterViewInit {
  @Input({ required: true })
  public model: T;

  @Input()
  public hideActions = false;

  public personalVote: Bewertung = null;

  public actionButtonLabelLUT = {
    details: 'Details',
    edit: 'Bearbeiten',
    duplicate: 'Duplizieren',
  };

  public actionButtonIconLUT = {
    details: 'pi pi-list',
    edit: 'pi pi-pencil',
    duplicate: 'pi pi-copy',
  };

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
        this.personalVote = res ?? {};
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
      noten.bewertung = res.bewertung;
    });
  }
}
