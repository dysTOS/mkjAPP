import { Injectable } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { Observable, Subject } from "rxjs";
import { UtilFunctions } from "../helpers/util-functions";

@Injectable({
    providedIn: "root",
})
export class InfoService {
    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    public error(error: any) {
        if (typeof error === "string") {
            this.messageService.add({
                key: this.checkDisplayWidth(),
                severity: "error",
                summary: "Fehler",
                detail: error,
                life: 8000,
            });
            return;
        }

        if (error?.error?.message) {
            this.messageService.add({
                key: this.checkDisplayWidth(),
                severity: "error",
                summary: "Fehler",
                detail: error.error?.message,
                life: 8000,
            });
        }

        if (error?.error?.errors) {
            Object.values(error.error.errors).forEach((e) =>
                this.messageService.add({
                    key: this.checkDisplayWidth(),
                    severity: "error",
                    summary: "Fehler",
                    detail: e[0],
                    life: 8000,
                })
            );
        }
    }

    public success(details: string) {
        this.messageService.add({
            key: this.checkDisplayWidth(),
            severity: "success",
            summary: "Erfolg",
            detail: details,
            life: 2000,
        });
    }

    public info(details: string) {
        this.messageService.add({
            key: this.checkDisplayWidth(),
            severity: "info",
            summary: "Info",
            detail: details,
            life: 8000,
        });
    }

    public danger(details: string) {
        this.messageService.add({
            key: this.checkDisplayWidth(),
            severity: "warning",
            summary: "Warnung",
            detail: details,
            life: 6000,
        });
    }

    public pushNotification(notification: any) {
        this.messageService.add({
            key: this.checkDisplayWidth(),
            severity: "info",
            summary: "Push Notification",
            sticky: true,
            detail: notification,
        });
    }

    public confirmDelete(
        message: string,
        asyncCall: () => Observable<any>
    ): Observable<any> {
        const subject = new Subject();
        this.confirmationService.confirm({
            header: "Löschen?",
            icon: "pi pi-trash",
            message:
                message ??
                "Bist du sicher das dieser Datensatz gelöscht werden soll?",
            acceptLabel: "Löschen",
            rejectLabel: "Abbrechen",
            acceptButtonStyleClass: "p-button-danger",
            rejectButtonStyleClass: "p-button-text",
            accept: () => {
                asyncCall().subscribe({
                    next: (res) => {
                        subject.next(res);
                        subject.complete();
                    },
                    error: (err) => {
                        subject.error(err);
                        subject.complete();
                    },
                });
            },
            reject: () => {
                subject.error(null);
                subject.complete();
            },
        });
        return subject;
    }

    public confirm(message: string, options?: any): Observable<boolean> {
        const subject = new Subject<boolean>();
        this.confirmationService.confirm({
            header: options?.header ?? "Bestätigen",
            icon: options?.icon ?? "pi pi-exclamation-triangle",
            message:
                message ??
                "Bist du sicher das dieser Vorgang durchgeführt werden soll?",
            acceptLabel: options?.acceptLabel ?? "Bestätigen",
            rejectLabel: options?.rejectLabel ?? "Abbrechen",
            acceptButtonStyleClass: options?.acceptButtonStyleClass ?? "",
            rejectButtonStyleClass: options?.rejectButtonStyleClass ?? "",
            accept: () => {
                subject.next(true);
                subject.complete();
            },
            reject: () => {
                subject.next(false);
                subject.complete();
            },
        });
        return subject;
    }

    private checkDisplayWidth(): string | null {
        if (!UtilFunctions.isDesktop()) {
            return "bottom-center";
        }

        return undefined;
    }
}
