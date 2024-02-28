import { Component, Injector, Input, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validator } from '@angular/forms';
import { OverlayPanel } from 'primeng/overlaypanel';
import { BehaviorSubject, debounceTime, distinctUntilChanged, merge, takeWhile, tap } from 'rxjs';
import { Anschrift } from 'src/app/models/Anschrift';
import { controlValidator } from 'src/app/providers/control-validator';
import { controlValueAccessor } from 'src/app/providers/control-value-accessor';
import { AnschriftenApiService } from 'src/app/services/api/anschriften-api.service';
import { AbstractControlAccessor } from '../abstract-control-accessor';
import { AnschriftenListDatasource } from '../../_list-datasources/anschriften-list-datasource.class';
import { AnschriftenAutoCompleteConfigiguration } from '../../_autocomplete-configurations/anschriften-autocomplete-config.class';

@Component({
  selector: 'mkj-anschrift-form',
  templateUrl: './anschrift-form.component.html',
  styleUrls: ['./anschrift-form.component.scss'],
  providers: [
    controlValueAccessor(AnschriftFormComponent),
    controlValidator(AnschriftFormComponent),
    AnschriftenListDatasource,
  ],
})
export class AnschriftFormComponent extends AbstractControlAccessor<Anschrift> implements Validator {
  @Input()
  public mode: 'edit' | 'suggest' = 'edit';

  public internalFormGroup: FormGroup;

  public autoCompleteConfig = new AnschriftenAutoCompleteConfigiguration(false);

  constructor(
    inj: Injector,
    private formBuilder: FormBuilder,
    private apiService: AnschriftenApiService,
    public dataSource: AnschriftenListDatasource
  ) {
    super(inj);
    this.initFormGroup();
    this.subs.add(
      this.value$.subscribe((value) => {
        if (value) {
          this.internalFormGroup.patchValue(value, {
            emitEvent: false,
          });
        } else {
          this.internalFormGroup.reset();
        }
      }),
      this.internalFormGroup.valueChanges.subscribe((value) => {
        if (this.mode === 'suggest') {
          value.id = null;
          this.internalFormGroup.controls.id.patchValue(null, {
            emitEvent: false,
          });
        }
        this.touch();
        this.change(value);
      })
    );
  }

  public setFromSuggestion(anschrift: Anschrift) {
    this.internalFormGroup.patchValue(anschrift, { emitEvent: false });
    this.touch();
    this.change(anschrift);
  }

  private initFormGroup() {
    this.internalFormGroup = this.formBuilder.group({
      id: [null],
      vorname: [null],
      zuname: [null],
      firma: [null],
      titelVor: [null],
      titelNach: [null],
      strasse: [null],
      hausnummer: [null],
      plz: [null],
      ort: [null],
      staat: [null],
      email: [null],
      telefonHaupt: [null],
      telefonMobil: [null],
      IBAN: [null],
      BIC: [null],
    });
  }

  validate(control: AbstractControl<any, any>): ValidationErrors {
    const vorname = control?.value?.['vorname'];
    const zuname = control?.value?.['zuname'];
    const firma = control?.value?.['firma'];

    if (!vorname && !zuname && !firma) {
      return {
        Kontrahent: 'Zumindest Vor/Zuname oder Firma müssen angegeben werden.',
      };
    }
    if ((!vorname || !zuname) && !firma) {
      return {
        Kontrahent: 'Zumindest Vor/Zuname oder Firma müssen angegeben werden.',
      };
    }

    return null;
  }
}
