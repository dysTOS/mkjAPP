import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Kassabuchung } from "src/app/models/Kassabuch";
import { KassabuchungenApiService } from "src/app/services/api/kassabuchungen-api.service";
import { MkjToolbarService } from "src/app/utilities/mkj-toolbar/mkj-toolbar.service";

@Component({
    selector: "mkj-rechnung",
    templateUrl: "./mkj-rechnung.component.html",
    styleUrls: ["./mkj-rechnung.component.scss"],
})
export class MkjRechnungComponent {
    public re: Kassabuchung;

    constructor(
        private apiService: KassabuchungenApiService,
        private route: ActivatedRoute,
        private toolbarService: MkjToolbarService
    ) {
        toolbarService.backButton = true;
        toolbarService.buttons = [
            {
                label: "Drucken",
                icon: "pi pi-print",
                click: () => window.print(),
            },
        ];
        const id = this.route.snapshot.params.id;
        this.loadKassabuchung(id);
    }

    private loadKassabuchung(id: string): void {
        this.apiService.getById(id).subscribe((re) => {
            this.re = re;
            this.toolbarService.header = `Rechnung ${re.nummer ?? ""}`;
        });
    }
}
