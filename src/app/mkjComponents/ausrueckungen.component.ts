import {Component, OnInit} from '@angular/core';
import { Product } from '../demo/domain/product';
import { ProductService } from '../demo/service/productservice';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { AusrueckungenService } from '../mkjServices/ausrueckungen.service';
import { Ausrueckung } from '../mkjInterfaces/Ausrueckung';

@Component({
    templateUrl: './ausrueckungen.component.html',
    styleUrls: ['./ausrueckungen.scss'],
    styles: [`
        :host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }

        @media screen and (max-width: 960px) {
            :host ::ng-deep .p-datatable.p-datatable-customers .p-datatable-tbody > tr > td:last-child {
                text-align: center;
            }

            :host ::ng-deep .p-datatable.p-datatable-customers .p-datatable-tbody > tr > td:nth-child(6) {
                display: flex;
            }
        }

    `],
    providers: [MessageService, ConfirmationService]
})
export class AusrueckungenComponent implements OnInit {
    ausrueckungDialog: boolean;

    ausrueckungenArray: Ausrueckung[]

    singleAusrueckung: Ausrueckung;

    selectedAusrueckungen: Ausrueckung[];

    submitted: boolean;
    updateAusrueckung: boolean;
    loading: boolean;

    cols: any[];

    kategorien: any[];
    status: any[];

    constructor(private ausrueckungService: AusrueckungenService, private messageService: MessageService,
                private confirmationService: ConfirmationService) {}

    ngOnInit() {
        this.loading = true;
        this.ausrueckungService.getAusrueckungen().subscribe(
            ausrueckungen => (this.ausrueckungenArray = ausrueckungen),
            (error) => console.log(error),
            () => this.loading = false
        );

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'von', header: 'Datum' },
            { field: 'typ', header: 'typ' },
            { field: 'status', header: 'Status' }
        ];

        this.kategorien = [
            { typ: 'Kurkonzert'},
            { typ: 'Weckruf'},
            { typ: 'Ständchen'},
        ];

        this.status = [
            { status: 'Fixiert'},
            { status: 'Geplant'},
            { status: 'Abgesagt'},
        ];
    }

    openNew() {
        this.singleAusrueckung = {};
        this.submitted = false;
        this.updateAusrueckung = false;
        this.ausrueckungDialog = true;
    }

    editAusrueckung(ausrueckung: Ausrueckung) {
        this.singleAusrueckung = {...ausrueckung};
        this.updateAusrueckung = true;
        this.ausrueckungDialog = true;
    }

    deleteAusrueckung(ausrueckung: Ausrueckung) {
        this.confirmationService.confirm({
            message: 'Soll die Ausrückung ' + ausrueckung.name + ' wirklich gelöscht werden?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.ausrueckungService.deleteAusrueckung(ausrueckung).subscribe(
                    () => this.ausrueckungenArray = this.ausrueckungenArray.filter(val => val.id !== ausrueckung.id),
                    (error) => this.messageService.add({severity: 'error', summary: 'Fehler', detail: 'Ausrückung konnte nicht gelöscht werden!', life: 3000}),
                    () => this.messageService.add({severity: 'success', summary: 'Erfolgreich', detail: 'Ausrückung gelöscht!', life: 3000})
                );
            }
        });
    }

    hideDialog() {
        this.ausrueckungDialog = false;
        this.submitted = false;
    }

    saveAusrueckung() {
        this.submitted = true;

        if (this.singleAusrueckung.name.trim()) {
            if (this.singleAusrueckung.id) {
                let index = this.ausrueckungenArray[this.findIndexById(this.singleAusrueckung.id)];
                this.ausrueckungService.updateAusrueckung(this.singleAusrueckung).subscribe(
                    (ausrueckungAPI) => this.ausrueckungenArray[this.findIndexById(this.singleAusrueckung.id)] = ausrueckungAPI,
                    (error) => this.messageService.add({severity: 'error', summary: 'Fehler', detail: 'Ausrückung konnte nicht aktualisiert werden!', life: 3000}),
                    () => this.messageService.add({severity: 'success', summary: 'Erfolgreich', detail: 'Ausrückung aktualisert!', life: 3000})
                );
            }
            else {
                this.ausrueckungService.createAusrueckung(this.singleAusrueckung).subscribe(
                    (ausrueckungAPI) => this.ausrueckungenArray.push(ausrueckungAPI),
                    (error) => this.messageService.add({severity: 'error', summary: 'Fehler', detail: 'Ausrückung konnte nicht erstellt werden!', life: 3000}),
                    () => this.messageService.add({severity: 'success', summary: 'Erfolgreich', detail: 'Ausrückung aktualisert!', life: 3000})
                );
            }

            this.ausrueckungenArray = [...this.ausrueckungenArray];
            this.ausrueckungDialog = false;
            this.singleAusrueckung = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.ausrueckungenArray.length; i++) {
            if (this.ausrueckungenArray[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for ( let i = 0; i < 5; i++ ) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }
}
