export interface Noten {
    id?: string;
    inventarId?: string;
    titel?: string;
    komponist?: string;
    arrangeur?: string;
    verlag?: string;
    gattung?: string;
    ausgeliehenAb?: string;
    ausgeliehenVon?: string;
    anmerkungen?: string;
    aufbewahrungsort?: string;
    links: { name: string; url: string }[];
    created_at?: string;
    updated_at?: string;
    pivot?: {
        verzeichnisNr?: string;
    };
}

export interface Notenmappe {
    id?: string;
    name?: string;
    hatVerzeichnis?: boolean;
    noten?: Noten[];
    color?: string;
}

export const NotenGattungMap = [
    { label: "Charakterstück", value: "Charakterstück" },
    { label: "Diverse", value: "Diverse" },
    { label: "Eröffnungsmusik", value: "Eröffnungsmusik" },
    { label: "Filmmusik", value: "Filmmusik" },
    { label: "Intermezzo", value: "Intermezzo" },
    { label: "Kirchenmusik", value: "Kirchenmusik"},
    { label: "Lied", value: "Lied" },
    { label: "Marsch", value: "Marsch" },
    { label: "Ouvertüre", value: "Ouvertüre" },
    { label: "Polka", value: "Polka" },
    { label: "Potpourrie/Medley", value: "Potpourrie/Medley" },
    { label: "Quartett", value: "Quartett" },
    { label: "Sololiteratur", value: "Sololiteratur" },
    { label: "Trauermusik", value: "Trauermusik" },
    { label: "Walzer", value: "Walzer" },
    { label: "Wiener Tanzmusik", value: "Wiener Tanzmusik" },
];
