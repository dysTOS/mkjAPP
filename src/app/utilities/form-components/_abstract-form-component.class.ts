import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { AbstractCrudApiService } from "src/app/services/api/_abstract-crud-api-service";
import { InfoService } from "src/app/services/info.service";
import { MkjToolbarService } from "../mkj-toolbar/mkj-toolbar.service";

export abstract class AbstractFormComponent<T> {
    public formGroup: FormGroup;

    private _loading = new BehaviorSubject<boolean>(false);
    public readonly loading$ = this._loading.asObservable();
    private _saving = new BehaviorSubject<boolean>(false);
    public readonly saving$ = this._saving.asObservable();

    private _loadedModel: T;

    constructor(
        protected toolbarService: MkjToolbarService,
        protected apiService: AbstractCrudApiService<T>,
        protected infoService: InfoService,
        protected route: ActivatedRoute,
        protected router: Router
    ) {
        this.toolbarService.backButton = true;
        this.formGroup = this.initFormGroup();
        this.loadData();
    }

    protected abstract initFormGroup(): FormGroup;

    protected abstract getId(): string | "new";

    public canDeactivate(): boolean {
        if (!this.formGroup.dirty) {
            return true;
        }
        return false;
    }

    public save(): void {
        if (this.formGroup.invalid) {
            throw new Error("Cannot save invalid data");
        }

        this._saving.next(true);
        const model = {
            ...this._loadedModel,
            ...this.formGroup.getRawValue(),
        };
        if (this.getId() !== "new") {
            this.apiService.update(model).subscribe({
                next: () => {
                    this.infoService.success("Gespeichert");
                    this.formGroup.markAsPristine();
                    this._saving.next(false);
                },
                error: (err) => {
                    this.infoService.error(err);
                    this._saving.next(false);
                },
            });
        } else {
            this.apiService.create(model).subscribe({
                next: (res) => {
                    this.infoService.success("Gespeichert");
                    this.formGroup.patchValue(res);
                    this.formGroup.markAsPristine();
                    // this.router.navigate([`../${(res as any).id}`], {
                    //     relativeTo: this.route,
                    // });
                    this._saving.next(false);
                },
                error: (err) => {
                    this.infoService.error(err);
                    this._saving.next(false);
                },
            });
        }
    }

    public reload(): void {
        this.loadData();
        //TODO ask for confirmation OR change deactivate-guard logic
    }

    public delete(): void {
        this._loading.next(true);
        if (this.getId() === "new") {
            throw new Error("Cannot delete unsaved data");
        }
        this.infoService
            .confirmDelete(null, () => this.apiService.delete(this.getId()))
            .subscribe({
                next: () => {
                    this.infoService.success("Gelöscht");
                    this.router.navigate(["../"], { relativeTo: this.route });
                },
                error: (err) => {
                    this.infoService.error(err);
                    this._loading.next(false);
                },
            });
    }

    private loadData(): void {
        const id = this.getId();
        if (id === "new") {
            this.toolbarService.header = "Neu";
            return;
        }

        this._loading.next(true);
        this.apiService.getById(id).subscribe({
            next: (data) => {
                this._loadedModel = data;
                this.formGroup.patchValue(data);
                this.formGroup.markAsPristine();
                this._loading.next(false);
            },
        });
    }
}
