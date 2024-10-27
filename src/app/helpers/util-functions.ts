import {
    MkjDropdownOption
} from '../utilities/form-input-components/mkj-dropdown/mkj-dropdown.component';

export abstract class UtilFunctions {
    public static getDropdownOptionsFromEnum(
        enumObject: any
    ): MkjDropdownOption[] {
        return Object.entries(enumObject).map((entry) => {
            return {label: entry[0], value: entry[1]};
        });
    }

    public static findIndexById(id: string, array: Array<any>) {
        let index = -1;
        for (let i = 0; i < array.length; i++) {
            if (array[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }

    public static isDesktop() {
        return window.innerWidth > 1024;
    }

    public static generateRandomHexColor(): string {
        let color = '#';
        const possible = '0123456789ABCDEF';

        for (let i = 0; i < 6; i++) {
            color += possible.charAt(
                Math.floor(Math.random() * possible.length)
            );
        }

        return color;
    }

    public static isDarkBackground(backgroundColor: string): boolean {
        if (!backgroundColor) {
            return false;
        }
        const color = backgroundColor.substring(1); // remove the leading '#'
        const r = parseInt(color.substring(0, 2), 16);
        const g = parseInt(color.substring(2, 4), 16);
        const b = parseInt(color.substring(4, 6), 16);
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

        if (luminance > 0.5) {
            // use a dark font color for light backgrounds
            return false;
        } else {
            // use a light font color for dark backgrounds
            return true;
        }
    }
}
