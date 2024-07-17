import Link from "next/link";
import { Fragment } from "react";
import { useTranslation } from "@/app/i18n/client";
import { usePathname } from "next/navigation";
import { Title } from "rizzui";
import cn from "@utils/class-names";
import { menuItems } from "@/layouts/helium/helium-menu-items";

export function HeliumSidebarMenu({ lang }: { lang?: string }) {
  const { t } = useTranslation(lang!, "nav");
  const pathname = usePathname();

  return (
    <div className="mt-4 pb-3 3xl:mt-6">
      {menuItems.map((item, index) => {
        const url = item?.href === "/" ? `/${lang}` : `/${lang}${item?.href}`;
        const isActive = pathname === url

        return (
          <Fragment key={item.name + "-" + index}>
            {item?.href ? (
              <>
                <Link
                  href={`/${lang}${item?.href}`}
                  className={cn(
                    "group relative mx-3 my-0.5 flex items-center justify-between rounded-md px-3 py-2 font-medium capitalize lg:my-1 2xl:mx-5 2xl:my-2",
                    isActive
                      ? "before:top-2/5 text-white before:absolute before:-start-3 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md before:bg-white dark:text-gray-900 2xl:before:-start-5"
                      : "text-gray-300/70 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-700"
                  )}
                >
                  <div className="flex items-center truncate">
                    {item?.icon && (
                      <span
                        className={cn(
                          "me-2 inline-flex h-5 w-5 items-center justify-center rounded-md transition-colors duration-200 [&>svg]:h-[20px] [&>svg]:w-[20px]",
                          isActive
                            ? "text-white dark:text-gray-900"
                            : "text-gray-300/70 group-hover:text-gray-500 dark:text-gray-500 "
                        )}
                      >
                        {item?.icon}
                      </span>
                    )}
                    <span className="truncate">{t(item.name)}</span>
                  </div>
                </Link>
              </>
            ) : (
              <Title
                as="h6"
                className={cn(
                  "mb-2 truncate px-6 text-xs font-normal uppercase tracking-widest text-gray-500 dark:text-gray-500 2xl:px-8",
                  index !== 0 && "mt-6 3xl:mt-7"
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
