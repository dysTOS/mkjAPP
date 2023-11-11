import { CONFIG_MAP } from "../configurations/_CONFIG_MAP";

const config = CONFIG_MAP.mkj;

export const environment = {
    production: config.production,
    apiUrl: config.apiUrl,
    prefix: config.prefix,
    appTitle: config.appTitle,
    publictest: config.publictest,
};
