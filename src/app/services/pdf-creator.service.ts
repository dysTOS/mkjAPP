import { Injectable } from '@angular/core';
import { ListConfiguration } from '../utilities/_list-configurations/_list-configuration.class';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root',
})
export class PdfCreatorService {
  constructor() {}

  //   public createPdfFromHtml() {
  //     console.log('create pdf');
  //     const doc: any = new jsPDF('l', 'pt');
  //     doc.autoTable({
  //       html: '.p-datatable-striped',
  //       tableWidth: 'wrap',
  //       styles: { cellPadding: 0.5, fontSize: 8 },
  //     });
  //     doc.save('test.pdf');
  //   }

  public createListPdf<T>(collection: T[], config: ListConfiguration<T>, options: { filename: string }) {
    const doc = new jsPDF('p', 'pt', 'a3');
    doc.setFontSize(12);

    autoTable(doc, {
      head: [config.columns.map((c) => c.header)],
      body: collection.map((row) => config.columns.map((c) => row[c.field])),
      willDrawPage: function (data) {
        // Header
        doc.setFontSize(20);
        doc.setTextColor(40);
        // if (base64Img) {
        //   doc.addImage(base64Img, 'JPEG', data.settings.margin.left, 15, 10, 10)
        // }
        doc.text(config.listName, data.settings.margin.left, doc.internal.pageSize.height - 30);
      },
      //   didDrawPage: function (data) {
      //     // Footer
      //     var str = 'Seite ' + doc.getNumberOfPages();
      //     // Total page number plugin only available in jspdf v1.0+
      //     if (typeof doc.putTotalPages === 'function') {
      //       str = str + ' of ' + doc.pages;
      //     }
      //     doc.setFontSize(10);

      //     // jsPDF 1.4+ uses getHeight, <1.4 uses .height
      //     var pageSize = doc.internal.pageSize;
      //     var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
      //     doc.text(str, data.settings.margin.left, pageHeight - 10);
      //   },
      theme: 'striped',
      styles: {},
      headStyles: { fillColor: [0, 66, 0] },
      bodyStyles: {},
      alternateRowStyles: {},
      // columnStyles: { columnWidth: 'auto' },
      //   margin: { top: 50 },
    });
    doc.save(options.filename + '.pdf');
  }
}
