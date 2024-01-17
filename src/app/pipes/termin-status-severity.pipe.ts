import { Pipe, PipeTransform } from "@angular/core";
import { TerminStatusMap } from "../models/Termin";

@Pipe({
    name: "terminStatusSeverity",
})
export class TerminStatusSeverityPipe implements PipeTransform {
    public transform(value: string): string {
        const statusMap = TerminStatusMap;
        const status = statusMap.find((s) => s.value === value?.toLowerCase());
        return status?.severity || "info";
    }
}
