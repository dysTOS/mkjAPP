import { Component, Injector, Input } from '@angular/core';
import { AbstractControl, ControlValueAccessor, ValidationErrors, Validator } from '@angular/forms';
import { controlValidator } from 'src/app/providers/control-validator';
import { controlValueAccessor } from 'src/app/providers/control-value-accessor';
import { AbstractControlAccessor } from '../abstract-control-accessor';

export type Link = {
  url: string;
  label: string;
};

@Component({
  selector: 'mkj-link-input',
  templateUrl: './mkj-link-input.component.html',
  styleUrls: ['./mkj-link-input.component.scss'],
  providers: [controlValueAccessor(MkjLinkInputComponent), controlValidator(MkjLinkInputComponent)],
})
export class MkjLinkInputComponent extends AbstractControlAccessor<string> implements Validator {
  private _jsonLinks: string;
  @Input()
  public get jsonLinks(): string {
    return this._jsonLinks;
  }
  public set jsonLinks(value: string) {
    this._jsonLinks = value;
    this.writeValue(value);
  }

  public links: Link[] = [];

  public addLink: Link = {
    url: null,
    label: null,
  };

  constructor(inj: Injector) {
    super(inj);
    this.subs.sink = this.value$.subscribe((value) => {
      try {
        this.links = JSON.parse(value) ?? [];
      } catch {
        this.links = [];
      }
    });
  }

  public addLinkToList(): void {
    if (this.addLink.url && this.addLink.label) {
      if (!this.addLink.url.startsWith('http')) {
        this.addLink.url = 'https://' + this.addLink.url;
      }
      this.links.push(this.addLink);
      this.addLink = {
        url: '',
        label: '',
      };
      this.onInternChange();
    }
  }

  public setValue(field: 'label' | 'url', value: string): void {
    this.addLink[field] = value;
    this.touch();
    this.formControl?.updateValueAndValidity();
  }

  public removeLink(index: number): void {
    this.links.splice(index, 1);
    this.onInternChange();
  }

  public onInternChange(): void {
    if (this.links.length === 0) {
      this.change(null);
    } else {
      const formattedValue = JSON.stringify(this.links);
      this.change(formattedValue);
    }
    this.touch();
  }

  public validate(control: AbstractControl<any, any>): ValidationErrors {
    if (!this.addLink.label && !this.addLink.url) {
      return null;
    }

    if (this.addLink.label || this.addLink.url) {
      return {
        unsafedEntries: true,
      };
    }

    const value = control.value;
    if (value) {
      try {
        JSON.parse(value);
      } catch {
        return {
          invalidJson: true,
        };
      }
    }
    return null;
  }
}
