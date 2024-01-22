import { Component, Input } from "@angular/core";
import { UiDropdownOption } from "src/app/interfaces/UiConfigurations";

@Component({
    selector: "mkj-dropdown-options-edit",
    templateUrl: "./dropdown-options-edit.component.html",
})
export class DropdownOptionsEditComponent {
    @Input({ required: true }) public options: UiDropdownOption[];

    public move(direction: "up" | "down", index: number): void {
        const newIndex = direction === "up" ? index - 1 : index + 1;
        const temp = this.options[index];
        this.options[index] = this.options[newIndex];
        this.options[newIndex] = temp;
    }

    public add(): void {
        this.options.splice(0, 0, { label: "", value: "" });
    }

    public remove(index: number): void {
        this.options.splice(index, 1);
    }
}
