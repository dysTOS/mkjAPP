import { AfterViewInit, Component, Injector, Input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import dayjs from 'dayjs';
import { UtilFunctions } from 'src/app/helpers/util-functions';
import { controlValueAccessor } from 'src/app/providers/control-value-accessor';
import { AbstractControlAccessor } from '../abstract-control-accessor';

export enum MkjDateType {
  DATE = 'date',
  TIME = 'time',
  COMBINED = 'combined',
}

@Component({
  selector: 'mkj-date-input',
  templateUrl: './mkj-date-input.component.html',
  styleUrls: ['./mkj-date-input.component.scss'],
  providers: [controlValueAccessor(MkjDateInputComponent)],
})
export class MkjDateInputComponent
  extends AbstractControlAccessor<Date | string>
  implements ControlValueAccessor, AfterViewInit
{
  @Input()
  public type: MkjDateType = MkjDateType.COMBINED;

  @Input()
  public label: string;

  public internModel: Date | string;
  public isDisabled: boolean = false;
  public isDesktop: boolean = UtilFunctions.isDesktop();
  public nativeModel: string;
  public readonly MkjDateType = MkjDateType;

  constructor(inj: Injector) {
    super(inj);
    this.subs.sink = this.value$.subscribe((value) => {
      if (value) {
        this.nativeModel = value as string;
        switch (this.type) {
          case MkjDateType.DATE:
            this.internModel = new Date(value);
            break;
          case MkjDateType.TIME:
            this.internModel = value;
            break;
          case MkjDateType.COMBINED:
            this.internModel = new Date(value);
            break;
        }
      } else {
        this.internModel = null;
        this.nativeModel = null;
      }
    });
  }

  public onModelChange(newDate: Date | string) {
    if (!newDate) {
      this.change?.(null);
      return;
    }

    switch (this.type) {
      case MkjDateType.DATE:
        const date = dayjs(newDate).format('YYYY-MM-DD');
        this.change(date);
        break;
      case MkjDateType.TIME:
        const time = dayjs(newDate).format('HH:mm');
        this.change(time);
        break;
      case MkjDateType.COMBINED:
        const combined = dayjs(newDate).format('YYYY-MM-DD HH:mm:ss');
        this.change(combined);
        break;
    }
  }

  public onNativeModelChange(newDate: string) {
    if (!newDate) {
      this.change(null);
      return;
    }

    switch (this.type) {
      case MkjDateType.DATE:
        const date = dayjs(newDate).format('YYYY-MM-DD');
        this.change(date);
        break;
      case MkjDateType.TIME:
        this.change(newDate);
        break;
      case MkjDateType.COMBINED:
        const combined = dayjs(newDate).format('YYYY-MM-DD hh:mm:ss');
        this.change(combined);
        break;
    }
  }
}
