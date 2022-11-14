import { forwardRef } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

export function controlValueAccessor(component: any) {
    return {
        provide: NG_VALUE_ACCESSOR,
        multi: true,
        useExisting: forwardRef(() => component),
    };
}
