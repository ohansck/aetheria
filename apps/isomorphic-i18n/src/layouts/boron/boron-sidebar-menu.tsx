"use client";

import Link from "next/link";
import { Fragment } from "react";
import { usePathname } from "next/navigation";
import { Title} from "rizzui";
import cn from "@utils/class-names";
import { PiCommand } from "react-icons/pi";
import { menuItems } from "@/layouts/boron/boron-menu-items";
import { useBoronKbdShortcuts } from "@/layouts/boron/boron-utils";
import { useTranslation } from "@/app/i18n/client";

export function BoronSidebarMenu({ lang }: { lang?: string }) {
  const pathname = usePathname();
  const { t } = useTranslation(lang!, "nav");

  useBoronKbdShortcuts();

  return (
    <div className="mt-4 pb-3 2xl:pt-1.5 3xl:mt-6">
      {menuItems.map((item, index) => {
        const Icon = item.icon;
        const url = item?.href === "/" ? `/${lang}` : `/${lang}${item?.href}`;
        const isActive = pathname === url

        return (
          <Fragment key={item.name + "-" + index}>
            {item?.href ? (
              <>
                <Link
                  href={`/${lang}${item?.href}` ?? '/'}
                  className={cn(
                    "group relative mx-3 my-0.5 flex items-center justify-between rounded-md px-3 py-2 font-medium capitalize lg:my-1 2xl:mx-5 2xl:my-2",
                    isActive
                      ? "bg-primary text-gray-0"
                      : "text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-700/90"
                  )}
                >
                  <div className="flex w-full items-center truncate">
                    {Icon && (
                      <span
                        className={cn(
                          "me-2 inline-flex h-5 w-5 items-center justify-center rounded-md duration-200 [&>svg]:h-[20px] [&>svg]:w-[20px]",
                          isActive
                            ? "text-gray-0"
                            : "text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700"
                        )}
                      >
                        <Icon />
                      </span>
                    )}
                    <span className="truncate">{t(item.name)}</span>
                    {!!item.shortcut && (
                      <span
                        className={cn(
                          "ms-auto hidden items-center gap-1 rounded px-1 duration-200 xl:inline-flex",
                          isActive
                            ? "bg-gray-100/30 dark:bg-gray-0/20"
                            : "bg-gray-100 group-hover:bg-gray-300"
                        )}
                      >
                        <kbd>
                          <PiCommand
                            strokeWidth={1.3}
                            className="h-[15px] w-[15px]"
                          />
                        </kbd>
                        <kbd>{item.shortcut?.key}</kbd>
                      </span>
                    )}
                  </div>
                </Link>
              </>
            ) : (
              <Title
                as="h6"
                className={cn(
                  "mx-6 mb-2 truncate text-xs font-normal uppercase tracking-widest text-gray-500 2xl:mx-8",
                  index !== 0 &&
                    "mt-6 border-t border-gray-100 pt-6 2xl:pt-8 3xl:mt-7"
                )}
              >
                {t(item.name)}
              </Title>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
