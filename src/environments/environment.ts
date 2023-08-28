// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    apiUrl: "http://localhost:8000/api/", //dev laravel local /db=plesk
    // apiUrl: "https://api-test-mk-jainzen.217-160-55-172.plesk.page/api/",
    vapidPublicKey:
        "BIsIB28fImumACBAnl09t3HKyJLBJDGKj17Nc7HFKhiRSzFYQdRUBfL0Yfrab8QpEl1ItEajx72I1Wje-yq7j-s",
    prefix: "mkj",
    appTitle: "mkjLOCAL",
    publictest: true,
};
