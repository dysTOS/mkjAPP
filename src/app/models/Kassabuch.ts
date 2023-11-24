import { Anschrift } from "./Anschrift";
import { Gruppe } from "./Gruppe";

export interface Kassabuch {
    id?: string;
    name: string;
    aktiv: boolean;
    kassastand: number;
    color?: string;
    anmerkungen?: string;
    gruppe?: Gruppe;
    kassabuchungen?: Kassabuchung[];
}

export interface Kassabuchung {
    id?: string;
    typ: KassabuchungTyp;
    nummer: string;
    datum: string;
    anschrift_id: string;
    anschrift?: Anschrift;
    kassabuch_id: string;
    gesamtpreis: number;
    bezahltDatum?: string;
    anmerkungen?: string;
    positionen: RechnungsPosition[];
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
