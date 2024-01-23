import { InjectionToken, Provider } from "@angular/core";

export const DISPLAY_MODEL = new InjectionToken("DISPLAY_MODEL");

export function displayModel(component: any): Provider {
    return {
        provide: DISPLAY_MODEL,
        useClass: component,
        multi: true,
    };
}
