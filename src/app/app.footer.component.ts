import { Component } from "@angular/core";

@Component({
    selector: "app-footer",
    template: `
        <div class="footer">
            <div class="card flex justify-content-between">
                <span class="footer-text-left"
                    ><a href="https://www.mk-jainzen.at" target="_blank"></a
                ></span>
                <span class="footer-text-center">Version 0.5</span>
                <span class="footer-text-right">
                    <!-- <span><a href="https://www.gulaschmusi.at" target="_blank"></a></span> -->
                </span>
            </div>
        </div>
    `,
})
export class AppFooterComponent {}
