import { Pipe, PipeTransform } from "@angular/core";
import { Mitglied } from "../models/Mitglied";

@Pipe({
    name: "fullName",
})
export class FullNamePipe implements PipeTransform {
    transform(value: Mitglied, options?: {}): string {
        const name = value.vorname + " " + value.zuname;
        const fullName = value.titelVor + " " + name + " " + value.titelNach;
        return fullName;
    }
}
