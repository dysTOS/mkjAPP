import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { Kassabuch } from "src/app/models/Kassabuch";
import { PermissionKey } from "src/app/models/User";
import { KassabuchApiService } from "src/app/services/api/kassabuch-api.service";
import { MkjToolbarService } from "src/app/utilities/mkj-toolbar/mkj-toolbar.service";

@Component({
    selector: "app-kassabuch-details",
    templateUrl: "./kassabuch-details.component.html",
    styleUrls: ["./kassabuch-details.component.scss"],
})
export class KassabuchDetailsComponent implements OnInit {
    public kassabuch: Kassabuch;

    private _loading = new BehaviorSubject<boolean>(false);
    public readonly loading$ = this._loading.asObservable();

    constructor(
        private apiService: KassabuchApiService,
        private router: Router,
        private route: ActivatedRoute,
        private toolbarService: MkjToolbarService
    ) {
        this.toolbarService.header = "Kassabuch";
        this.toolbarService.backButton = true;
        this.toolbarService.buttons = [
            {
                label: "Bearbeiten",
                icon: "pi pi-pencil",
                click: () =>
                    this.router.navigate(
                        [
                            "../../buch",
                            this.route.snapshot.paramMap.get("buchId"),
                        ],
                        { relativeTo: this.route }
                    ),
                permissions: [PermissionKey.KASSABUCH_SAVE],
            },
        ];
    }

    public ngOnInit(): void {
        this.loadData();
    }

    public navigateBuchung(id: string): void {
        this.router.navigate([id], { relativeTo: this.route });
    }

    private loadData(): void {
        this._loading.next(true);
        const id = this.route.snapshot.paramMap.get("buchId");
        this.apiService.getById(id).subscribe((data) => {
            this.kassabuch = data;
            this._loading.next(false);
        });
    }
}
