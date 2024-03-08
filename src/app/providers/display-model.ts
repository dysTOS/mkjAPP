import { InjectionToken } from '@angular/core';

export const DISPLAY_MODEL = new InjectionToken('DISPLAY_MODEL');

export function displayModel(model: any) {
  return {
    provide: DISPLAY_MODEL,
    useClass: model,
  };
}
