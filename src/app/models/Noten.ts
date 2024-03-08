export interface Noten {
  id?: string;
  inventarId?: string;
  titel?: string;
  komponist?: string;
  arrangeur?: string;
  verlag?: string;
  gattung?: string;
  dauer?: any;
  schwierigkeit?: number;
  bewertung?: number;
  ausgeliehenAb?: string;
  ausgeliehenVon?: string;
  anmerkungen?: string;
  aufbewahrungsort?: string;
  links: { name: string; url: string }[]; // TODO: polymorphe Links?
  created_at?: string;
  updated_at?: string;
  pivot?: {
    verzeichnisNr?: string;
    orderIndex?: number;
  };
}

export interface Notenmappe {
  id?: string;
  name?: string;
  hatVerzeichnis?: boolean;
  noten?: Noten[];
  color?: string;
}
