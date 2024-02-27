import { Directive, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AbstractCrudApiService } from 'src/app/services/api/_abstract-crud-api-service';
import { InfoService } from 'src/app/services/info.service';
import { SubSink } from 'subsink';
import { MkjToolbarService } from '../mkj-toolbar/mkj-toolbar.service';

@Directive()
export abstract class AbstractFormComponent<T> implements OnInit, OnDestroy {
  public formGroup: FormGroup;

  protected navigateBackOnSave = true;
  protected navigateBackRouteString = '../';

  private _loading = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this._loading.asObservable();
  private _saving = new BehaviorSubject<boolean>(false);
  public readonly saving$ = this._saving.asObservable();

  private _loadedModel: T;

  protected subs = new SubSink();

  constructor(
    protected toolbarService: MkjToolbarService,
    protected apiService: AbstractCrudApiService<T>,
    protected infoService: InfoService,
    protected route: ActivatedRoute,
    protected router: Router
  ) {}

  public ngOnInit(): void {
    this.initToolbar();
    this.formGroup = this.initFormGroup();
    this.loadData();
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  protected abstract initToolbar(): void;
  protected abstract initFormGroup(): FormGroup;
  protected abstract getId(): string | 'new';

  protected dataLoaded(data: T): void {}

  public canDeactivate(): boolean {
    if (!this.formGroup.dirty) {
      return true;
    }
    return false;
  }

  public save(): void {
    if (this.formGroup.invalid) {
      throw new Error('Cannot save invalid data');
    }

    this._saving.next(true);
    const model = {
      ...this._loadedModel,
      ...this.formGroup.getRawValue(),
    };
    if (this.getId() !== 'new') {
      this.apiService.update(model).subscribe({
        next: () => {
          this.infoService.success('Gespeichert');
          this.formGroup.markAsPristine();
          this._saving.next(false);
          if (this.navigateBackOnSave) {
            this.router.navigate([this.navigateBackRouteString], {
              relativeTo: this.route,
            });
          }
        },
        error: (err) => {
          this.infoService.error(err);
          this._saving.next(false);
        },
      });
    } else {
      this.apiService.create(model).subscribe({
        next: (res) => {
          this.infoService.success('Gespeichert');
          this.formGroup.patchValue(res);
          this.formGroup.markAsPristine();
          this._saving.next(false);
          if (this.navigateBackOnSave) {
            this.router.navigate([this.navigateBackRouteString], {
              relativeTo: this.route,
            });
          } else {
            this.router
              .navigate([`../${(res as any).id}`], {
                relativeTo: this.route,
              })
              .then(() => {
                this.toolbarService.temporaryBackRoute = {
                  backRoute: this.navigateBackRouteString,
                  route: this.route,
                };
                this.initToolbar();
              });
          }
        },
        error: (err) => {
          this.infoService.error(err);
          this._saving.next(false);
        },
      });
    }
  }

  public reload(): void {
    this.infoService
      .confirm('Sollen alle Änderungen zurückgesetzt werden?', {
        icon: 'pi pi-refresh',
        acceptLabel: 'Reset',
      })
      .subscribe({
        next: (accpted) => {
          if (accpted) {
            this.formGroup.reset();
            this.formGroup.markAsPristine();
            this.formGroup.markAsUntouched();
            this.loadData();
          }
        },
      });
  }

  protected delete(): void {
    const id = this.getId();
    if (id === 'new') {
      throw new Error('Cannot delete unsaved data');
    }
    this.infoService
      .confirmDelete(null, () => {
        this._loading.next(true);
        return this.apiService.delete(id);
      })
      .subscribe({
        next: () => {
          this.infoService.success('Gelöscht');
          this.formGroup.markAsPristine();
          this.formGroup.markAsUntouched();
          this.router.navigate([this.navigateBackRouteString], {
            relativeTo: this.route,
          });
        },
        error: (err) => {
          this.infoService.error(err);
          this._loading.next(false);
        },
      });
  }

  private loadData(): void {
    const id = this.getId();
    if (id === 'new') return;

    this._loading.next(true);
    this.apiService.getById(id).subscribe({
      next: (data) => {
        this._loadedModel = data;
        this.dataLoaded(data);
        this.formGroup.patchValue(data);
        this.formGroup.markAsPristine();
        this.formGroup.markAsUntouched();
        this._loading.next(false);
      },
    });
  }
}
