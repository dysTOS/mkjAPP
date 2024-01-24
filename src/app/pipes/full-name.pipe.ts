import { Pipe, PipeTransform } from "@angular/core";
import { Mitglied } from "../models/Mitglied";
import { Anschrift } from "../models/Anschrift";

@Pipe({
    name: "fullName",
})
export class FullNamePipe implements PipeTransform {
    transform(value: Mitglied | Anschrift): string {
        if (!value) return "";

        const name = value.vorname + " " + value.zuname;
        let fullName = value.titelVor ? value.titelVor + " " + name : name;
        fullName = value.titelNach
            ? fullName + ", " + value.titelNach
            : fullName;
        return name;
    }
}
