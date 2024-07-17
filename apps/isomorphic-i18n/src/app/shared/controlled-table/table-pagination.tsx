import { PiCaretDownBold } from "react-icons/pi";
import Pagination, { type PaginationProps } from "@ui/pagination";
import { Select } from "rizzui";
import cn from "@utils/class-names";
import { i18nextLanguages } from "@utils/i18next-lang";

const paginationLimitOptions = [5, 10, 15, 20, 25].map((v, idx) => ({
  id: idx,
  label: String(v),
  value: v,
}));

export type TablePaginationProps = {
  pageSize: number;
  setPageSize?: React.Dispatch<React.SetStateAction<number>>;
  paginatorClassName?: string;
  t?: (key: string) => string | undefined;
} & PaginationProps;

export default function TablePagination({
  pageSize,
  setPageSize,
  total,
  paginatorClassName = "mt-5 xs:mt-6 sm:mt-7",
  t,
  ...props
}: TablePaginationProps) {
  const i18next = i18nextLanguages;
  return (
    <div
      className={cn(
        "table-pagination flex items-center justify-center sm:justify-between",
        paginatorClassName
      )}
    >
      {!setPageSize ? (
        total && (
          <div className="hidden text-gray-500 sm:inline-flex">
            {props.current} of {Math.ceil(total / pageSize)}{" "}
            {i18next ? t?.("table-text-pages") : "Pages"}
          </div>
        )
      ) : (
        <div className="hidden items-center sm:flex">
          {i18next ? t?.("table-text-row-per-page") : "Rows per page"}:{" "}
          <Select
            options={paginationLimitOptions}
            onChange={setPageSize}
            size="sm"
            variant="flat"
            value={pageSize}
            getOptionValue={({ value }) => value}
            suffix={<PiCaretDownBold />}
            dropdownClassName="!p-1.5 border w-12 border-gray-100 !z-10 shadow-lg dropdownClassName"
            className="ms-1 w-auto [&_button]:font-medium"
            optionClassName="px-1"
          />
        </div>
      )}
      <Pagination
        total={total}
        pageSize={pageSize}
        defaultCurrent={1}
        showLessItems={true}
        prevIconClassName="py-0 text-gray-500 !leading-[26px]"
        nextIconClassName="py-0 text-gray-500 !leading-[26px]"
        {...props}
      />
    </div>
  );
}
