import { Inject, Component, Input } from "@angular/core";
import { DisplayModelConfiguration } from "../_display-model-configurations/display-model-configuration.interface";
import { DISPLAY_MODEL } from "src/app/providers/display-model";

@Component({
    selector: "mkj-display-model",
    templateUrl: "./mkj-display-model.component.html",
})
export class MkjDisplayModelComponent<T> {
    @Input({ required: true })
    public model: T;

    constructor(
        @Inject(DISPLAY_MODEL)
        public config: DisplayModelConfiguration<T>
    ) {
        this.mapValues();
    }

    private mapValues(): void {
        this.config.fields.forEach((field) => {
            const value = this.model[field.field as keyof T];
            field.value = value;
        });
    }
}
