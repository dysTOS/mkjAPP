import { Component, Injector, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Noten, Notenmappe } from 'src/app/models/Noten';
import { PermissionKey } from 'src/app/models/User';
import { NotenmappenApiService } from 'src/app/services/api/notenmappen-api.service';
import { PdfCreatorService } from 'src/app/services/pdf-creator.service';
import { AbstractFormComponent } from 'src/app/utilities/form-components/_abstract-form-component.class';
import { NotenmappeNotenListComponent } from '../notenmappe-noten-list/notenmappe-noten-list.component';
import { ListConfiguration } from 'src/app/utilities/_list-configurations/_list-configuration.class';

@Component({
  selector: 'notenmappe-edit',
  templateUrl: './notenmappe-edit.component.html',
})
export class NotenmappeEditComponent extends AbstractFormComponent<Notenmappe> {
  public readonly Permission = PermissionKey;
  public editMode: boolean = false;

  @ViewChild('notenList')
  private notenList: NotenmappeNotenListComponent;

  constructor(
    inj: Injector,
    apiService: NotenmappenApiService,
    private pdfService: PdfCreatorService
  ) {
    super(inj, apiService);

    if (this.getId() === 'new') {
      this.editMode = true;
    }
  }

  protected initFormGroup(): FormGroup<any> {
    return new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, Validators.required),
      hatVerzeichnis: new FormControl(false),
      color: new FormControl(null),
    });
  }
  protected getId(): string {
    return this.route.snapshot.params.id;
  }

  protected initToolbar(): void {
    this.toolbarService.backButton = true;
    this.toolbarService.header = 'Bearbeiten';
    this.toolbarService.buttons = [
      {
        label: 'PDF Export',
        icon: 'pi pi-download',
        hidden: this.getId() === 'new',
        click: () => this.exportPdf(),
      },
      {
        label: 'Mappe bearbeiten',
        icon: 'pi pi-pencil',
        hidden: this.getId() === 'new',
        click: () => {
          this.editMode = !this.editMode;
          this.toolbarService.buttons[0].highlighted = this.editMode;
        },
        permissions: [PermissionKey.NOTENMAPPE_SAVE, PermissionKey.NOTENMAPPE_ASSIGN],
      },
      {
        label: 'Mappe Löschen',
        icon: 'pi pi-trash',
        hidden: this.getId() === 'new',
        click: () => this.delete(),
        permissions: [PermissionKey.NOTENMAPPE_DELETE],
      },
    ];
  }

  private exportPdf(): void {
    let noten: any[] = this.notenList?.list?.values?.sort((a, b) => a.titel.localeCompare(b.titel));
    if (noten.length === 0) return;

    const listConfig: ListConfiguration<any> = {
      listName: this.formGroup.get('name').value,
      columns: [
        {
          header: 'Titel',
          getJsPdfValue: (noten: Noten) => noten.titel,
        },
        { header: 'Komponist', getJsPdfValue: (noten: Noten) => noten.komponist },
        { header: 'Dauer', getJsPdfValue: (noten: Noten) => noten.dauer },
        { header: 'Schwierigkeit', getJsPdfValue: (noten: Noten) => noten.schwierigkeit },
      ],
    };

    const verzeichnis = this.formGroup.get('hatVerzeichnis').value;
    if (verzeichnis) {
      noten = noten.sort((a, b) => a.pivot?.orderIndex - b.pivot?.orderIndex);
    }

    if (verzeichnis && noten.length > 30) {
      const indexOrderedNoten = [...noten].sort((a, b) => a.pivot?.orderIndex - b.pivot?.orderIndex);
      const lexicalOrderedNoten = [...noten].sort((a, b) => a.titel.localeCompare(b.titel));
      noten = noten.map((n, i) => {
        return {
          indexOrdered: indexOrderedNoten[i],
          lexicalOrdered: lexicalOrderedNoten[i],
        };
      });
      const fontSize = 9;
      const cellPadding = 3;
      listConfig.columns = [
        {
          header: 'Verzeichnis',
          getJsPdfValue: (noten: ExportNoten) => {
            return {
              content: noten.indexOrdered.pivot?.verzeichnisNr,
              styles: {
                fontSize: fontSize,
                cellPadding,
              },
            };
          },
        },
        {
          header: 'Titel',
          getJsPdfValue: (noten: ExportNoten) => {
            return {
              content: noten.indexOrdered.titel,
              styles: {
                fontSize: fontSize,
                cellPadding,
              },
            };
          },
        },
        {
          header: 'Verzeichnis',
          getJsPdfValue: (noten: ExportNoten) => {
            return {
              content: noten.lexicalOrdered.pivot?.verzeichnisNr,
              styles: {
                fontSize: fontSize,
                cellPadding,
                halign: 'center',
              },
            };
          },
        },
        {
          header: 'Titel (alphabetisch)',
          getJsPdfValue: (noten: ExportNoten) => {
            return {
              content: noten.lexicalOrdered.titel,
              styles: {
                fontSize: fontSize,
                cellPadding,
              },
            };
          },
        },
      ];
    }

    this.pdfService.createListPdf(noten, listConfig, {
      filename: this.formGroup.get('name').value,
    });
  }
}

interface ExportNoten {
  indexOrdered: Noten;
  lexicalOrdered: Noten;
}
