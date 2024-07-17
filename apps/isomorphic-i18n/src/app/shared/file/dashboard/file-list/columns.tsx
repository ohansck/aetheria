"use client";

import Image from "next/image";
import {
  PiCopySimple,
  PiDotsThreeOutlineVerticalFill,
  PiShareFat,
  PiTrashSimple,
} from "react-icons/pi";
import { ActionIcon, Button, Popover, Text } from "rizzui";
import Favorite from "@/app/shared/file/manager/favorite";
import DateCell from "@ui/date-cell";
import { useTranslation } from "@/app/i18n/client";
import { HeaderCell } from "@/app/shared/table";

type Columns = {
  sortConfig?: any;
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  t?: (key: string) => string | undefined;
};

export const getColumns = ({
  sortConfig,
  onDeleteItem,
  onHeaderCellClick,
  t,
}: Columns) => [
  {
    title: <HeaderCell title="table-text-name" className="ps-2" />,
    dataIndex: "file",
    key: "file",
    width: 220,
    render: (file: any, row: any) => (
      <div className="flex items-center ps-2">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
          <Image
            src={file.avatar}
            className="aspect-square h-7 w-7"
            alt={"File Type"}
          />
        </div>
        <div className="ml-3 rtl:ml-0 rtl:mr-3">
          <Text className="mb-0.5 font-lexend !text-sm font-medium text-gray-900 dark:text-gray-700">
            {file.name}
          </Text>
        </div>
      </div>
    ),
  },
  {
    title: <HeaderCell title="table-text-size" />,
    dataIndex: "size",
    key: "size",
    width: 130,
    render: (value: any) => <span className="text-gray-500">{value}</span>,
  },
  {
    title: <HeaderCell title="table-text-type" />,
    dataIndex: "type",
    key: "type",
    width: 130,
    render: (value: any) => (
      <span className="capitalize text-gray-500">{value}</span>
    ),
  },
  {
    title: (
      <HeaderCell
        title="table-text-modified"
        sortable
        ascending={
          sortConfig?.direction === "asc" && sortConfig?.key === "dueDate"
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick("modified"),
    dataIndex: "modified",
    key: "modified",
    width: 150,
    render: (value: Date) => <DateCell date={value} />,
  },
  {
    title: <HeaderCell title="table-text-shared" />,
    dataIndex: "shared",
    key: "shared",
    width: 150,
    render: (value: any) => {
      return (
        <div className="flex items-center justify-start">
          {value.map((img: any, index: number) => {
            return (
              <Image
                key={`fileavatar-${index}`}
                src={img}
                width={30}
                height={30}
                className="-me-2 aspect-square rounded-full border-2 border-gray-0 dark:border-t-gray-50"
                alt="File Avatar"
              />
            );
          })}
        </div>
      );
    },
  },
  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="table-text-action" className="opacity-0" />,
    dataIndex: "action",
    key: "action",
    width: 100,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-end gap-3">
        <Favorite />
        <FileMoreAction onDelete={() => onDeleteItem(row.id)} />
      </div>
    ),
  },
];

function FileMoreAction({
  onDelete,
  lang,
}: {
  onDelete: () => void;
  lang?: string;
}) {
  const { t } = useTranslation(lang!, "common");

  return (
    <Popover placement="bottom-end">
      <Popover.Trigger>
        <ActionIcon title={"More Options"} variant="text">
          <PiDotsThreeOutlineVerticalFill className="h-[18px] w-[18px] text-gray-500" />
        </ActionIcon>
      </Popover.Trigger>
      <Popover.Content className="z-0 min-w-[140px] px-2 py-2 dark:bg-gray-100 [&>svg]:dark:fill-gray-100">
        <div className="text-gray-900">
          <Button
            variant="text"
            className="group flex w-full items-center justify-start px-2 py-2 hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-50"
          >
            <PiCopySimple className="mr-2 h-5 w-5 text-gray-500 duration-300 group-hover:text-primary" />
            {t("text-copy")}
          </Button>
          <Button
            variant="text"
            className="group flex w-full items-center justify-start px-2 py-2 hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-50"
          >
            <PiShareFat className="mr-2 h-5 w-5 text-gray-500 duration-300 group-hover:text-primary" />
            {t("text-share")}
          </Button>
          <Button
            variant="text"
            className="group flex w-full items-center justify-start px-2 py-2 hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-50"
            onClick={onDelete}
          >
            <PiTrashSimple className="mr-2 h-5 w-5 text-gray-500 duration-300 group-hover:text-primary" />
            {t("text-delete")}
          </Button>
        </div>
      </Popover.Content>
    </Popover>
  );
}
