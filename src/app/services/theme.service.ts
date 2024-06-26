import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class ThemeService {
    public darkMode: boolean = false;
    public layoutMode: "static" | "overlay" = "static";
    public inputStyle: "outlined" | "filled" = "outlined";

    constructor() {
        this.initLocalSettings();
    }

    private initLocalSettings() {
        const settings = JSON.parse(localStorage.getItem("theme-settings"));
        if (settings) {
            this.darkMode = settings.darkMode;
            this.layoutMode = settings.layoutMode;
            this.inputStyle = settings.inputStyle;
            this.changeTheme();
        } else {
            if (this.userPrefersDarkMode()) {
                this.darkMode = true;
                this.changeTheme();
            }
            this.writeLocalSettings();
        }
    }

    private writeLocalSettings() {
        const settings = JSON.stringify({
            darkMode: this.darkMode,
            layoutMode: this.layoutMode,
            inputStyle: this.inputStyle,
        });
        localStorage.setItem("theme-settings", settings);
    }

    private userPrefersDarkMode(): boolean {
        return (
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
        );
    }

    public changeTheme() {
        if (this.darkMode) {
            this.changeStyleSheet("theme-css", "theme-dark.css");
        } else {
            this.changeStyleSheet("theme-css", "theme-light.css");
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
