export const MkjAppVersion = "0.8.3";

export interface MkjAppChangeLog {
    date: string;
    version: string;
    changes: { [key: string]: string };
}

export const MkjAppChangeLog: MkjAppChangeLog[] = [
    {
        date: "",
        version: "0.8.3",
        changes: {
            Instrumente:
                "Es können nun Instrumente im Archiv verwaltet, sowie einzelnen Musiker/innen und Registern zugeordnet werden.",
            UI: "Verbesserungen der Benutzeroberfläche.",
            Backend: "Optimierungen der Datenbankabfragen.",
        },
    },
    {
        date: "19. März 2023",
        version: "0.8.2 - ALPHA",
        changes: {
            Noten: "Für jedes Stück im Notenarchiv können beliebig viele Links (u.a. zu Hörbeispielen z.B. auf Youtube) angelegt werden.",
            Changelogs: "Es gibt nun ChangeLogs für neue Versionen der APP.",
            UI: "Verbesserungen der Benutzeroberfläche.",
        },
    },
    {
        date: "November 2021 bis März 2023",
        version: "Keine Versionsnummer",
        changes: {
            Entwicklungsphase:
                "Die App befindet sich in der Entwicklungsphase.",
        },
    },
];
