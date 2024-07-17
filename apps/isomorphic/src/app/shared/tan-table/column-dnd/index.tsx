'use client';

import React from 'react';
import { defaultColumns } from './column';
import MainTable from '@/app/shared/table/main-table';
import WidgetCard from '@components/cards/widget-card';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { Person, defaultData } from '@/data/tan-table-data';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import { useTanStackTable } from '@/app/shared/tan-table/custom-table-components/use-TanStack-Table';
import {
  DragAbleCellWrapper,
  DragAbleHeadWrapper,
} from '../custom-table-components';

export default function TableColumnDnd() {
  const { table, setData, handleDragEndColumn, sensors, columnOrder } =
    useTanStackTable<Person>({
      tableData: defaultData,
      columnConfig: defaultColumns,
      options: {
        initialState: {
          pagination: {
            pageIndex: 0,
            pageSize: 7,
          },
        },
        meta: {
          handleDeleteRow: (row) => {
            setData((prev) => prev.filter((r) => r.id !== row.id));
          },
        },
        enableColumnResizing: false,
      },
    });

  return (
    <>
      <WidgetCard title={'Column DnD'} className="flex flex-col gap-4">
        <DndContext
          collisionDetection={closestCenter}
          modifiers={[restrictToHorizontalAxis]}
          onDragEnd={handleDragEndColumn}
          sensors={sensors}
        >
          <MainTable
            table={table}
            variant={'modern'}
            columnOrder={columnOrder}
            components={{
              headerCell: DragAbleHeadWrapper,
              bodyCell: DragAbleCellWrapper,
            }}
          />
        </DndContext>
      </WidgetCard>
    </>
  );
}
