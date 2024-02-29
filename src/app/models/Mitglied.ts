import { Anschrift } from './Anschrift';

export interface Mitglied {
  id?: string;
  user_id?: string;
  anschrift_id?: string;
  vorname?: string;
  zuname?: string;
  email?: string;
  titelVor?: string;
  titelNach?: string;
  geburtsdatum?: string;
  geschlecht?: string;
  strasse?: string;
  hausnummer?: string;
  ort?: string;
  plz?: string;
  telefonHaupt?: string;
  telefonMobil?: string;
  beruf?: string;
  aktiv?: boolean;
  eintrittDatum?: string;
  austrittDatum?: string;
  teilnahmen?: { status?: string }[];
  anschrift?: Anschrift;
  created_at?: string;
  updated_at?: string;
}

//TODO refactor to use 'Anschrift'-Model related to 'Mitglied'

export const MitgliedGeschlechtMap = [
  { label: 'Männlich', value: 'M' },
  { label: 'Weiblich', value: 'W' },
  { label: 'Divers', value: 'D' },
];
