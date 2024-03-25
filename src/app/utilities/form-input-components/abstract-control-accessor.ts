import { Component, EventEmitter, Injector, Input, OnDestroy, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { BehaviorSubject, Observable, distinctUntilChanged } from 'rxjs';
import { SubSink } from 'subsink';
import _ from 'lodash';

@Component({
  selector: 'abstract-control-accessor',
  template: '',
})
export abstract class AbstractControlAccessor<T> implements ControlValueAccessor, OnDestroy {
  private _value = new BehaviorSubject<T>(null);
  private _disabled = new BehaviorSubject(false);

  private _onChange: (_: T) => void;
  private _onTouched: () => void;

  @Input()
  public set value(value: T) {
    this._value.next(value);
  }
  public get value(): T {
    return this._value.value;
  }

  public get disabled(): boolean {
    return this._disabled.value;
  }

  @Input()
  public set disabled(isDisabled: boolean) {
    this._disabled.next(isDisabled);
  }

  @Input()
  public label: string;

  @Input()
  public placeholder: string = '';

  @Input()
  public readonly: boolean = false;

  @Output()
  public valueChange = new EventEmitter<T>();

  public get value$(): Observable<T> {
    return this._value.asObservable();
  }

  public get disabled$(): Observable<boolean> {
    return this._disabled.pipe(distinctUntilChanged());
  }

  public formControl: FormControl;

  protected subs = new SubSink();

  constructor(private inj: Injector) {}

  public ngAfterViewInit() {
    this.formControl = this.inj.get(NgControl, null)?.control as FormControl;
  }

  public ngOnDestroy() {
    this.subs.unsubscribe();
  }

  public change(value: T) {
    this._onChange?.(value);
    this.valueChange.emit(value);
  }

  public touch() {
    this._onTouched?.();
  }

  /**
   * Override this method to convert the form model to the model used by concrete component.
   * @param model
   * @returns
   */
  protected convertModelToFormModel(model: T): any {
    return model;
  }

  writeValue(obj: T): void {
    const value = this.convertModelToFormModel(obj);
    this._value.next(value);
  }
  registerOnChange(fn: any): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this._disabled.next(isDisabled);
  }
}
