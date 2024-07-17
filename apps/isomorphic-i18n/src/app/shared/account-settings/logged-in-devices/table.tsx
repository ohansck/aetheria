'use client';

import { useMemo, useState } from 'react';
import { getColumns } from '@/app/shared/account-settings/logged-in-devices/columns';
import { useTable } from '@hooks/use-table';
import { useColumn } from '@hooks/use-column';
import { Button } from 'rizzui';
import TableFooter from '@/app/shared/table-footer';
import ControlledTable from '@/app/shared/controlled-table';
import { exportToCSV } from '@utils/export-to-csv';
import { useTranslation } from '@/app/i18n/client';

export default function LoggedInDevices({
  className,
  data = [],
  lang,
}: {
  className?: string;
  data: any[];
  lang?: string;
}) {
  const [pageSize, setPageSize] = useState(10);
  const { t } = useTranslation(lang!, 'table');
  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });
  const onDeleteItem = (id: string) => handleDelete(id);

  const {
    isLoading,
    tableData,
    currentPage,
    totalItems,
    handlePaginate,
    sortConfig,
    handleSort,
    selectedRowKeys,
    setSelectedRowKeys,
    handleRowSelect,
    handleSelectAll,
    handleDelete,
  } = useTable(data, pageSize, data);

  const columns = useMemo(
    () =>
      getColumns({
        data,
        sortConfig,
        checkedItems: selectedRowKeys,
        onHeaderCellClick,
        onChecked: handleRowSelect,
        handleSelectAll,
        onDeleteItem,
        t
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      selectedRowKeys,
      onHeaderCellClick,
      sortConfig.key,
      sortConfig.direction,
      onDeleteItem,
      handleRowSelect,
      handleSelectAll,
    ]
  );
  const { visibleColumns } = useColumn(columns);

  const selectedData = data.filter((item) => selectedRowKeys.includes(item.id));
  function handleExportData() {
    exportToCSV(
      selectedData,
      'ID,User,Email,Status,Teams',
      `logged_in_devices_${selectedData.length}`
    );
  }

  return (
    <div className={className}>
      <ControlledTable
        isLoading={isLoading}
        data={tableData}
        t={t}
        // @ts-ignore
        columns={visibleColumns}
        variant="modern"
        rowKey={(record) => record.id}
        className="w-full text-sm"
        paginatorOptions={{
          pageSize,
          setPageSize,
          total: totalItems,
          current: currentPage,
          onChange: (page: number) => handlePaginate(page),
        }}
        tableFooter={
          <TableFooter
            checkedItems={selectedRowKeys}
            handleDelete={(ids: string[]) => {
              setSelectedRowKeys([]);
              handleDelete(ids);
            }}
          >
            <Button
              size="sm"
              onClick={() => handleExportData()}
              className="dark:bg-gray-300 dark:text-gray-800"
            >
              {t('table-text-download')} {selectedRowKeys.length}{' '}
              {selectedRowKeys.length > 1
                ? t('table-text-files')
                : t('table-text-file')}
            </Button>
          </TableFooter>
        }
      />
    </div>
  );
}
