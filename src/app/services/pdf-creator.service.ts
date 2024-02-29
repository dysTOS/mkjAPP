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
  //     const doc: any = new jsPDF('l', 'pt');
  //     doc.autoTable({
  //       html: '.p-datatable-striped',
  //       tableWidth: 'wrap',
  //       styles: { cellPadding: 0.5, fontSize: 8 },
  //     });
  //     doc.save('test.pdf');
  //   }

  public createListPdf<T>(collection: T[], config: ListConfiguration<T>, options: { filename: string }) {
    const doc = new jsPDF('p', 'pt', 'a4');
    doc.setFontSize(14);

    autoTable(doc, {
      head: [config.columns.filter((c) => c.getJsPdfValue != null).map((c) => c.header)],
      body: collection.map((row) =>
        config.columns.filter((c) => c.getJsPdfValue != null).map((c) => (c.getJsPdfValue ? c.getJsPdfValue(row) : ''))
      ),

      willDrawPage: function (data) {
        // Header
        doc.setFontSize(20);
        doc.setTextColor(40);
        const base64Img = new Image();
        base64Img.src = 'assets/images/app_logo.png';
        doc.addImage(base64Img, 'PNG', data.settings.margin.left, data.settings.margin.top - 17, 15, 15);
        doc.text(config.listName, data.settings.margin.left + 18, data.settings.margin.top - 2);
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
      headStyles: { fillColor: getComputedStyle(document.documentElement).getPropertyValue('--theme-color') },
      bodyStyles: {},
      alternateRowStyles: {},
      // columnStyles: { columnWidth: 'auto' },
      margin: { top: 50 },
    });
    doc.save(options.filename + '.pdf');
  }
}
