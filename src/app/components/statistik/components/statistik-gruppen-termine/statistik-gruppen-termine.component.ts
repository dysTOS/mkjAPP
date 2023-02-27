import { Component, OnInit } from "@angular/core";
import { ChartData } from "chart.js";
import * as _ from "lodash";
import { StatistikApiService } from "src/app/services/api/statistik-api.service";
import { ThemeService } from "src/app/services/theme.service";

@Component({
    selector: "statistik-gruppen-termine",
    templateUrl: "./statistik-gruppen-termine.component.html",
    styleUrls: ["./statistik-gruppen-termine.component.scss"],
})
export class StatistikGruppenTermineComponent implements OnInit {
    public data: ChartData;
    public options: any;

    private _year: number = new Date().getFullYear();
    public get year(): number {
        return this._year;
    }
    public set year(value: number) {
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
        this.statistikService
            .getTermineNachGruppen(this.year.toString())
            .subscribe({
                next: (res) => {
                    this.data = {
                        labels: Object.keys(res).map((e) => {
                            if (!e) {
                                return "MKJ";
                            } else {
                                return e;
                            }
                        }),
                        datasets: [
                            {
                                data: Object.values(res),
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
