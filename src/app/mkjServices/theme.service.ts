import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { AppComponent } from "../app.component";

@Injectable({
    providedIn: "root",
})
export class ThemeService {
    private themePrefix = environment.filePrefix;

    public compactMode: boolean = false;
    public darkMode: boolean = false;
    public layoutMode: string = "static";
    public inputStyle: string = "outlined";

    constructor() {}

    public changeTheme() {
        if (this.compactMode && this.darkMode) {
            this.changeStyleSheetsColor(
                "theme-css",
                "theme-" + this.themePrefix + "-dark-compact.css"
            );
        } else if (this.compactMode && !this.darkMode) {
            this.changeStyleSheetsColor(
                "theme-css",
                "theme-" + this.themePrefix + "-light-compact.css"
            );
        } else if (!this.compactMode && this.darkMode) {
            this.changeStyleSheetsColor(
                "theme-css",
                "theme-" + this.themePrefix + "-dark.css"
            );
        } else if (!this.compactMode && !this.darkMode) {
            this.changeStyleSheetsColor(
                "theme-css",
                "theme-" + this.themePrefix + "-light.css"
            );
        }

        this.changeStyleSheetsColor(
            "layout-css",
            "layout-" + this.themePrefix + ".css"
        );
    }

    private changeStyleSheetsColor(id: string, value: string) {
        const element = document.getElementById(id);
        const urlTokens = element.getAttribute("href").split("/");
        urlTokens[urlTokens.length - 1] = value;

        const newURL = urlTokens.join("/");

        element.setAttribute("href", newURL);
    }

    public changeThemeStyle(compactMode: boolean) {
        if (compactMode && this.darkMode) {
            this.changeStyleSheetsColor(
                "theme-css",
                "theme-" + this.themePrefix + "-dark-compact.css"
            );
        } else if (compactMode && !this.darkMode) {
            this.changeStyleSheetsColor(
                "theme-css",
                "theme-" + this.themePrefix + "-light-compact.css"
            );
        } else if (!compactMode && this.darkMode) {
            this.changeStyleSheetsColor(
                "theme-css",
                "theme-" + this.themePrefix + "-dark.css"
            );
        } else if (!compactMode && !this.darkMode) {
            this.changeStyleSheetsColor(
                "theme-css",
                "theme-" + this.themePrefix + "-light.css"
            );
        }
    }
}
