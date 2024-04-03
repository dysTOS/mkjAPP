import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mitglied } from 'src/app/models/Mitglied';
import { PermissionKey } from 'src/app/models/User';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { UserService } from 'src/app/services/authentication/user.service';
import { MitgliederListConfig } from 'src/app/utilities/_list-configurations/mitglieder-list-config.class';
import { MitgliederListDatasource } from 'src/app/utilities/_list-datasources/mitglieder-list-datasource.class';
import { MkjToolbarService } from 'src/app/utilities/mkj-toolbar/mkj-toolbar.service';
import { displayModel } from 'src/app/providers/display-model';
import { MitgliedDisplayModel } from 'src/app/utilities/_display-model-configurations/mitglied-display-model.class';

@Component({
  selector: 'app-mitglieder-overview',
  templateUrl: './mitglieder-overview.component.html',
  styleUrls: ['./mitglieder-overview.component.scss'],
  providers: [MitgliederListDatasource, MitgliederListConfig, displayModel(MitgliedDisplayModel)],
})
export class MitgliederOverviewComponent {
  public readonly PermissionMap = PermissionKey;

  constructor(
    public datasource: MitgliederListDatasource,
    public listConfig: MitgliederListConfig,
    private router: Router,
    private route: ActivatedRoute,
    private toolbarService: MkjToolbarService,
    private userService: UserService,
    appconfig: ConfigurationService
  ) {
    this.toolbarService.header = appconfig.uiNaming.Mitglieder;
    this.toolbarService.buttons = [
      {
        icon: 'pi pi-plus',
        click: () =>
          this.router.navigate(['../new'], {
            relativeTo: this.route,
          }),
        label: 'Neu',
        permissions: [PermissionKey.MITGLIEDER_SAVE],
      },
    ];
  }

  public navigateSingleMitglied(mitglied?: Mitglied) {
    if (this.userService.hasPermissionNot(PermissionKey.MITGLIEDER_SAVE)) return;
    this.router.navigate(['../' + (mitglied?.id ?? 'new')], {
      relativeTo: this.route,
    });
  }
}
