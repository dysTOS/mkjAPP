import { Component, HostListener, Input } from "@angular/core";
import { ValidationErrors } from "@angular/forms";
import { Subject, debounceTime } from "rxjs";
import { AbstractFormComponent } from "../_abstract-form-component.class";

@Component({
    selector: "mkj-form-wrapper",
    templateUrl: "./mkj-form-wrapper.component.html",
    styleUrls: ["./mkj-form-wrapper.component.scss"],
})
export class MkjFormWrapperComponent {
    @HostListener("window:beforeunload", ["$event"])
    public unloadNotification($event: any) {
        if (!this.component.canDeactivate()) {
            $event.returnValue = "Änderungen könnten verloren gehen!";
        }
    }

    @Input()
    public component: AbstractFormComponent<any>;

    @Input()
    public set errors(errors: ValidationErrors) {
        this._errors.next(errors);
    }

    private _errors = new Subject<ValidationErrors>();
    public readonly errors$ = this._errors
        .asObservable()
        .pipe(debounceTime(800));
}
