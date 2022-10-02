import { NG_VALUE_ACCESSOR } from "@angular/forms";

export const controlValueAccessor = (component: any) => {
    return {
        provide: NG_VALUE_ACCESSOR,
        multi: true,
        useExisting: component,
    };
};
