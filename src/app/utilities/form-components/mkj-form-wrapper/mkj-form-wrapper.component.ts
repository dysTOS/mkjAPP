import { Component, HostListener, Input } from "@angular/core";
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
        return null;
    }

    @Input()
    public component: AbstractFormComponent<any>;
}
