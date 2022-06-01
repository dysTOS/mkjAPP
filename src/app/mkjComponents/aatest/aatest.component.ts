import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/mkjServices/file.service';
import * as FileSaver from 'file-saver';

@Component({
    selector: 'app-aatest',
    templateUrl: './aatest.component.html',
    styleUrls: ['./aatest.component.scss']
})
export class AatestComponent implements OnInit {

    constructor(private fileService: FileService,) { }

    ngOnInit(): void {

    }

    public download() {
        this.fileService.getAllFiles().subscribe(blob =>
            FileSaver.saveAs(blob, 'archive.png'))
    }

}
