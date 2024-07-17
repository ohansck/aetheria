'use client';

import Image from 'next/image';
import cn from '@utils/class-names';
import { CSS } from '@dnd-kit/utilities';
import { CSSProperties, Fragment } from 'react';
import { Products } from '@/data/tan-table-data';
import { ActionIcon, Text, Title } from 'rizzui';
import { getColumnOptions } from '@/app/shared/table/util';
import { TableCell, TableHead, TableRow } from '@/app/shared/table/index';
import { Cell, Header, Row, flexRender } from '@tanstack/react-table';
import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  PiCaretUpFill,
  PiCaretDownFill,
  PiXBold,
  PiDotsSixVerticalBold,
} from 'react-icons/pi';
import {
  CustomBodyCellProps,
  CustomBodyRowProps,
  CustomHeaderCellProps,
} from '../../table/main-table-types';

// DnD Head wrapper component
export function DragAbleHeadWrapper<TData extends Record<string, any>>({
  headerGroup,
  columnOrder,
  isLeftScrollable,
  isRightScrollable,
}: CustomHeaderCellProps<TData>) {
  return (
    <>
      <SortableContext
        items={columnOrder!}
        strategy={horizontalListSortingStrategy}
      >
        {headerGroup?.headers.map((header) => {
          return (
            <DragAbleHead
              key={header.id}
              header={header}
              isLeftScrollable={isLeftScrollable}
              isRightScrollable={isRightScrollable}
            />
          );
        })}
      </SortableContext>
    </>
  );
}

type DragAbleHeadProps<TData extends Record<string, any>> = {
  header: Header<TData, unknown>;
  isLeftScrollable?: boolean;
  isRightScrollable?: boolean;
};

// DnD head child
function DragAbleHead<TData extends Record<string, any>>({
  header,
  isLeftScrollable,
  isRightScrollable,
}: DragAbleHeadProps<TData>) {
  const {
    canPin,
    isPinned,
    canResize,
    isLeftPinned,
    isRightPinned,
    isColumnDraggable,
  } = getColumnOptions(header.column);
  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useSortable({
      id: header.column.id,
    });

  const dragStyle: CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition: 'width transform 0.2s ease-in-out',
    width: header.column.getSize(),
  };
  return (
    <TableHead
      style={{
        ...dragStyle,
        left: isLeftPinned ? header.column.getStart('left') : undefined,
        right: isRightPinned ? header.column.getAfter('right') : undefined,
      }}
      ref={setNodeRef}
      colSpan={header.colSpan}
      className={cn(
        isPinned && canPin && 'sticky z-10',
        !isPinned && canResize && 'relative',
        isDragging && 'group !relative !z-50',
        !isPinned && isColumnDraggable && 'group relative',
        isPinned && isLeftScrollable && 'sticky-right bg-gray-100',
        isPinned && isRightScrollable && 'sticky-left bg-gray-100'
      )}
    >
      {!isPinned && isColumnDraggable && (
        <button
          type="button"
          {...attributes}
          {...listeners}
          aria-label="Column Drag Handle"
          className="absolute end-2 top-1/2 hidden -translate-y-1/2 cursor-pointer group-hover:block"
        >
          <PiDotsSixVerticalBold size={20} />
        </button>
      )}

      {header.isPlaceholder
        ? null
        : flexRender(header.column.columnDef.header, header.getContext())}
      {header.column.getCanSort() ? (
        <button
          type="button"
          className="ms-2"
          aria-label="Sort Column"
          onClick={header.column.getToggleSortingHandler()}
        >
          {{
            asc: <PiCaretUpFill size={16} className="-mb-0.5" />,
            desc: <PiCaretDownFill size={16} className="-mb-0.5" />,
          }[header.column.getIsSorted() as string] ??
            (header.column.columnDef.header !== '' && (
              <PiCaretDownFill size={16} className="-mb-0.5" />
            ))}
        </button>
      ) : null}

      {header.column.getCanResize() && (
        <div
          {...{
            onDoubleClick: () => header.column.resetSize(),
            onMouseDown: header.getResizeHandler(),
            onTouchStart: header.getResizeHandler(),
          }}
          className="absolute end-0 top-0 hidden h-full w-0.5 cursor-w-resize bg-gray-400 group-hover:block"
        />
      )}
    </TableHead>
  );
}

// DnD Cell wrapper component
export function DragAbleCellWrapper<TData extends Record<string, any>>({
  cell,
  columnOrder,
  isLeftScrollable,
  isRightScrollable,
}: CustomBodyCellProps<TData>) {
  return (
    <SortableContext
      items={columnOrder!}
      strategy={horizontalListSortingStrategy}
    >
      <DragAbleCell
        cell={cell!}
        isLeftScrollable={isLeftScrollable}
        isRightScrollable={isRightScrollable}
      />
    </SortableContext>
  );
}

type DragAbleCellProps<TData extends Record<string, any>> = {
  cell: Cell<TData, unknown>;
  isLeftScrollable?: boolean;
  isRightScrollable?: boolean;
};

