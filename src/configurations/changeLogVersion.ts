export const MkjAppVersion = '0.9.7 - BETA';

export interface MkjAppChangeLog {
  date: string;
  version: string;
  changes: { [key: string]: string };
}

export const MkjAppChangeLog: MkjAppChangeLog[] = [
  //   {
  //     date: '30.03.2024',
  //     version: '0.9.8 - BETA',
  //     changes: {
  //       Benachrichtigungen: 'Implementierung von Echtzeit-Benachrichtigungen.',
  //       Bugfixes: 'Diverse Bugfixes und Verbesserungen der Benutzeroberfläche.',
  //       Notenmappen: 'Gesamtdauer hinzugefügt.',
  //     },
  //   },
  {
    date: '10.03.2024',
    version: '0.9.7 - BETA',
    changes: {
      Notenmappen: 'Das Inhaltsverzeichnis kann jetzt als PDF exportiert werden.',
      Noten: 'Es können jetzt Bewertungen für Noten vergeben werden.',
      Bugfixes: 'Diverse Bugfixes und Verbesserungen der Benutzeroberfläche.',
    },
  },
  {
    date: '28.02.2024',
    version: '0.9.6 - BETA',
    changes: {
      Kassabuchungen: 'Es können jetzt Positionen für Kassabuchungen angelegt werden.',
      PersonalData: 'Jeder User kann jetzt seine eigenen Mitgliedsdaten bearbeiten.',
      Bugfixes: 'Diverse Bugfixes und Verbesserungen der Benutzeroberfläche.',
      Noten: 'Existierende Werte "Komponist/Arrangeur und Verlag" werden jetzt automatisch bei Eingabe vorgeschlagen.',
    },
  },
  {
    date: '21.02.2024',
    version: '0.9.5 - BETA',
    changes: {
      Tools: 'Stimmgerät, Metronom, Quintenzirkel, Synthesizer hinzugefügt.',
      Termine: 'Termine können jetzt als PDF exportiert werden.',
    },
  },
  {
    date: '01.02.2024',
    version: '0.9.4 - BETA',
    changes: {
      Allgemein: 'Bugfixes, Verbesserungen der Benutzeroberfläche, Stabilisierung des Systems.',
      Termine:
        "Termine werden jetzt standardmäßig nach aktuellem Datum gefiltert. Der Status 'Öffentlich' wird nun auch in der Terminübersicht angezeigt.",
    },
  },
  {
    date: '24.01.2024',
    version: '0.9.3 - BETA',
    changes: {
      Allgemein: 'Bugfixes, Verbesserungen der Benutzeroberfläche, Stabilisierung des Systems.',
    },
  },
  {
    date: '01.01.2024',
    version: '0.9.2 - BETA',
    changes: {
      Environments: 'Die App kann nun automatisiert für verschiedene Umgebungen/Vereine/Bands ausgeliefert werden.',
      Einstellungen:
        'Globale Einstellungen ermöglichen dem Administrator die Konfiguration der App (Benennung der Menüpunkte, Dropdown-Optionen).',
      Kassabücher: 'Es können nun Kassabücher erstellt/verwaltet und Gruppen zugeordnet werden.',
      Adressen:
        'Es können nun beliebig viele Adressen angelegt werden. Dieser Adressen werden u.a. für die Kassabuchungen verwendet.',
      UI: 'Verbesserungen der Benutzeroberfläche.',
    },
  },
  {
    date: '24. Juni 2023',
    version: '0.8.3 - ALPHA',
    changes: {
      Instrumente:
        'Es können nun Instrumente im Archiv verwaltet, sowie einzelnen Musiker/innen und Registern zugeordnet werden.',
      UI: 'Verbesserungen der Benutzeroberfläche.',
      Backend: 'Optimierungen der Datenbankabfragen.',
    },
  },
  {
    date: '19. März 2023',
    version: '0.8.2 - ALPHA',
    changes: {
      Noten:
        'Für jedes Stück im Notenarchiv können beliebig viele Links (u.a. zu Hörbeispielen z.B. auf Youtube) angelegt werden.',
      Changelogs: 'Es gibt nun ChangeLogs für neue Versionen der APP.',
      UI: 'Verbesserungen der Benutzeroberfläche.',
    },
  },
  {
    date: 'November 2021 bis März 2023',
    version: 'Keine Versionsnummer',
    changes: {
      Entwicklungsphase: 'Die App befindet sich in der Entwicklungsphase.',
    },
  },
];
