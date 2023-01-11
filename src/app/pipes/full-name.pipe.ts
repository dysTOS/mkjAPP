import { Pipe, PipeTransform } from "@angular/core";
import { Mitglied } from "../models/Mitglied";

@Pipe({
    name: "fullName",
})
export class FullNamePipe implements PipeTransform {
    transform(value: Mitglied, options?: {}): string {
        if (!value) return "";

        const name = value.vorname + " " + value.zuname;
        let fullName = value.titelVor ? value.titelVor + " " + name : name;
        fullName = value.titelNach
            ? fullName + ", " + value.titelNach
            : fullName;
        return name;
    }
}
