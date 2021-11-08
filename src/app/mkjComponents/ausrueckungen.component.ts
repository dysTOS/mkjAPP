import {Component, OnInit} from '@angular/core';
import { Product } from '../demo/domain/product';
import { ProductService } from '../demo/service/productservice';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { AusrueckungenService } from '../mkjServices/ausrueckungen.service';
import { Ausrueckung } from '../mkjInterfaces/Ausrueckung';

@Component({
    templateUrl: './ausrueckungen.component.html',
    styleUrls: ['../demo/view/tabledemo.scss'],
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
    productDialog: boolean;
    ausrueckungDialog: boolean;

    products: Product[];
    ausrueckungen: Ausrueckung[]

    product: Product;
    ausrueckung: Ausrueckung;

    selectedProducts: Product[];
    selectedAusrueckung: Ausrueckung[];

    submitted: boolean;

    cols: any[];

    constructor(private productService: ProductService, private ausrueckungService: AusrueckungenService, private messageService: MessageService,
                private confirmationService: ConfirmationService) {}

    ngOnInit() {

        this.ausrueckungService.getAusrueckungen().subscribe(
        ausrueckungen => (this.ausrueckungen = ausrueckungen),
        (error) => {console.log(error);}
    );

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
            { field: 'rating', header: 'Reviews' },
            { field: 'inventoryStatus', header: 'Status' }
        ];
    }

    openNew() {
        this.ausrueckung = {};
        this.submitted = false;
        this.ausrueckungDialog = true;
    }

    editAusrueckung(ausrueckung: Ausrueckung) {
        this.ausrueckung = {...ausrueckung};
        this.ausrueckungDialog = true;
    }

    deleteAusrueckung(ausrueckung: Ausrueckung) {
        this.confirmationService.confirm({
            message: 'Soll die Ausrückung ' + ausrueckung.name + ' wirklich gelöscht werden?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.ausrueckungService.deleteAusrueckung(ausrueckung).subscribe(
                    () => this.ausrueckungen = this.ausrueckungen.filter(val => val.id !== ausrueckung.id),
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

        if (this.ausrueckung.name.trim()) {
            if (this.ausrueckung.id) {
                let index = this.ausrueckungen[this.findIndexById(this.ausrueckung.id)];
                this.ausrueckungService.updateAusrueckung(this.ausrueckung).subscribe(
                    (ausrueckungAPI) => this.ausrueckungen[this.findIndexById(this.ausrueckung.id)] = ausrueckungAPI,
                    (error) => this.messageService.add({severity: 'error', summary: 'Fehler', detail: 'Ausrückung konnte nicht aktualisiert werden!', life: 3000}),
                    () => this.messageService.add({severity: 'success', summary: 'Erfolgreich', detail: 'Ausrückung aktualisert!', life: 3000})
                );
            }
            else {
                this.ausrueckungService.createAusrueckung(this.ausrueckung).subscribe(
                    (ausrueckungAPI) => this.ausrueckungen.push(ausrueckungAPI),
                    (error) => this.messageService.add({severity: 'error', summary: 'Fehler', detail: 'Ausrückung konnte nicht erstellt werden!', life: 3000}),
                    () => this.messageService.add({severity: 'success', summary: 'Erfolgreich', detail: 'Ausrückung aktualisert!', life: 3000})
                );
            }

            //this.ausrueckungen = [...this.ausrueckungen];
            this.ausrueckungDialog = false;
            this.ausrueckung = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.ausrueckungen.length; i++) {
            if (this.ausrueckungen[i].id === id) {
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
