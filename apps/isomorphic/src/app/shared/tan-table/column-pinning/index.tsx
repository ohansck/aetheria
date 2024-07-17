'use client';

import React from 'react';
import { defaultColumns } from './column';
import MainTable from '@/app/shared/table/main-table';
import WidgetCard from '@components/cards/widget-card';
import { Person, defaultData } from '@/data/tan-table-data';
import { useTanStackTable } from '@/app/shared/tan-table/custom-table-components/use-TanStack-Table';

export default function TableColumnPinning() {
  const { table, setData } = useTanStackTable<Person>({
    tableData: defaultData,
    columnConfig: defaultColumns,
    options: {
      initialState: {
        columnPinning: {
          left: ['id'],
          right: ['userName'],
        },
        pagination: {
          pageIndex: 0,
          pageSize: 6,
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
      <WidgetCard title={'Column Pinning'} className="flex flex-col gap-4">
        <MainTable table={table} variant={'modern'} />
      </WidgetCard>
    </>
  );
}
