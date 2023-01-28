import { Component, OnInit } from "@angular/core";
import { ChartData } from "chart.js";
import * as _ from "lodash";
import { StatistikApiService } from "src/app/services/api/statistik-api.service";

@Component({
    selector: "statistik-mitglieder",
    templateUrl: "./statistik-mitglieder.component.html",
})
export class StatistikMitgliederComponent implements OnInit {
    public data: ChartData;
    public options: any;
    public loading = false;

    constructor(private statistikService: StatistikApiService) {
        this.loading = true;
        this.statistikService.getMitglieder().subscribe({
            next: (res) => {
                this.data = {
                    labels: res.map((e) => _.startCase(e.label + "0er")),
                    datasets: [
                        {
                            data: res.map((e) => e.count),
                            backgroundColor: [
                                "#42A5F5",
                                "#66BB6A",
                                "#FFA726",
                                "#006155",
                            ],
                            hoverBackgroundColor: [
                                "#42A5F5BB",
                                "#66BB6ABB",
                                "#FFA726BB",
                                "#006155BB",
                            ],
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
