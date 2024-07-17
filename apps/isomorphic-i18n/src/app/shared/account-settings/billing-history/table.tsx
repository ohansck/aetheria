"use client";

import { useMemo, useState } from "react";
import { useColumn } from "@hooks/use-column";
import { getColumns } from "@/app/shared/account-settings/billing-history/columns";
import { useTable } from "@hooks/use-table";
import { Button } from "rizzui";
import TableFooter from "@/app/shared/table-footer";
import ControlledTable from "@/app/shared/controlled-table";
import { exportToCSV } from "@utils/export-to-csv";
import { useTranslation } from "@/app/i18n/client";

export default function BillingHistoryTable({
  className,
  data,
  lang,
}: {
  className?: string;
  lang?: string;
  data: any[];
}) {
  const [pageSize, setPageSize] = useState(10);
  const { t } = useTranslation(lang!, "table");

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

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
        t
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      selectedRowKeys,
      onHeaderCellClick,
      sortConfig.key,
      sortConfig.direction,
      handleRowSelect,
      handleSelectAll,
    ]
  );
  const { visibleColumns } = useColumn(columns);

  const selectedData = data.filter((item) => selectedRowKeys.includes(item.id));
  function handleExportData() {
    exportToCSV(
      selectedData,
      "Title,Amount,Date,Status,Shared",
      `billing_history_${selectedData.length}`
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
        scroll={{ x: 1300 }}
        variant="modern"
        rowKey={(record) => record.id}
        className="text-sm"
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
              {t("text-download")} {selectedRowKeys.length}{" "}
              {selectedRowKeys.length > 1
                ? t("table-text-files")
                : t("table-text-file")}
            </Button>
          </TableFooter>
        }
      />
    </div>
  );
}
