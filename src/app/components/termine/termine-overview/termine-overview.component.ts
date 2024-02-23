import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { Termin } from 'src/app/models/Termin';
import { PermissionKey } from 'src/app/models/User';
import { displayModel } from 'src/app/providers/display-model';
import { TermineApiService } from 'src/app/services/api/termine-api.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { ExportService } from 'src/app/services/export.service';
import { InfoService } from 'src/app/services/info.service';
import { PdfCreatorService } from 'src/app/services/pdf-creator.service';
import { TerminDisplayModel } from 'src/app/utilities/_display-model-configurations/termin-display-model.class';
import { TermineListConfig } from 'src/app/utilities/_list-configurations/termine-list-config.class';
import { TermineListDatasource } from 'src/app/utilities/_list-datasources/termine-list-datasource.class';
import { MkjListComponent } from 'src/app/utilities/mkj-list/mkj-list.component';
import { MkjToolbarService } from 'src/app/utilities/mkj-toolbar/mkj-toolbar.service';

@Component({
  templateUrl: './termine-overview.component.html',
  styleUrls: ['./termine-overview.component.scss'],
  providers: [TermineListDatasource, TermineListConfig, displayModel(TerminDisplayModel)],
})
export class TermineOverviewComponent {
  @ViewChild('exportMenu') exportMenu: Menu;
  @ViewChild('list') list: MkjListComponent<Termin>;

  public selectedRow: Termin;

  public exportMenuItems: MenuItem[] = [
    {
      label: 'PDF',
      icon: 'pi pi-file-pdf',
      command: () => this.exportPdf(),
    },
    // {
    //   label: 'Excel',
    //   icon: 'pi pi-file-excel',
    //   command: () => this.exportExcel(),
    // },
    // {
    //   label: 'CSV',
    //   icon: 'pi pi-file',
    //   // command: () => this.exportCsv(),
    // },
  ];

  public readonly Permissions = PermissionKey;

  constructor(
    public datasource: TermineListDatasource,
    public listConfig: TermineListConfig,
    private termineApiService: TermineApiService,
    private infoService: InfoService,
    private router: Router,
    private route: ActivatedRoute,
    private exportService: ExportService,
    private namingService: ConfigurationService,
    public toolbarService: MkjToolbarService,
    private pdfCreatorService: PdfCreatorService
  ) {
    this.toolbarService.header = this.namingService.uiNaming.Termine;
    this.toolbarService.buttons = [
      {
        icon: 'pi pi-plus',
        click: () => this.navigateEditor(),
        label: 'Neu',
        permissions: [PermissionKey.TERMIN_SAVE, PermissionKey.TERMIN_GRUPPENLEITER_SAVE],
      },
      {
        icon: 'pi pi-download',
        click: ($event) => this.exportMenu.show($event),
        label: 'Export',
      },
    ];
  }

  public duplicateAusrueckung(ausrueckung: Termin) {
    const duplicateAusrueckung = _.cloneDeep(ausrueckung);
    duplicateAusrueckung.id = null;
    duplicateAusrueckung.created_at = null;
    duplicateAusrueckung.updated_at = null;
    duplicateAusrueckung.name = duplicateAusrueckung.name + ' - KOPIE';

    this.termineApiService.create(duplicateAusrueckung).subscribe({
      next: (res) => {
        this.navigateEditor(res);
        this.infoService.success('Termin dupliziert!');
      },
      error: (err) => {
        this.infoService.error(err);
      },
    });
  }

  public navigateSingleAusrueckung(ausrueckung: Termin) {
    this.router.navigate(['../details', ausrueckung.id], {
      relativeTo: this.route,
    });
  }

  private navigateEditor(ausrueckung?: Termin) {
    if (ausrueckung?.id) {
      this.router.navigate(['../', ausrueckung.id], {
        relativeTo: this.route,
      });
    } else {
      this.router.navigate(['../new'], {
        relativeTo: this.route,
      });
    }
  }

  public exportPdf() {
    this.list.getFullFilteredData().subscribe((res) => {
      this.pdfCreatorService.createListPdf(res.values, this.listConfig, {
        filename: 'termine',
      });
    });
  }

  public exportExcel() {
    // this.exportService.exportExcel(this.filteredRows, "Ausrückungen");
  }
}
