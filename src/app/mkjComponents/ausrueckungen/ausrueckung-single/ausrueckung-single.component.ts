import { MessageService } from 'primeng/api';
import { MitgliederService } from './../../../mkjServices/mitglieder.service';
import { Mitglied } from 'src/app/mkjInterfaces/Mitglied';
import { NotenService } from './../../../mkjServices/noten.service';
import { AusrueckungenService } from '../../../mkjServices/ausrueckungen.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Ausrueckung } from 'src/app/mkjInterfaces/Ausrueckung';
import { Noten } from 'src/app/mkjInterfaces/Noten';

@Component({
    selector: 'app-ausrueckung-single',
    templateUrl: './ausrueckung-single.component.html',
    styleUrls: ['./ausrueckung-single.component.scss']
})
export class AusrueckungSingleComponent implements OnInit {
    ausrueckung: Ausrueckung;

    loading: boolean = true;
    notenLoading: boolean = true;

    gespielteNoten: Noten[] = [];
    searchNotenResult: Noten[];
    selectedNoten: Noten;

    mitglieder: Mitglied[];
    presentMitglieder: Mitglied[] = [];

    constructor(private router: Router, private route: ActivatedRoute,
        private ausrueckungenService: AusrueckungenService, private messageService: MessageService,
        private mitgliedService: MitgliederService, private notenService: NotenService) { }

    ngOnInit(): void {
        if (this.ausrueckungenService.hasSelectedAusrueckung()) {
            this.ausrueckung = this.ausrueckungenService.getSelectedAusrueckung();
            this.loading = false;
            this.getGespielteNoten();
            this.getAktiveMitglieder(this.ausrueckung.id);
        }
        else {
            this.route.params.subscribe(e => {
                this.getAktiveMitglieder(e.id);
                this.ausrueckungenService.getSingleAusrueckung(e.id).subscribe(
                    (ausrueckung) => {
                        this.ausrueckung = ausrueckung
                            , this.getGespielteNoten()
                    },
                    (error) => { },
                    () => this.loading = false
                );
            });
        }

    }

    getAktiveMitglieder(id: number) {
        this.mitgliedService.getAllMitglieder().subscribe({
            next: res => {
                this.mitglieder = res;
            }
        })
        this.mitgliedService.getMitgliederForAusrueckung(id).subscribe({
            next: res =>
                this.presentMitglieder = res
        })
    }

    onMitgliederChange(event) {
        console.log(event)
        let newSelection = event.value;
        let attachMitglied = newSelection.filter(e => !this.presentMitglieder.includes(e))
        let detachMitglied = this.presentMitglieder.filter(e => !newSelection.includes(e))
        // console.log("ATTACH", attachRole, "DETACH", detachMitglied)
        this.presentMitglieder = newSelection;
        if (attachMitglied[0]) {
            this.mitgliedService.attachMitgliedToAusrueckung(this.ausrueckung.id, attachMitglied[0].id).subscribe({
                next: (res) => this.messageService.add(
                    { severity: 'success', summary: 'Erfolg', detail: res.message, life: 3000 }),
                error: (error) => this.messageService.add(
                    { severity: 'error', summary: 'Fehler', detail: error.error.message, life: 3000 })
            })
        }
        if (detachMitglied[0]) {
            this.mitgliedService.detachMitgliedFromAusrueckung(this.ausrueckung.id, detachMitglied[0].id).subscribe({
                next: (res) => this.messageService.add(
                    { severity: 'warn', summary: 'Erfolg', detail: res.message, life: 3000 }),
                error: (error) => this.messageService.add(
                    { severity: 'error', summary: 'Fehler', detail: error.error.message, life: 3000 })
            })
        }
    }

    getGespielteNoten() {
        this.notenLoading = true;
        this.notenService.getNotenForAusrueckung(this.ausrueckung.id).subscribe({
            next: res => { this.gespielteNoten = res },
            complete: () => this.notenLoading = false
        })
    }

    searchNoten(event) {
        this.notenService.searchNoten(event.query).subscribe({
            next: res => this.searchNotenResult = res
        })
    }

    attachNoten(event) {
        this.notenService.attachNotenToAusrueckung(event.id, this.ausrueckung.id).subscribe({
            next: res => {
                console.log(res);
                this.gespielteNoten = [event, ...this.gespielteNoten];
            },
            complete: () => this.selectedNoten = null
        })
    }

    detachNoten(event) {
        this.notenService.detachNotenFromAusrueckung(event.id, this.ausrueckung.id).subscribe({
            next: res => {
                console.log(res);
                this.gespielteNoten = this.gespielteNoten.filter(e => e.id !== event.id);
            },
            complete: () => this.selectedNoten = null
        })
    }

    navigateBack() {
        this.ausrueckungenService.setSelectedAusrueckung(null);
        this.router.navigate(['/ausrueckungen'], { relativeTo: this.route });
    }

}
