import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MitgliederApiService } from 'src/app/services/api/mitglieder-api.service';
import { UserService } from 'src/app/services/authentication/user.service';
import { InfoService } from 'src/app/services/info.service';
import { MkjToolbarService } from 'src/app/utilities/mkj-toolbar/mkj-toolbar.service';
import { MitgliederEditComponent } from '../../mitglieder/mitglieder-edit/mitglieder-edit.component';

@Component({
  selector: 'app-mitglied-personal-edit',
  templateUrl: './mitglied-personal-edit.component.html',
  styleUrls: ['./mitglied-personal-edit.component.scss'],
})
export class MitgliedPersonalEditComponent implements AfterViewInit {
  public isSaving: boolean = false;

  @ViewChild('mitgliedEdit')
  private editComponent: MitgliederEditComponent;

  constructor(
    private userservice: UserService,
    private mitgliederService: MitgliederApiService,
    private infoService: InfoService,
    private toolbarService: MkjToolbarService
  ) {
    this.toolbarService.header = 'Meine Daten';
  }

  public ngAfterViewInit(): void {
    this.editComponent.save = () => this.updateOwnMitgliedData();
  }

  public canDeactivate(): boolean {
    return this.editComponent.canDeactivate();
  }

  private updateOwnMitgliedData() {
    this.isSaving = true;
    const saveMitglied = this.editComponent.formGroup.getRawValue();
    this.mitgliederService.updateOwnMitgliedData(saveMitglied).subscribe({
      next: (res) => {
        this.infoService.success('Daten aktualisiert!');
        this.userservice.setCurrentMitglied(res);
        this.editComponent.formGroup.markAsPristine();
        this.isSaving = false;
      },
      error: (err) => {
        this.isSaving = false;
        this.infoService.error(err);
      },
    });
  }
}
