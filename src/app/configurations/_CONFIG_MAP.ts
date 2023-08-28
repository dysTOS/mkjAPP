import { AppNaming, BASE_NAMING } from "./namings/_BASE_NAMING";
import { GM_NAMING } from "./namings/gulaschmusi-naming";

export interface AppConfig {
    [key: string]: {
        appTitle: string;
        prefix: "mkj" | "gm";
        production: boolean;
        apiUrl: string;
        publictest: boolean;
        naming: AppNaming;
    };
}

export const CONFIG_MAP: AppConfig = {
    local: {
        production: false,
        publictest: true,

        apiUrl: "https://api.gulaschmusi.at/api/", //dev laravel gulaschmusi /db=plesk
        appTitle: "gulaschAPP",
        prefix: "gm",
        naming: GM_NAMING,

        //apiUrl: "http://localhost:8000/api/", //dev laravel local /db=plesk
        //appTitle: "mkjLOCAL",
        //prefix: "mkj",
        //naming: BASE_NAMING,
    },
    publictest: {
        appTitle: "testAPP",
        prefix: "mkj",
        production: false,
        apiUrl: "https://api-test.mk-jainzen.at/api/",
        publictest: true,
        naming: BASE_NAMING,
    },
    mkj: {
        appTitle: "mkjAPP",
        prefix: "mkj",
        production: true,
        apiUrl: "https://api.mk-jainzen.at/api/",
        publictest: false,
        naming: BASE_NAMING,
    },
    gm: {
        appTitle: "gulaschAPP",
        prefix: "gm",
        production: true,
        apiUrl: "https://api.gulaschmusi.at/api/",
        publictest: false,
        naming: GM_NAMING,
    },
};
