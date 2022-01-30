import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    template: `
        <div class="footer">
            <div class="card clearfix">
                <span class="footer-text-left"><a href="https://www.mk-jainzen.at" target="_blank">mk-jainzen.at</a></span>
                <span class="footer-text-right">
                    <span>Developed by <a href="https://www.gulaschmusi.at" target="_blank">gulaschmusi.at</a></span>
                </span>
            </div>
        </div>
    `
})
export class AppFooterComponent {

}
