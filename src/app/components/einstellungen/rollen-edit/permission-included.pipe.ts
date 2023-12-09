import { Pipe, PipeTransform } from "@angular/core";
import { Permission } from "../../../models/User";

@Pipe({
    name: "permissionIncluded",
})
export class PermissionSelectedPipe implements PipeTransform {
    transform(value: Permission, permissions: Permission[]) {
        return permissions?.some((p) => p.id === value.id);
    }
}
