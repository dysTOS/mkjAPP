import { ApplicationRef, Injectable } from "@angular/core";
import { SwUpdate, SwPush } from "@angular/service-worker";
import { InfoService } from "./info.service";
import { PushNotificationsService } from "./push-notifications.service";
import { first } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class ServiceWorkerService {
    readonly VAPID_PUBLIC_KEY =
        "BIsIB28fImumACBAnl09t3HKyJLBJDGKj17Nc7HFKhiRSzFYQdRUBfL0Yfrab8QpEl1ItEajx72I1Wje-yq7j-s";

    constructor(
        private appRef: ApplicationRef,
        private swUpdate: SwUpdate,
        private swPush: SwPush,
        private pushNotiService: PushNotificationsService,
        private infoService: InfoService
    ) {
        // Allow the app to stabilize first, before starting
        // polling for updates with `interval()`.
        const appIsStable$ = appRef.isStable.pipe(
            first((isStable) => isStable === true)
        );

        appIsStable$.subscribe(() => swUpdate.checkForUpdate());

        this.swUpdate.versionUpdates.subscribe((update) => {
            if (update.type === "VERSION_DETECTED") {
                if (confirm("UPDATE! Die mkjAPP wird kurz neu geladen...")) {
                    setTimeout(
                        () => this.infoService.info("Update erfolgreich!"),
                        2000
                    );
                    this.swUpdate
                        .activateUpdate()
                        .then((res) => window.location.reload())
                        .catch((err) => console.log(err));
                }
            }
        });
        this.swPush
            .requestSubscription({
                serverPublicKey: this.VAPID_PUBLIC_KEY,
            })
            .then((sub) => {
                console.log("Push subscription: ", sub);
                this.pushNotiService.subscribeUser(sub).subscribe(
                    (res) => console.log(res),
                    (err) => console.log(err)
                );
            })
            .catch((err) =>
                console.error("Could not subscribe to notifications", err)
            );

        this.swPush.messages.subscribe({
            next: (res) => console.log(res),
            error: (err) => console.log(err),
        });
    }
}
