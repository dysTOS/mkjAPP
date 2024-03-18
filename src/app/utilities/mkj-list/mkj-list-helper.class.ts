import dayjs from 'dayjs';
import { FilterMetadata, LazyLoadEvent, TableState } from 'primeng/api';
import { GetListInput, MkjListInputFilter } from 'src/app/interfaces/api-middleware';
import { MkjListGlobalFilter } from '../_list-configurations/_list-configuration.class';

export abstract class MkjListHelper {
  public static getListInput<T>(
    event?: LazyLoadEvent,
    globalFilter?: MkjListGlobalFilter<T>,
    pageSize: number = 25
  ): GetListInput<T> | null {
    if (!event) return null;

    const result: GetListInput = {
      skip: event.first ?? 0,
      take: event.rows ?? pageSize,
    };
    if (event.sortField) {
      result.sort = {
        field: event.sortField,
        order: event.sortOrder === 1 ? 'asc' : 'desc',
      };
    }
    if (event.globalFilter && globalFilter) {
      result.globalFilter = {
        fields: globalFilter?.fields,
        value: event.globalFilter,
      };
    }

    const filters = MkjListHelper.getFilters<T>(event.filters);
    result.filterAnd = filters.andFilters;
    result.filterOr = filters.orFilters;

    return result;
  }

  public static hasSetFilters(event: TableState): boolean {
    if (!event?.filters) return false;

    return Object.values(event.filters).some((value) => {
      if (Array.isArray(value)) {
        return value.some((v) => v.value != null);
      }
      return value?.value != null;
    });
  }

  private static getFilters<T>(filters: { [key: string]: FilterMetadata | FilterMetadata[] }): {
    andFilters: MkjListInputFilter<T>[];
    orFilters: MkjListInputFilter<T>[];
  } {
    const andFilters: MkjListInputFilter<T>[] = [];
    const orFilters: MkjListInputFilter<T>[] = [];
    if (!filters) return { andFilters, orFilters };

    Object.entries(filters).forEach(([key, value]) => {
      if (key === 'global') return;

      if (Array.isArray(value)) {
        (value as Array<FilterMetadata>).forEach((v) => {
          if (v.value != null) {
            const filters = this.mapSingleFilter<T>(key, v);
            if (Array.isArray(filters)) {
              filters.length > 1 ? orFilters.push(...filters) : andFilters.push(filters[0]);
            } else {
              andFilters.push(filters);
            }
          }
        });
      } else if (value.value != null) {
        const filters = this.mapSingleFilter<T>(key, value);
        if (Array.isArray(filters)) {
          filters.length > 1 ? orFilters.push(...filters) : andFilters.push(filters[0]);
        } else {
          andFilters.push(filters);
        }
      }
    });

    return { andFilters, orFilters };
  }

  private static mapSingleFilter<T>(key: string, f: FilterMetadata): MkjListInputFilter<T> | MkjListInputFilter<T>[] {
    let value = f.value;
    let operator = this.mapOperator(f.matchMode);
    const matchMode = f.matchMode;

    if (matchMode.includes('date')) {
      value = dayjs(value).format('YYYY-MM-DD');
      value = value === 'Invalid Date' ? null : value;

      if (matchMode === 'dateBefore') {
        operator = '<';
      } else if (matchMode === 'dateAfter') {
        operator = '>';
      } else if (matchMode === 'dateIsNot') {
        operator = '!=';
      }
    }

    if (Array.isArray(value)) {
      return value.map((v) => {
        return {
          field: key as keyof T,
          value: v.value,
          operator: operator as any,
        };
      });
    } else {
      return {
        field: key as keyof T,
        value: value,
        operator: operator as any,
      };
    }
  }

  private static mapOperator(matchMode: string): string {
    if (matchMode === 'contains') {
      return 'LIKE';
    }
    if (matchMode === 'notContains') {
      return 'NOT LIKE';
    }
    if (matchMode === 'startsWith') {
      return 'LIKE';
    }
    if (matchMode === 'endsWith') {
      return 'LIKE';
    }
    if (matchMode === 'equals') {
      return '=';
    }
    if (matchMode === 'notEquals') {
      return '!=';
    }
    if (matchMode === 'in') {
      return 'IN';
    }

    return matchMode;
  }

  private static isOrFilter(filter: FilterMetadata): boolean {
    return filter.operator === 'or';
  }
}
