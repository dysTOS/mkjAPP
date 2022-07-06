import { Component, OnInit } from "@angular/core";
import { FileService } from "src/app/mkjServices/file.service";
import * as FileSaver from "file-saver";
import { NotenService } from "src/app/mkjServices/noten.service";
import { PushNotificationsService } from "src/app/mkjServices/push-notifications.service";

@Component({
    selector: "app-aatest",
    templateUrl: "./aatest.component.html",
    styleUrls: ["./aatest.component.scss"],
})
export class AatestComponent implements OnInit {
    constructor(
        private fileService: FileService,
        private notenService: NotenService,
        private pushService: PushNotificationsService
    ) {}

    ngOnInit(): void {}

    public download() {
        this.fileService
            .getAllFiles()
            .subscribe((blob) => FileSaver.saveAs(blob, "archive.png"));
    }

    public push() {
        this.pushService.push().subscribe({
            next: (res) => console.log(res),
            error: (err) => console.log(err),
        });
    }

    pushSub() {
        const input = {
            endpoint:
                "https://fcm.googleapis.com/fcm/send/dWZuExvBZuM:APA91bGnDd2OyBgRQ0pRtTNmWUF6QwLuLZ9wstbxfIiJTNLbuscTGqa4dD222IG3-qigOvTP51vjmtvrGKzvmbwWDgn1_NeEmwYoLD39UJXvf3YZe246tG1qeWNGMNCaAFMXzeSoGd5X",
            expirationTime: null,
            keys: {
                p256dh: "BLVmG70jBZOQGp6_QbKXEl7Uku2ew0w2nLVVJr070K5unPQW6iNhLaCdgmy0H5rmhse5MCrVzDVnft6sjgTi-kU",
                auth: "gGi4SIf-t5JGYCfprOT-4A",
            },
        };
        this.pushService.subscribeUser(null).subscribe({
            next: (res) => console.log(res),
            error: (err) => console.log(err),
        });
    }

    public notenTest() {
        this.notenService.getNotenmappen().subscribe((res) => console.log(res));
    }
}
