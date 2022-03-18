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

    constructor(private notenService: NotenService) {}

    ngOnInit(): void {
        this.getAllNoten();
    }

    getAllNoten() {
        this.notenService.getAllNoten().subscribe({
            next: (res) => (this.notenArray = res),
        });
    }
}
