import {
    Inject,
    Component,
    Input,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
} from "@angular/core";
import { DisplayModelConfiguration } from "../_display-model-configurations/display-model-configuration.interface";
import { DISPLAY_MODEL } from "src/app/providers/display-model";

@Component({
    selector: "mkj-display-model",
    templateUrl: "./mkj-display-model.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MkjDisplayModelComponent<T> implements AfterViewInit {
    @Input({ required: true })
    public model: T;

    constructor(
        @Inject(DISPLAY_MODEL)
        public config: DisplayModelConfiguration<T>,
        private cd: ChangeDetectorRef
    ) {}

    public ngAfterViewInit(): void {
        this.setValues();
        this.cd.markForCheck();
    }

    private setValues(): void {
        this.config.fields.forEach((field) => {
            field.value = field.getValue(this.model);
        });
    }
}
