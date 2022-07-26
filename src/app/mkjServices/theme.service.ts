import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class ThemeService {
    private themePrefix = environment.filePrefix;

    public compactMode: boolean = false;
    public darkMode: boolean = false;
    public layoutMode: string = "static";
    public inputStyle: string = "outlined";

    public themeStable$ = new BehaviorSubject<boolean>(false);

    constructor() {
        this.checkLocalSettings();
    }

    private checkLocalSettings() {
        this.themeStable$.next(false);
        const settings = JSON.parse(localStorage.getItem("theme-settings"));
        if (settings) {
            this.compactMode = settings.compactMode;
            this.darkMode = settings.darkMode;
            this.layoutMode = settings.layoutMode;
            this.inputStyle = settings.inputStyle;
            this.changeTheme();
        } else {
            if (this.checkIfUserPrefersDarkMode()) {
                this.darkMode = true;
                this.changeTheme();
            }
            this.writeLocalSettings();
        }
        this.themeStable$.next(false);
    }

    private writeLocalSettings() {
        const settings = JSON.stringify({
            compactMode: this.compactMode,
            darkMode: this.darkMode,
            layoutMode: this.layoutMode,
            inputStyle: this.inputStyle,
        });
        localStorage.setItem("theme-settings", settings);
    }

    private checkIfUserPrefersDarkMode(): boolean {
        return (
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
        );
    }

    public changeTheme() {
        if (this.compactMode && this.darkMode) {
            this.changeStyleSheet(
                "theme-css",
                "theme-" + this.themePrefix + "-dark-compact.css"
            );
        } else if (this.compactMode && !this.darkMode) {
            this.changeStyleSheet(
                "theme-css",
                "theme-" + this.themePrefix + "-light-compact.css"
            );
        } else if (!this.compactMode && this.darkMode) {
            this.changeStyleSheet(
                "theme-css",
                "theme-" + this.themePrefix + "-dark.css"
            );
        } else if (!this.compactMode && !this.darkMode) {
            this.changeStyleSheet(
                "theme-css",
                "theme-" + this.themePrefix + "-light.css"
            );
        }
        this.writeLocalSettings();
    }

    private changeStyleSheet(id: string, value: string) {
        const element = document.getElementById(id);
        const urlTokens = element.getAttribute("href").split("/");
        urlTokens[urlTokens.length - 1] = value;

        const newURL = urlTokens.join("/");

        element.setAttribute("href", newURL);
    }
}
