import { Component, OnInit } from "@angular/core";
import { Konzert } from "src/app/mkjInterfaces/Noten";
import { NotenService } from "src/app/mkjServices/noten.service";

@Component({
    selector: "app-konzerte",
    templateUrl: "./konzerte.component.html",
    styleUrls: ["./konzerte.component.scss"],
})
export class KonzerteComponent implements OnInit {
    public konzerte: Konzert[];
    public loading: boolean = false;

    public selectedRow: Konzert;

    constructor(private notenService: NotenService) {}

    ngOnInit(): void {
        this.loadNoten();
    }

    private loadNoten() {
        this.loading = true;
        this.notenService.getKonzerte().subscribe({
            next: (res) => {
                this.konzerte = res;
                this.loading = false;
            },
        });
    }
}
