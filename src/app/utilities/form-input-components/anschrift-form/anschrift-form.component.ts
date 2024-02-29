import { ChangeDetectorRef, Component, Injector, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validator, Validators } from '@angular/forms';
import { Anschrift } from 'src/app/models/Anschrift';
import { controlValidator } from 'src/app/providers/control-validator';
import { controlValueAccessor } from 'src/app/providers/control-value-accessor';
import { AnschriftenAutoCompleteConfigiguration } from '../../_autocomplete-configurations/anschriften-autocomplete-config.class';
import { AnschriftenListDatasource } from '../../_list-datasources/anschriften-list-datasource.class';
import { AbstractControlAccessor } from '../abstract-control-accessor';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { BehaviorSubject } from 'rxjs';

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
  public label: string;

  @Input()
  public mode: 'edit' | 'suggest' = 'edit';

  public internalFormGroup: FormGroup;

  public readonly autoCompleteConfig = new AnschriftenAutoCompleteConfigiguration(false);
  public readonly searchValue = new BehaviorSubject<Anschrift>(null);

  constructor(
    inj: Injector,
    public dataSource: AnschriftenListDatasource,
    private configService: ConfigurationService,
    private formBuilder: FormBuilder
  ) {
    super(inj);
    this.initFormGroup();
    this.subs.add(
      this.value$.subscribe((value) => {
        if (value) {
          this.internalFormGroup.patchValue(value, {
            emitEvent: false,
          });
          this.searchValue.next(value);
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
          this.searchValue.next(null);
        }
        this.updateInternalValidators();
        this.touch();
        this.change(value);
      })
    );
  }

  public setFromSuggestion(anschrift: Anschrift) {
    this.internalFormGroup.patchValue(anschrift, { emitEvent: false });
    this.searchValue.next(anschrift);
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
      email: [null, Validators.email],
      telefonHaupt: [null, Validators.pattern(`^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$`)],
      telefonMobil: [null, Validators.pattern(`^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$`)],
      IBAN: [null, Validators.pattern(`^[A-Z]{2}(?:[ ]?[0-9]){18,20}$`)],
      BIC: [null],
    });
  }

  public validate(control: AbstractControl<any, any>): ValidationErrors {
    const vorname = control?.value?.['vorname'];
    const zuname = control?.value?.['zuname'];
    const firma = control?.value?.['firma'];

    if (!vorname && !zuname && !firma) {
      return {
        [this.configService.uiNaming.Anschriften]: 'Zumindest Vor/Zuname oder Firma müssen angegeben werden.',
      };
    }
    if ((!vorname || !zuname) && !firma) {
      return {
        [this.configService.uiNaming.Anschriften]: 'Zumindest Vor/Zuname oder Firma müssen angegeben werden.',
      };
    }
    if (this.internalFormGroup.invalid) {
      return {
        [this.configService.uiNaming.Anschriften]: 'Angaben fehlerhaft.',
      };
    }

    return null;
  }

  private updateInternalValidators(): void {
    if (this.internalFormGroup.controls['firma'].value) {
      this.internalFormGroup.controls['vorname'].removeValidators(Validators.required);
      this.internalFormGroup.controls['zuname'].removeValidators(Validators.required);
    } else {
      this.internalFormGroup.controls['vorname'].setValidators(Validators.required);
      this.internalFormGroup.controls['zuname'].setValidators(Validators.required);
      this.internalFormGroup.controls['firma'].removeValidators(Validators.required);
    }
    this.internalFormGroup.controls['vorname'].updateValueAndValidity({ emitEvent: false });
    this.internalFormGroup.controls['zuname'].updateValueAndValidity({ emitEvent: false });
    this.internalFormGroup.controls['firma'].updateValueAndValidity({ emitEvent: false });
  }
}
