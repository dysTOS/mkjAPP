import { forwardRef } from "@angular/core";
import { NG_VALIDATORS } from "@angular/forms";

export const controlValidator = (component: any) => {
    return {
        provide: NG_VALIDATORS,
        multi: true,
        useExisting: forwardRef(() => component),
    };
};
