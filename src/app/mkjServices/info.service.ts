import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class InfoService {

    constructor(private messageService: MessageService) { }

    public error(error: any) {
        if (typeof error === 'string') {
            this.messageService.add({
                severity: 'error', summary: 'Fehler',
                detail: error,
                life: 8000,
            })
            return;
        }

        if (error?.error?.message) {
            this.messageService.add({
                severity: 'error', summary: 'Fehler',
                detail: error.error?.message,
                life: 8000,
            })
        }

        if (error?.errors) {
            error.errors.foreach((e) =>
                this.messageService.add({
                    severity: 'error', summary: 'Fehler',
                    detail: e,
                    life: 8000,
                })
            )
        }
    }

    public success(details: string) {
        this.messageService.add({
            severity: 'success', summary: 'Erfolg',
            detail: details,
            life: 2000,
        })
    }

    public info(details: string) {
        this.messageService.add({
            severity: 'info', summary: 'Info',
            detail: details,
            life: 8000,
        })
    }

    public danger(details: string) {
        this.messageService.add({
            severity: 'danger', summary: 'Warnung',
            detail: details,
            life: 6000,
        })
    }
}

