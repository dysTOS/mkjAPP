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
}
