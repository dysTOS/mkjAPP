export interface Rechnung {
    reNummer?: string;
    datum: string;
    empfaenger: RechnungsEmpfaenger;
    positionen: RechnungsPosition[];
    gesamtpreis: number;
    anmerkungen?: string;
}

export interface RechnungsEmpfaenger {
    vorname?: string;
    zuname?: string;
    firma?: string;
    strasse?: string;
    hausnummer?: string;
    plz?: string;
    ort?: string;
    staat?: string;
    email?: string;
    telefonNummer?: string;
}

export interface RechnungsPosition {
    bezeichnung: string;
    menge?: number;
    einzelpreis?: number;
    gesamtpreis: number;
}
