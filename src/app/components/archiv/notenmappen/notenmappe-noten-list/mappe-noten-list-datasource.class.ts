import { Observable, map } from "rxjs";
import { GetListOutput } from "src/app/interfaces/api-middleware";
import { Noten } from "src/app/models/Noten";
import { NotenmappenApiService } from "src/app/services/api/notenmappen-api.service";
import { AbstractListDatasource } from "src/app/utilities/_list-datasources/_abstract-list-datasource.class";
import { TileValue } from "src/app/utilities/mkj-tile-view/mkj-tile-view.component";

export class MappeNotenListDatasource extends AbstractListDatasource<Noten> {
    constructor(
        private apiService: NotenmappenApiService,
        private mappeId: string
    ) {
        super();
    }

    public getList(): Observable<GetListOutput<Noten>> {
        return this.apiService.getNotenOfMappe(this.mappeId).pipe(
            map((res) => {
                this.sortNoten(res);
                return {
                    values: res,
                    totalCount: res.length,
                };
            })
        );
    }

    public getById(id: string): Observable<Noten> {
        throw new Error("Method not implemented.");
    }

    public mapToTileValue(item: Noten): TileValue<Noten> {
        throw new Error("Method not implemented.");
    }

    private sortNoten(noten: Noten[], verzeichnis?: boolean): void {
        function splitString(value: string): { num: number; str: string } {
            const num = parseInt(value, 10);
            const str = value.replace(num.toString(), "");
            return { num, str };
        }

        if (verzeichnis) {
            noten?.sort((a, b) => {
                const numA = splitString(a.pivot?.verzeichnisNr);
                const numB = splitString(b.pivot?.verzeichnisNr);

                if (numA.num !== numB.num) {
                    return numA.num - numB.num;
                }

                return numA.str.localeCompare(numB.str);
            });
        } else {
            noten?.sort((a, b) => a.titel.localeCompare(b.titel));
        }
    }
}
