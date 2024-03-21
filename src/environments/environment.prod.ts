import { CONFIG_MAP } from '../configurations/_CONFIG_MAP';

const config = CONFIG_MAP.mkj;

export const environment = {
  production: config.production,
  apiUrl: config.apiUrl,
  appTitle: config.appTitle,
  publictest: config.publictest,
  wsHost: config.wsHost,
};
