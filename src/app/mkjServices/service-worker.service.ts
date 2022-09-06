import { ApplicationRef, Injectable } from "@angular/core";
import { SwUpdate, SwPush, VersionEvent } from "@angular/service-worker";
import { InfoService } from "./info.service";
import { PushNotificationsService } from "./push-notifications.service";
import { BehaviorSubject, first, Subscription } from "rxjs";
import { environment } from "src/environments/environment";
import { ConfirmationService } from "primeng/api";
import { Router } from "@angular/router";

@Injectable({
    providedIn: "root",
})
export class ServiceWorkerService {
    private updateSub$: Subscription;
    private pushSub$: Subscription;

    private lastVersionEvent: VersionEvent;
    private lastPushSub: PushSubscription;

    constructor(
        private appRef: ApplicationRef,
        private swUpdate: SwUpdate,
        private swPush: SwPush,
        private pushNotiService: PushNotificationsService,
        private confirmationService: ConfirmationService,
        private infoService: InfoService,
        private router: Router
    ) {
        this.updateSub$ = this.swUpdate.versionUpdates.subscribe((update) => {
            if (update.type === "VERSION_DETECTED") {
                this.confirmationService.confirm({
                    header: "UPDATE verfügbar!",
                    message: "Kann die mkjAPP kurz neu geladen werden?",
                    icon: "pi pi-exclamation-triangle",
                    accept: () => {
                        this.swUpdate
                            .activateUpdate()
                            .then((res) => window.location.reload())
                            .catch((err) => console.log(err));
                    },
                });
            }
        });

        this.pushSub$ = this.swPush.subscription.subscribe({
            next: (pushSub) => {
                if (pushSub === null) {
                    this.requestPushSubscription();
                } else {
                    this.lastPushSub = pushSub;
                }
            },
        });

        this.swPush.messages.subscribe({
            next: (res: any) => {
                console.log("MESSAGE:", res);
                navigator.serviceWorker.ready.then((registration) => {
                    registration.showNotification(res.title, res);
                });
            },
            error: (err) => this.infoService.error(err),
        });

        this.swPush.notificationClicks.subscribe({
            next: (res) => {
                this.pushNotiService.handleNotificationAction(res);
                console.log("NOTIFICATION CLICK:", res);
            },
            error: (err) => this.infoService.error(err),
        });
    }

    private requestPushSubscription() {
        this.swPush
            .requestSubscription({
                serverPublicKey: environment.vapidPublicKey,
            })
            .then((pushSub) => {
                console.log("Push subscription: ", pushSub);
                this.pushNotiService.subscribeUser(pushSub).subscribe(
                    (res) =>
                        this.infoService.success(
                            "Push Benachrichtigungen abonniert!"
                        ),
                    (err) => console.log(err)
                );
            })
            .catch((err) =>
                console.error("Could not subscribe to notifications", err)
            );
    }
}
