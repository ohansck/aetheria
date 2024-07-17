import { TableVariantProps } from './table';
import {
  Row,
  Cell,
  HeaderGroup,
  type Table as ReactTableType,
} from '@tanstack/react-table';
export type UniqueIdentifier = string | number;

export type CustomHeaderProps<TData extends Record<string, any>> = {
  table?: ReactTableType<TData>;
  dataIds?: UniqueIdentifier[];
  columnOrder?: string[];
  isLeftScrollable?: boolean;
  isRightScrollable?: boolean;
};
export type CustomHeaderCellProps<TData extends Record<string, any>> = {
  columnOrder?: string[];
  headerGroup?: HeaderGroup<TData>;
  isLeftScrollable?: boolean;
  isRightScrollable?: boolean;
};
export type CustomBodyRowProps<TData extends Record<string, any>> = {
  table?: ReactTableType<TData>;
  dataIds?: UniqueIdentifier[];
  columnOrder?: string[];
  isLeftScrollable?: boolean;
  isRightScrollable?: boolean;
};
export type CustomBodyCellProps<TData extends Record<string, any>> = {
  cell?: Cell<TData, unknown>;
  columnOrder?: string[];
  isLeftScrollable?: boolean;
  isRightScrollable?: boolean;
};
export type PinnedRowProps<TData extends Record<string, any>> = {
  row: Row<TData>;
  isLeftScrollable?: boolean;
  isRightScrollable?: boolean;
  table: ReactTableType<TData>;
};
export type MainTableProps<T extends Record<string, any>> = {
  classNames?: {
    container?: string;
  };
  isLoading?: boolean;
  columnOrder?: string[];
  showLoadingText?: boolean;
  table?: ReactTableType<T>;
  variant?: TableVariantProps;
  dataIds?: UniqueIdentifier[];
  components?: {
    header?: (c: CustomHeaderProps<T>) => React.ReactNode;
    headerCell?: (c: CustomHeaderCellProps<T>) => React.ReactNode;
    bodyRow?: (c: CustomBodyRowProps<T>) => React.ReactNode;
    bodyCell?: (c: CustomBodyCellProps<T>) => React.ReactNode;
    expandedComponent?: (c: Row<T>) => React.ReactNode;
  };
};
