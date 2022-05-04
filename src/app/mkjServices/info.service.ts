import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class InfoService {

    constructor(private messageService: MessageService) { }

    public success(details: string) {
        this.messageService.add({
            severity: 'success', summary: 'Erfolg',
            detail: details,
            life: 2000,
        })
    }

    public error(error: any) {
        this.messageService.add({
            severity: 'error', summary: 'Fehler',
            detail: error.error?.message,
            sticky: true,
        })
    }

    public info(details: string) {
        this.messageService.add({
            severity: 'info', summary: 'Info',
            detail: details,
            life: 4000,
        })
    }

    public danger(details: string) {
        this.messageService.add({
            severity: 'danger', summary: 'Warnung',
            detail: details,
            life: 4000,
        })
    }
}

