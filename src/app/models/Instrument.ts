export interface Instrument {
    id?: string;
    marke?: string;
    bezeichnung?: string;
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


