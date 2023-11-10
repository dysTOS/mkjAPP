import { CONFIG_MAP } from "../app/configurations/_CONFIG_MAP";

const config = CONFIG_MAP.gmr;

export const environment = {
    production: config.production,
    apiUrl: config.apiUrl,
    prefix: config.prefix,
    appTitle: config.appTitle,
    publictest: config.publictest,
};
