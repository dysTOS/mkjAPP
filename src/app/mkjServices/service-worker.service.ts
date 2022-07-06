import { Injectable } from "@angular/core";
import { SwUpdate, SwPush } from "@angular/service-worker";
import { InfoService } from "./info.service";
import { PushNotificationsService } from "./push-notifications.service";

@Injectable({
    providedIn: "root",
})
export class ServiceWorkerService {
    readonly VAPID_PUBLIC_KEY =
        "BGENo_p8KhjSBILPkraq4UYqvRHg3VnPUulZ-0NONyVHMb_-pQZAL2GJaIRKs6CM9jZ4YpIvgyWUBpAEGIGhGoI";

    constructor(
        private swUpdate: SwUpdate,
        private swPush: SwPush,
        private pushNotiService: PushNotificationsService,
        private infoService: InfoService
    ) {
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
    }
}
