export interface MkjToolbarButton {
    icon: string;
    label?: string;
    permissions?: string[];
    click?: (event: MouseEvent) => void;
    visible?: boolean;
}

export class MkjToolbarDatasource {
    public backButton?: boolean;

    public header?: string;

    public buttons?: MkjToolbarButton[];

    public contentSectionExpanded?: boolean;

    constructor() {}
}
