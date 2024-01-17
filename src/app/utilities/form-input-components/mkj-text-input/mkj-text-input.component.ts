import {
    Component,
    EventEmitter,
    Injector,
    Input,
    Output,
} from "@angular/core";
import { controlValueAccessor } from "src/app/providers/control-value-accessor";
import { AbstractControlAccessor } from "../abstract-control-accessor";

@Component({
    selector: "mkj-text-input",
    templateUrl: "./mkj-text-input.component.html",
    styleUrls: ["./mkj-text-input.component.scss"],
    providers: [controlValueAccessor(MkjTextInputComponent)],
})
export class MkjTextInputComponent extends AbstractControlAccessor<string> {
    @Input()
    public iconRight: string;

    @Input()
    public clearable: boolean;

    @Output()
    public onBlur = new EventEmitter<void>();
    @Output()
    public onEnter = new EventEmitter<void>();

    constructor(inj: Injector) {
        super(inj);
    }

    public blur(): void {
        this.touch();
        this.onBlur.emit();
    }
}
