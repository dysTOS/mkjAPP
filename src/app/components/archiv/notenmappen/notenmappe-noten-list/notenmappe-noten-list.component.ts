import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { Noten } from 'src/app/models/Noten';
import { PermissionKey } from 'src/app/models/User';
import { displayModel } from 'src/app/providers/display-model';
import { NotenmappenApiService } from 'src/app/services/api/notenmappen-api.service';
import { UserService } from 'src/app/services/authentication/user.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { InfoService } from 'src/app/services/info.service';
import { NotenAutoCompleteConfigiguration } from 'src/app/utilities/_autocomplete-configurations/noten-autocomplete-config.class';
import { NotenDisplayModel } from 'src/app/utilities/_display-model-configurations/noten-display-model.class';
import { NotenListDatasource } from 'src/app/utilities/_list-datasources/noten-list-datasource.class';
import { MkjListComponent } from 'src/app/utilities/mkj-list/mkj-list.component';
import { SubSink } from 'subsink';
import { MappeNotenListConfig } from './mappe-noten-list-config.class';
import { MappeNotenListDatasource } from './mappe-noten-list-datasource.class';

@Component({
  selector: 'mkj-notenmappe-noten-list',
  templateUrl: './notenmappe-noten-list.component.html',
  providers: [NotenListDatasource, displayModel(NotenDisplayModel)],
})
export class NotenmappeNotenListComponent implements OnChanges {
  @Input()
  public mappenId: string;

  @Input()
  public editMode: boolean = false;

  @Input()
  public indexed: boolean = false;

  @ViewChild('list')
  public list: MkjListComponent<Noten>;

  public tableLocked: boolean = false;

  public readonly hasAssignPermission: boolean = false;

  public readonly PermissionMap = PermissionKey;

  public selectedNoten: Noten;
  public listDatasource: MappeNotenListDatasource;
  public listConfig = new MappeNotenListConfig();
  public readonly notenAutoCompleteConfig = new NotenAutoCompleteConfigiguration();
  public readonly syncNotenSubject = new Subject<Noten[]>();

  private _subs = new SubSink();

  constructor(
    public notenDatasource: NotenListDatasource,
    public configService: ConfigurationService,
    private notenmappenApiService: NotenmappenApiService,
    private infoService: InfoService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.hasAssignPermission = this.userService.hasPermission(PermissionKey.NOTENMAPPE_ASSIGN);
    this._subs.sink = this.syncNotenSubject
      .pipe(distinctUntilChanged(), debounceTime(500))
      .subscribe((noten) => this.syncNotenToMappe(noten));
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.indexed) {
      const listconfig = new MappeNotenListConfig();
      if (changes.indexed.currentValue == true && this.listConfig.columns[0].header !== 'Verzeichnis') {
        listconfig.columns = [
          {
            header: 'Verzeichnis',
            type: 'template',
            templateName: 'verzeichnisNrTemplate',
            styleClass: 'w-8rem',
          },
          ...this.listConfig.columns,
        ];
      }
      this.listConfig = listconfig;
    }
    if (changes.mappenId) {
      this.setListDatasource();
    }
    if (changes.editMode) {
      this.listConfig.globalFilter = changes.editMode.currentValue ? null : { fields: ['titel'] };
    }
  }

  public navigateToNoten(noten: Noten): void {
    this.router.navigate(['../../noten/', noten.id], {
      relativeTo: this.route,
    });
  }

  public syncNotenToMappe(noten: Noten[]): void {
    noten.forEach((n, i) => {
      if (n.pivot == null) {
        n.pivot = {};
      }
      n.pivot.orderIndex = i;
    });
    this.notenmappenApiService.syncNoten(this.mappenId, noten).subscribe({
      next: (res) => {},
      error: (err) => {
        this.infoService.error(err);
        this.setListDatasource();
      },
    });
  }

  private setListDatasource(): void {
    if (this.mappenId) {
      this.listDatasource = new MappeNotenListDatasource(this.notenmappenApiService, this.mappenId);
    } else {
      this.listDatasource = null;
    }
  }

  public addNotenToMappe(noten: Noten) {
    if (!noten) return;
    this.tableLocked = true;
    this.notenmappenApiService.attachNotenToMappe(noten.id, this.mappenId).subscribe({
      next: (res) => {
        this.setListDatasource();
        this.tableLocked = false;
        this.selectedNoten = null;
      },
      error: (err) => {
        this.tableLocked = false;
        this.selectedNoten = null;
        this.infoService.error(err);
      },
    });
  }

  public detachNotenFromMappe(noten: Noten) {
    this.tableLocked = true;
    this.infoService
      .confirmDelete(noten.titel + ' aus Mappe löschen?', () =>
        this.notenmappenApiService.detachNotenFromMappe(noten.id, this.mappenId)
      )
      .subscribe({
        next: (res) => {
          this.setListDatasource();
          this.tableLocked = false;
        },
        error: (err) => {
          this.tableLocked = false;
          this.infoService.error(err);
        },
      });
  }
}
