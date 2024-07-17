"use client";

import { useTranslation } from "./client";
import { SAFlag } from "@components/icons/language/SAFlag";
import { CNFlag } from "@components/icons/language/CNFlag";
import { USFlag } from "@components/icons/language/USFlag";
import { DEFlag } from "@components/icons/language/DEFlag";
import { ESFlag } from "@components/icons/language/ESFlag";
import { usePathname, useRouter } from "next/navigation";
import useQueryParams from "@hooks/use-query-params";
import { useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import cn from "@utils/class-names";
import { PiCaretDownBold } from "react-icons/pi";

type LanguageMenuProps = {
  id: string;
  name: string;
  value: string;
  icon: React.ReactNode;
};

const languageMenu: LanguageMenuProps[] = [
  {
    id: "en",
    name: "English - EN",
    value: "en",
    icon: <USFlag />,
  },
  {
    id: "ar",
    name: "عربى - AR",
    value: "ar",
    icon: <SAFlag />,
  },
  {
    id: "zh",
    name: "中国人 - ZH",
    value: "zh",
    icon: <CNFlag />,
  },
  {
    id: "de",
    name: "Deutsch - DE",
    value: "de",
    icon: <DEFlag />,
  },
  {
    id: "es",
    name: "Español - ES",
    value: "es",
    icon: <ESFlag />,
  },
];

export default function LanguageSwitcher({
  lang,
  className,
  iconClassName,
  variant = "icon",
}: {
  lang: string;
  className?: string;
  iconClassName?: string;
  variant?: "text" | "icon";
}) {
  const { t } = useTranslation(lang!);
  const router = useRouter();
  const pathname = usePathname();
  const pathnameSplit = pathname.split("/");
  const newPathname: string = pathnameSplit.slice(2, pathnameSplit.length).join("/");
  const { query } = useQueryParams(pathname ?? "/");
  const options = languageMenu;
  const currentSelectedItem = lang ? options.find((o) => o.value === lang)! : options[0];
  const [selectedItem, setSelectedItem] = useState(currentSelectedItem);

  function handleItemClick(values: any) {
    setSelectedItem(values);
    const pushPathname: string = `/${values.value}/${newPathname}${query}`;
    router.push(pushPathname);
  }

  return (
    <>
      <Listbox
        value={selectedItem}
        onChange={handleItemClick}
      >
        {({ open }) => (
          <div className="relative z-10 lg:top-[1px]">
            <Listbox.Button
              className={cn(
                "relative flex h-[34px] w-14 items-center justify-center rounded-md p-1 shadow backdrop-blur-md transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/30 focus-visible:ring-opacity-50 hover:enabled:text-gray-1000 active:enabled:translate-y-px dark:bg-gray-100",
                className
              )}
            >
              {variant === "text" ? (
                <span className="block w-full truncate text-left uppercase underline underline-offset-4 rtl:text-right">
                  {t(selectedItem?.value)}
                </span>
              ) : (
                <div className="flex items-center justify-center gap-2 uppercase">
                  <span className={cn("h-4 w-5 shrink-0 overflow-hidden", iconClassName)}>
                    {selectedItem?.icon}
                  </span>
                  <PiCaretDownBold className="size-3.5" />
                </div>
              )}
            </Listbox.Button>
            <Transition
              show={open}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute end-0 z-40 mt-1 max-h-[260px] w-full min-w-[165px] max-w-[165px] overflow-auto rounded-md border border-gray-100 bg-gray-0 p-2 outline-none ring-0 drop-shadow-lg focus:outline-none dark:bg-gray-100">
                {options?.map((option) => (
                  <Listbox.Option
                    key={option.id}
                    className={({ active }) =>
                      `${active ? "text-brand-dark bg-gray-100" : "bg-brand-light"}
												peer relative flex h-10 w-full cursor-pointer select-none items-center rounded-md px-3 py-2 text-sm leading-[40px] text-gray-900 transition duration-200 dark:hover:bg-gray-50`
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <span className="flex items-center">
                        <span className="h-4 w-[22px]">{option?.icon}</span>
                        <span
                          className={`${
                            selected ? "font-medium " : "font-normal"
                          } block truncate pb-0.5 text-sm ltr:ml-1.5 rtl:mr-1.5`}
                        >
                          {t(option?.name)}
                        </span>
                        {selected ? (
                          <span
                            className={`${active && "text-amber-600"}
                                 absolute inset-y-0 flex items-center ltr:left-0 ltr:pl-3 rtl:right-0 rtl:pr-3`}
                          />
                        ) : null}
                      </span>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>

      {/* <SelectBox
        selectClassName="w-full shadow backdrop-blur-md dark:bg-gray-100 border-transparent"
        options={options}
        value={selectedItem}
        onChange={handleItemClick}
        getOptionValue={(option) => option}
        displayValue={(selected: any) =>
          options?.find((option) => option.value === selected?.value)?.name
        }
      /> */}
    </>
  );
}
