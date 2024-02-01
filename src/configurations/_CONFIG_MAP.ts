export interface AppConfig {
  [key: string]: {
    appTitle: string;
    production: boolean;
    apiUrl: string;
    publictest: boolean;
  };
}

export const CONFIG_MAP: AppConfig = {
  local: {
    production: false,
    publictest: true,

    // apiUrl: 'http://localhost:8000/api/',
    apiUrl: 'https://api-test.mk-jainzen.at/api/',
    appTitle: 'mkjLOCAL',
  },
  publictest: {
    appTitle: 'testAPP',
    production: true,
    apiUrl: 'https://api-test.mk-jainzen.at/api/',
    publictest: true,
  },
  mkj: {
    appTitle: 'mkjAPP',
    production: true,
    apiUrl: 'https://api.mk-jainzen.at/api/',
    publictest: false,
  },
  gmr: {
    appTitle: 'gulaschAPP',
    production: true,
    apiUrl: 'https://api.gulaschmusi.at/api/',
    publictest: false,
  },
};
