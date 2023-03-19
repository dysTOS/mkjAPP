export const MkjAppVersion = "0.8.2";

export interface MkjAppChangeLog {
    date: string;
    version: string;
    changes: { [key: string]: string };
}

export const MkjAppChangeLog: MkjAppChangeLog[] = [
    // {
    //     date: "",
    //     version: "0.8.3",
    //     changes: {
    //         Instrumente:
    //             "Es können nun Instrumente im Archiv verwaltet werden. - BETA",
    //     },
    // },
    {
        date: "19. März 2021",
        version: "0.8.2",
        changes: {
            Links: "Für jedes Stück im Notenarchiv können beliebig viele Links (u.a. zu Hörbeispielen z.B. auf Youtube) angelegt werden.",
            Changelogs: "Es gibt nun ChangeLogs für neue Versionen der APP.",
            UI: "Verbesserungen der Benutzeroberfläche.",
        },
    },
];
