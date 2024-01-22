import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

const httpOptionsDownload = {
    headers: new HttpHeaders({
        responseType: "blob",
        Accept: "image/png",
        observe: "response",
    }),
};

@Injectable({
    providedIn: "root",
})
export class FileService {
    private apiURL = environment.apiUrl;

    constructor(private http: HttpClient) {}

    getAllFiles(): Observable<Blob> {
        const url = this.apiURL + "files";
        return this.http.get<Blob>(url, httpOptionsDownload);
    }
}
