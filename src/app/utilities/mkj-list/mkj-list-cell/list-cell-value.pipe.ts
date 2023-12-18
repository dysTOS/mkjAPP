import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "listCellValue",
})
export class ListCellValuePipe implements PipeTransform {
    public transform(value: unknown, getFn: (item: any) => any): unknown {
        return getFn(value);
    }
}
