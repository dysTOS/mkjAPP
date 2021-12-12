import {Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit{

    layoutMode = 'static';

    darkMenu = false;

    inputStyle = 'outlined';

    ripple = true;

    compactMode = false;

    constructor(private primengConfig: PrimeNGConfig) {}

    ngOnInit() {
        this.primengConfig.ripple = true;

        this.primengConfig.setTranslation({
            "startsWith": "beginnt mit",
            "contains": "enthält",
            "notContains": "enthält nicht",
            "endsWith": "endet mit",
            "equals": "ist gleich",
            "notEquals": "ist ungleich",
            "noFilter": "Kein Filter",
            "lt": "kleiner als",
            "lte": "kleiner als oder gleich",
            "gt": "größer als",
            "gte": "größer als oder gleich",
            "is": "ist",
            "isNot": "ist nicht",
            "before": "vor",
            "after": "nach",
            "dateIs": "Datum ist",
            "dateIsNot": "Datum ist nicht",
            "dateBefore": "Datum ist vorher",
            "dateAfter": "Datum ist nachher",
            "clear": "Rücksetzen",
            "apply": "Anwenden",
            "matchAll": "passt auf alle",
            "matchAny": "passt auf einige",
            "addRule": "Neue Regel",
            "removeRule": "Lösche Regel",
            "accept": "Ja",
            "reject": "Nein",
            "choose": "Wähle",
            "upload": "Upload",
            "cancel": "Abbrechen",
            "dayNames": ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
            "dayNamesShort": ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
            "dayNamesMin": ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
            "monthNames": ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],
            "monthNamesShort": ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun","Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
            "dateFormat": "d. M yy",
            "today": "Heute",
            "weekHeader": "Wk",
            "weak": 'Schwach',
            "medium": 'Mittel',
            "strong": 'Stark',
            "passwordPrompt": 'Passwort eingeben',
            "emptyMessage": 'Keine Ergebnise gefunden',
            "emptyFilterMessage": 'Keine Ergebnise gefunden'
        })
    }
}
