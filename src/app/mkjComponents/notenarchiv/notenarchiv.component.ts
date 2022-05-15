import { InfoService } from './../../mkjServices/info.service';
import { RoleType } from 'src/app/mkjInterfaces/User';
import { ConfirmationService } from 'primeng/api';
import { NotenService } from "./../../mkjServices/noten.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Noten } from "src/app/mkjInterfaces/Noten";
import { Table } from 'primeng/table';

@Component({
    selector: "app-notenarchiv",
    templateUrl: "./notenarchiv.component.html",
    styleUrls: ["./notenarchiv.component.scss"],
})
export class NotenarchivComponent implements OnInit {
    notenArray: Noten[];
    selectedNoten: Noten[];

    loading: boolean = false;
    isAdding: boolean = false;

    editDialogVisible: boolean = false;
    editNoten: Noten;

    RoleType = RoleType;
    globalFilterText: string = '';

    selectedRow: any;

    @ViewChild('notenTable')
    notenTable: Table;

    constructor(private notenService: NotenService,
        private confirmationService: ConfirmationService,
        private infoService: InfoService) { }

    ngOnInit(): void {
        this.getAllNoten();
        this.checkGlobalFilter();
    }

    getAllNoten() {
        this.loading = true;
        this.notenService.getAllNoten().subscribe({
            next: (res) => { (this.notenArray = res), this.loading = false },
            error: (err) => {
                this.infoService.error(err), this.loading = false
            }
        }
        );
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
        this.editDialogVisible = false;
        this.editNoten = null;

    }

    saveNoten() {
        this.isAdding = true;
        if (this.editNoten.id) {
            this.notenService.updateNoten(this.editNoten).subscribe({
                next: res => {
                    let index = this.findIndexById(this.editNoten.id);
                    this.notenArray[index] = res;
                    this.notenArray = [...this.notenArray];
                    this.infoService.success(this.editNoten.titel + ' aktualisiert!');
                    this.editDialogVisible = false;
                    this.editNoten = null;
                    this.isAdding = false;
                },
                error: error => {
                    this.isAdding = false;
                    this.infoService.error(error);
                }
            })
        }
        else {
            this.notenService.createNoten(this.editNoten).subscribe({
                next: res => {
                    this.notenArray.push(res);
                    this.notenArray = [...this.notenArray]
                    this.infoService.success('Noten hinzugefügt!');
                    this.editDialogVisible = false;
                    this.editNoten = null;
                    this.isAdding = false;
                },
                error: error => {
                    this.isAdding = false;
                    this.infoService.error(error);
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
                    {
                        next: () => {
                            this.notenArray = this.notenArray.filter(val => val.id !== noten.id);
                            this.infoService.success('Noten gelöscht!')
                        },
                        error: (err) => this.infoService.error(err)
                    }
                );
            }
        });
    }

    private findIndexById(id: string): number {
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

    onRowSelect(event) {
        this.notenTable.toggleRow(event.data);
    }

    onRowUnselect(event) {
        this.notenTable.toggleRow(event.data);
    }
}