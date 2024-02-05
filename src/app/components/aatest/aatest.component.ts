import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import { NotenApiService } from 'src/app/services/api/noten-api.service';
import { FileService } from 'src/app/services/file.service';
import { LoggerService } from 'src/app/services/logger.service';
import { PushNotificationsService } from 'src/app/services/push-notifications.service';

@Component({
  selector: 'app-aatest',
  templateUrl: './aatest.component.html',
  styleUrls: ['./aatest.component.scss'],
})
export class AatestComponent {
  public activeIndex = 0;

  constructor(
    public loggerService: LoggerService,
    public pushService: PushNotificationsService,
    private fileService: FileService,
    private notenService: NotenApiService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.activeIndex = this.route.snapshot.params['activeIndex'];
  }

  public updateUrl() {
    this.router.navigate(['../', this.activeIndex], { relativeTo: this.route });
  }

  public download() {
    this.fileService.getAllFiles().subscribe((blob) => FileSaver.saveAs(blob, 'archive.png'));
  }

  public push() {
    this.pushService.push().subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    });
  }

  public notenTest() {}

  public saveWordpressPost() {
    const url = 'http://localhost:8000/api/savepost';
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    this.http.get(url, headers).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    });
  }
}
