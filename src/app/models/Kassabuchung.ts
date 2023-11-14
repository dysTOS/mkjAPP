import { Anschrift } from "./Anschrift";

export interface Kassabuchung {
    typ: KassabuchungTyp;
    nummer: string;
    datum: string;
    anschrift: Anschrift;
    gesamtpreis: number;
    bezahlt: boolean;
    anmerkungen?: string;
    positionen?: RechnungsPosition[];
    konditionen?: RechnungsKonditionen;
}

export interface RechnungsPosition {
    bezeichnung: string;
    menge?: number;
    einzelpreis?: number;
    gesamtpreis: number;
}

export interface RechnungsKonditionen {
    skonto?: number;
    skontoTage?: number;
    zahlungsziel?: number;
}

export enum KassabuchungTyp {
    EINGANGSRECHNUNG = "er",
    AUSGANGSRECHNUNG = "ar",
}
