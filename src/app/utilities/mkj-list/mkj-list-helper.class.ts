import dayjs from 'dayjs';
import { FilterMetadata, LazyLoadEvent, TableState } from 'primeng/api';
import { GetListInput, MkjListInputFilter } from 'src/app/interfaces/api-middleware';
import { MkjListGlobalFilter } from '../_list-configurations/_list-configuration.class';

export abstract class MkjListHelper {
  public static getListInput<T>(
    event: LazyLoadEvent,
    globalFilter?: MkjListGlobalFilter<T>,
    pageSize: number = 25
  ): GetListInput<T> {
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
    result.filterAnd = filters;

    return result;
  }

  public static hasSetFilters(event: TableState): boolean {
    return Object.values(event?.filters)?.some((value) => {
      if (Array.isArray(value)) {
        return value.some((v) => v.value != null);
      }
      return value?.value != null;
    });
  }

  public static getFilters<T>(filters: { [key: string]: FilterMetadata }): MkjListInputFilter<T>[] {
    const result: MkjListInputFilter<T>[] = [];
    Object.entries(filters).forEach(([key, value]) => {
      if (key === 'global') return;

      if (Array.isArray(value)) {
        (value as Array<any>).forEach((v) => {
          const filter = this.mapSingleFilter<T>(key, v);
          if (filter.value != null) {
            result.push(filter);
          }
        });
      } else if (value.value != null) {
        result.push(this.mapSingleFilter<T>(key, value));
      }
    });

    return result;
  }

  public static mapSingleFilter<T>(key: string, f: FilterMetadata): MkjListInputFilter<T> {
    let value = f.value;
    let operator = f.matchMode === 'contains' ? 'LIKE' : '=';
    const matchMode = f.matchMode;

    if (matchMode.includes('date')) {
      value = dayjs(value).format('YYYY-MM-DD');
      value = value === 'Invalid date' ? null : value;

      if (matchMode === 'dateBefore') {
        operator = '<';
      } else if (matchMode === 'dateAfter') {
        operator = '>';
      } else if (matchMode === 'dateIsNot') {
        operator = '!=';
      }
    }

    return {
      field: key as keyof T,
      value: value,
      operator: operator as any,
    };
  }
}
