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
}

export interface Notenmappe {
    id?: string;
    name?: string;
}

export interface Konzert {
    id?: string;
    name?: string;
    datum?: string;
    ort?: string;
}
