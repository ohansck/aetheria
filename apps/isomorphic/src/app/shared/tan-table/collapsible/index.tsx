'use client';

import React from 'react';
import { defaultColumns } from './column';
import MainTable from '@/app/shared/table/main-table';
import { useDirection } from '@hooks/use-direction';
import WidgetCard from '@components/cards/widget-card';
import { Person, defaultData } from '@/data/tan-table-data';
import { CustomExpandedComponent } from '@/app/shared/tan-table/custom-table-components';
import { useTanStackTable } from '@/app/shared/tan-table/custom-table-components/use-TanStack-Table';

export default function TableCollapsible() {
  const { direction } = useDirection();
  const { table, setData } = useTanStackTable<Person>({
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
      enableColumnResizing: true,
      columnResizeDirection: direction as any,
      columnResizeMode: 'onChange',
    },
  });

  return (
    <>
      <WidgetCard title={'Collapsible Table'} className="flex flex-col gap-4">
        <MainTable
          table={table}
          variant={'modern'}
          components={{
            expandedComponent: CustomExpandedComponent,
          }}
        />
      </WidgetCard>
    </>
  );
}
