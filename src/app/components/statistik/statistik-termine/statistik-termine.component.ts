import { Component, OnInit } from "@angular/core";
import { ChartData } from "chart.js";
import { StatistikApiService } from "src/app/services/api/statistik-api.service";
import * as _ from "lodash";
import { ThemeService } from "src/app/services/theme.service";

@Component({
    selector: "statistik-termine",
    templateUrl: "./statistik-termine.component.html",
    styleUrls: ["./statistik-termine.component.scss"],
})
export class StatistikTermineComponent implements OnInit {
    public data: ChartData;
    public options: any;

    private _year: string = new Date().getFullYear().toString();
    public get year(): string {
        return this._year;
    }
    public set year(value: string) {
        this._year = value;
        this.loadTermine();
    }

    public loading = false;

    constructor(
        private statistikService: StatistikApiService,
        private themeService: ThemeService
    ) {}

    public ngOnInit(): void {
        this.loadTermine();

        this.options = {
            plugins: {
                legend: {
                    position: "bottom",
                    labels: {
                        color: this.themeService.darkMode ? "#eee" : "#111",
                    },
                },
            },
        };
    }

    private loadTermine(): void {
        this.loading = true;
        this.statistikService.getTermine(this.year).subscribe({
            next: (res) => {
                this.data = {
                    labels: res.map(
                        (e) => _.startCase(e.label) + " (" + e.count + ")"
                    ),
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
}
