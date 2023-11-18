import { Anschrift } from "./Anschrift";
import { Gruppe } from "./Gruppe";

export interface Kassabuch {
    name: string;
    aktiv: boolean;
    color?: string;
    anmerkungen?: string;
    gruppe?: Gruppe;
    kassabuchungen?: Kassabuchung[];
}

export interface Kassabuchung {
    typ: KassabuchungTyp;
    nummer: string;
    datum: string;
    anschrift_id: string;
    anschrift?: Anschrift;
    gesamtpreis: number;
    bezahltDatum?: string;
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
