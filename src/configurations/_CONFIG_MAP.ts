export interface AppConfig {
    [key: string]: {
        appTitle: string;
        prefix: "mkj" | "gmr";
        production: boolean;
        apiUrl: string;
        publictest: boolean;
    };
}

export const CONFIG_MAP: AppConfig = {
    local: {
        production: false,
        publictest: true,

        // apiUrl: "https://api.gulaschmusi.at/api/",
        // appTitle: "gulaschAPP",
        // prefix: "mkj",

        apiUrl: "http://localhost:8000/api/",
        appTitle: "mkjLOCAL",
        prefix: "mkj",
    },
    publictest: {
        appTitle: "testAPP",
        prefix: "mkj",
        production: true,
        apiUrl: "https://api-test.mk-jainzen.at/api/",
        publictest: true,
    },
    mkj: {
        appTitle: "mkjAPP",
        prefix: "mkj",
        production: true,
        apiUrl: "https://api.mk-jainzen.at/api/",
        publictest: false,
    },
    gmr: {
        appTitle: "gulaschAPP",
        prefix: "gmr",
        production: true,
        apiUrl: "https://api.gulaschmusi.at/api/",
        publictest: false,
    },
};
