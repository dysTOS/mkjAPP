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

    constructor(private notenService: NotenService) { }

    ngOnInit(): void {
        this.getAllNoten();
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
}
