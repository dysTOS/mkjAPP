import { Component, OnInit } from "@angular/core";
import { ChartData } from "chart.js";
import * as _ from "lodash";
import { StatistikApiService } from "src/app/services/api/statistik-api.service";

@Component({
    selector: "statistik-mitglieder-geschlecht",
    templateUrl: "./statistik-mitglieder-geschlecht.component.html",
})
export class StatistikMitgliederGeschlechtComponent implements OnInit {
    public data: ChartData;
    public options: any;
    public loading = false;

    public colorMap = new Map<string, string>();

    constructor(private statistikService: StatistikApiService) {
        this.colorMap.set("M", "#4287f5");
        this.colorMap.set("W", "#f47aff");
        this.colorMap.set("D", "#614700");
        this.loading = true;
        this.statistikService.getMitgliederNachGeschlecht().subscribe({
            next: (res) => {
                this.data = {
                    labels: res.map((e) => e.label),
                    datasets: [
                        {
                            data: res.map((e) => e.count),
                            backgroundColor: res.map((e) =>
                                this.colorMap.get(e.label)
                            ),
                            hoverBackgroundColor: res.map(
                                (e) => this.colorMap.get(e.label) + "BB"
                            ),
                        },
                    ],
                };
                this.loading = false;
            },
        });
    }

    public ngOnInit(): void {
        this.options = {
            plugins: {
                legend: {
                    display: false,
                },
            },
        };
    }
}
