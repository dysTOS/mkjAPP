import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
} from "@angular/router";
import { ConfirmationService } from "primeng/api";
import { Observable, Subject } from "rxjs";
import { AbstractFormComponent } from "../utilities/form-components/_abstract-form-component.class";

@Injectable({
    providedIn: "root",
})
export class EditDeactivateGuard {
    constructor(private confirmationService: ConfirmationService) {}

    canDeactivate(
        component: AbstractFormComponent<any>,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        const subject = new Subject<boolean>();

        if (component.canDeactivate()) {
            return true;
        } else {
            this.confirmationService.confirm({
                header: "Seite verlassen?",
                message:
                    "Du hast deine Eingaben noch nicht gespeichert. Möchtest du die Seite wirklich verlassen?",
                icon: "pi pi-exclamation-triangle",
                accept: () => {
                    subject.next(true);
                    subject.complete();
                },
                reject: () => {
                    subject.next(false);
                    subject.complete();
                },
            });
            return subject.asObservable();
        }
    }
}
