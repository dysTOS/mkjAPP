import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanDeactivate,
    RouterStateSnapshot,
    UrlTree,
} from "@angular/router";
import { ConfirmationService } from "primeng/api";
import { Observable, Subject } from "rxjs";

export interface EditComponentDeactivate {
    canDeactivate(): boolean;
}

@Injectable({
    providedIn: "root",
})
export class EditDeactivateGuard
    implements CanDeactivate<EditComponentDeactivate>
{
    constructor(private confirmationService: ConfirmationService) {}

    canDeactivate(
        component: EditComponentDeactivate,
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
