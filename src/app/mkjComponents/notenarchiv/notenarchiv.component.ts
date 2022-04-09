import { RoleType } from 'src/app/mkjInterfaces/User';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NotenService } from "./../../mkjServices/noten.service";
import { Component, OnInit } from "@angular/core";
import { Noten } from "src/app/mkjInterfaces/Noten";

@Component({
    selector: "app-notenarchiv",
    templateUrl: "./notenarchiv.component.html",
    styleUrls: ["./notenarchiv.component.scss"],
})
export class NotenarchivComponent implements OnInit {
    notenArray: Noten[];
    selectedNoten: Noten[];

    loading: boolean = false;

    editDialogVisible: boolean = false;
    editNoten: Noten;

    RoleType = RoleType;
    globalFilterText: string = '';

    constructor(private notenService: NotenService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService) { }

    ngOnInit(): void {
        this.getAllNoten();
        this.checkGlobalFilter();
    }

    getAllNoten() {
        this.loading = true;
        this.notenService.getAllNoten().subscribe({
            next: (res) => { (this.notenArray = res), this.loading = false }
        });
    }

    setFilteredRows(e) {
        this.selectedNoten = e.filteredValue;
    }

    openEditDialog(noten?: Noten) {
        if (noten) {
            this.editNoten = { ...noten };
        }
        else {
            this.editNoten = {};
        }
        this.editDialogVisible = true;
    }

    cancelEdit() {
        this.editNoten = null;
        this.editDialogVisible = false;

    }

    saveNoten() {
        if (this.editNoten.id) {
            this.notenService.updateNoten(this.editNoten).subscribe({
                next: res => {
                    this.editNoten = null;
                    let index = this.findIndexById(this.editNoten.id);
                    this.notenArray[index] = res; this.notenArray = [...this.notenArray];
                    this.messageService.add({ severity: 'success', summary: 'Erfolg', detail: 'Noten aktualisiert!', life: 3000 });
                    this.editDialogVisible = false;
                },
                error: error => {
                    this.messageService.add({ severity: 'error', summary: 'Fehler', detail: error.error.message, life: 3000 })
                }
            })
        }
        else {
            this.notenService.createNoten(this.editNoten).subscribe({
                next: res => {
                    this.editNoten = null;
                    this.notenArray.push(res);
                    this.notenArray = [...this.notenArray]
                    this.messageService.add({ severity: 'success', summary: 'Erfolg', detail: 'Noten hinzugefügt!', life: 3000 });
                    this.editDialogVisible = false;
                },
                error: error => {
                    this.messageService.add({ severity: 'error', summary: 'Fehler', detail: error.error.message, life: 3000 })
                }
            })
        }
    }

    deleteNoten(noten: Noten) {
        this.confirmationService.confirm({
            header: 'Noten löschen?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.notenService.deleteNoten(noten).subscribe(
                    () => this.notenArray = this.notenArray.filter(val => val.id !== noten.id),
                    (error) => this.messageService.add({ severity: 'error', summary: 'Fehler', detail: error.error.message, life: 3000 }),
                    () => this.messageService.add({ severity: 'success', summary: 'Erfolgreich', detail: 'Noten gelöscht!', life: 3000 })
                );
            }
        });
    }

    private findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.notenArray.length; i++) {
            if (this.notenArray[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }

    private checkGlobalFilter() {
        const globalFilter = JSON.parse(sessionStorage.getItem('notenTable-session'));
        if (globalFilter?.filters?.global?.value) {
            this.globalFilterText = globalFilter.filters.global.value;
        }
    }
}
