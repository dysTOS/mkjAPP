import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class ThemeService {
    constructor() {}

    // changeTheme(theme) {
    //     this.themeColor = theme;
    //     if (this.app.compactMode) {
    //         this.changeStyleSheetsColor(
    //             "theme-css",
    //             "theme-" + theme + "-compact.css"
    //         );
    //     } else {
    //         this.changeStyleSheetsColor("theme-css", "theme-" + theme + ".css");
    //     }
    //     this.changeStyleSheetsColor("layout-css", "layout-" + theme + ".css");
    // }

    // changeStyleSheetsColor(id, value) {
    //     const element = document.getElementById(id);
    //     const urlTokens = element.getAttribute("href").split("/");
    //     urlTokens[urlTokens.length - 1] = value;

    //     const newURL = urlTokens.join("/");

    //     this.replaceLink(element, newURL);
    // }

    // isIE() {
    //     return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
    // }

    // replaceLink(linkElement, href) {
    //     if (this.isIE()) {
    //         linkElement.setAttribute("href", href);
    //     } else {
    //         const id = linkElement.getAttribute("id");
    //         const cloneLinkElement = linkElement.cloneNode(true);

    //         cloneLinkElement.setAttribute("href", href);
    //         cloneLinkElement.setAttribute("id", id + "-clone");

    //         linkElement.parentNode.insertBefore(
    //             cloneLinkElement,
    //             linkElement.nextSibling
    //         );

    //         cloneLinkElement.addEventListener("load", () => {
    //             linkElement.remove();
    //             cloneLinkElement.setAttribute("id", id);
    //         });
    //     }
    // }
}