// DnD cell child
function DragAbleCell<TData extends Record<string, any>>({
  cell,
  isLeftScrollable,
  isRightScrollable,
}: DragAbleCellProps<TData>) {
  const { canPin, canResize, isPinned, isLeftPinned, isRightPinned } =
    getColumnOptions(cell.column);
  const { isDragging, setNodeRef, transform } = useSortable({
    id: cell.column.id,
  });

  const style: CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition: 'width transform 0.2s ease-in-out',
    width: cell.column.getSize(),
    left: isLeftPinned ? cell.column.getStart('left') : undefined,
    right: isRightPinned ? cell.column.getAfter('right') : undefined,
  };
  return (
    <TableCell
      style={style}
      ref={setNodeRef}
      className={cn(
        isPinned && canPin && 'sticky z-10',
        !isPinned && canResize && 'relative',
        isDragging && '!relative !z-50',
        isPinned && isLeftScrollable && 'sticky-right bg-white dark:bg-gray-50',
        isPinned && isRightScrollable && 'sticky-left bg-white dark:bg-gray-50'
      )}
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </TableCell>
  );
}

// Dnd Row wrapper component
export function DragAbleRowWrapper<TData extends Record<string, any>>({
  table,
  dataIds,
  columnOrder,
  isLeftScrollable,
  isRightScrollable,
}: CustomBodyRowProps<TData>) {
  if (!table) return null;
  return (
    <SortableContext items={dataIds!} strategy={verticalListSortingStrategy}>
      {table.getRowModel().rows.map((row) => {
        return (
          <Fragment key={row.id}>
            <DragAbleRow
              row={row}
              columnOrder={columnOrder}
              isLeftScrollable={isLeftScrollable}
              isRightScrollable={isRightScrollable}
            />
            {row.getIsExpanded() && (
              <TableRow>
                <TableCell
                  className="!p-0"
                  colSpan={row.getVisibleCells().length}
                >
                  {CustomExpandedComponent(row)}
                </TableCell>
              </TableRow>
            )}
          </Fragment>
        );
      })}
    </SortableContext>
  );
}

type DragAbleRowProps<TData extends Record<string, any>> = {
  row: Row<TData>;
  columnOrder?: string[];
  isLeftScrollable?: boolean;
  isRightScrollable?: boolean;
};

// Dnd Row child
function DragAbleRow<TData extends Record<string, any>>({
  row,
  columnOrder,
  isLeftScrollable,
  isRightScrollable,
}: DragAbleRowProps<TData>) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1 : 0,
    position: 'relative',
  };
  return (
    <TableRow key={row.id} style={style} ref={setNodeRef}>
      {row.getVisibleCells().map((cell) => (
        <DragAbleCellWrapper
          cell={cell}
          key={cell.id}
          columnOrder={columnOrder}
          isLeftScrollable={isLeftScrollable}
          isRightScrollable={isRightScrollable}
        />
      ))}
    </TableRow>
  );
}

// Row drag handle Component
export function RowDragHandleCell({ rowId }: { rowId: string }) {
  const { attributes, listeners } = useSortable({
    id: rowId,
  });

  return (
    <ActionIcon
      {...attributes}
      {...listeners}
      size="sm"
      variant="text"
      aria-label="Row Drag Handle"
      className="cursor-pointer hover:text-gray-700"
    >
      <PiDotsSixVerticalBold size={20} />
    </ActionIcon>
  );
}

// Custom expanded component for the table
export function CustomExpandedComponent<TData extends Record<string, any>>(
  row: Row<TData>
) {
  return (
    <div className="grid grid-cols-1 divide-y border-y border-muted/70 bg-gray-0 px-3.5 dark:bg-gray-50">
      {row.original.products.map((product: Products) => (
        <article
          key={product.id + product.name}
          className="flex items-center justify-between py-6 first-of-type:pt-2.5 last-of-type:pb-2.5"
        >
          <div className="flex items-start">
            <div className="relative me-4 aspect-[80/60] w-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
              <Image
                fill
                className=" object-cover"
                src={product.image}
                alt={product.name}
              />
            </div>
            <header>
              <Title as="h4" className="mb-0.5 text-sm font-medium">
                {product.name}
              </Title>
              <Text className="mb-1 text-gray-500">{product.category}</Text>
              <Text className="text-xs text-gray-500">
                Unit Price: ${product.price}
              </Text>
            </header>
          </div>
          <div className="flex w-full max-w-xs items-center justify-between gap-4">
            <div className="flex items-center">
              <PiXBold size={13} className="me-1 text-gray-500" />{' '}
              <Text
                as="span"
                className="font-medium text-gray-900 dark:text-gray-700"
              >
                {product.quantity}
              </Text>
            </div>
            <Text className="font-medium text-gray-900 dark:text-gray-700">
              ${Number(product.quantity) * Number(product.price)}
            </Text>
          </div>
        </article>
      ))}
    </div>
  );
}
