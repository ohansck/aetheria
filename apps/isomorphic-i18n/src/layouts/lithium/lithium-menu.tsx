"use client";

import Link from "next/link";
import { PiCaretDownBold } from "react-icons/pi";
import cn from "@utils/class-names";
import { ForwardedRef, forwardRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import BulletIcon from "@/layouts/lithium/bullet-icon";
import { AiFillCaretRight } from "react-icons/ai";
import NavMenu from "@/layouts/nav-menu/nav-menu";
import {
  DropdownItemType,
  LithiumMenuItemsKeys,
  lithiumMenuItems,
} from "@/layouts/lithium/lithium-menu-items";
import { usePathname } from "next/navigation";
import { LithiumMenuIconType, lithiumMenuIcons } from "./lithium-menu-icons";
import { useActivePathname } from "@/layouts/lithium/use-pathname-active";
import { useDirection } from "@hooks/use-direction";
import { NavMenuDirection } from "@/layouts/nav-menu/nav-menu-types";
import { useTranslation } from "@/app/i18n/client";

function EnhancedMenuItems({
  items,
  currentState,
  className = "",
  lang,
}: {
  items: DropdownItemType[];
  currentState: number;
  className?: string;
  lang?: string;
}) {
  const pathname = usePathname();
  const { t } = useTranslation(lang!, "nav");
  return (
    <div
      className={cn(
        "w-[calc(100%_-_200px)] rounded-lg bg-white pl-3 dark:bg-gray-100",
        className
      )}
    >
      <ul className="grid list-none grid-cols-2  gap-x-10 gap-y-4 p-7">
        {items &&
          items[currentState] &&
          items[currentState]?.subMenuItems &&
          items[currentState]?.subMenuItems?.map((item, index) => {
            const url =
              item?.href === "/" ? `/${lang}` : `/${lang}${item?.href}`;
            const isActive = pathname === url;
            return (
              <motion.li
                style={{ transformOrigin: "center" }}
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.075 }}
                className="basis-1/2 text-left"
                key={`enhance-menu-item-${item.name}-${index}`}
              >
                <Link
                  href={`/${lang}${item?.href}` ?? "/"}
                  className="group/submenu-link flex items-center gap-3 font-medium text-gray-900"
                >
                  <span
                    className={cn(
                      "text-gray-500 duration-200 group-hover/submenu-link:text-gray-900",
                      {
                        "text-gray-900": isActive,
                      }
                    )}
                  >
                    <BulletIcon className="h-3 w-3" />
                  </span>
                  <span
                    className={cn("duration-200 ", {
                      "group-hover/submenu-link:translate-x-1": !isActive,
                      underline: isActive,
                    })}
                  >
                    {t(item.name)}
                  </span>
                </Link>
              </motion.li>
            );
          })}
      </ul>
    </div>
  );
}

export const EnhancedMenu = forwardRef(
  (
    {
      items,
      className = "",
      lang,
    }: {
      items: DropdownItemType[];
      className?: string;
      lang?: string;
    },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const [currentState, setState] = useState<number>(0);
    const pathname = usePathname();
    const { t } = useTranslation(lang!, "nav");

    useEffect(() => {
      if (
        items.some((item) =>
          item.subMenuItems?.some((subItem) => subItem.href === pathname)
        )
      ) {
        setState(
          items.findIndex((item) =>
            item.subMenuItems?.some((subItem) => subItem.href === pathname)
          )
        );
      }
    }, [items, pathname]);
    return (
      <motion.div
        key="enhanced-menu"
        initial={{ opacity: 0, scale: 0.75 }}
        transition={{ duration: 0.1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        className={cn("flex gap-x-2 p-1 pb-1.5 pe-1.5", className)}
      >
        <div className="col-span-3 flex w-[200px] flex-col gap-2 pe-0">
          {items.map((item, index) => {
            const Icon = lithiumMenuIcons?.[item.icon as LithiumMenuIconType];
            return (
              <button
                role="div"
                key={`link-menu-${item.name}-${index}`}
                className={cn(
                  "relative cursor-pointer rounded-lg p-3 pb-2.5 text-left font-medium text-gray-900 duration-200",
                  {
                    "bg-white dark:bg-gray-100": currentState === index,
                  }
                )}
                onClick={() => setState(index)}
              >
                <div className="mb-2 flex items-center gap-2">
                  <Icon className="h-5 w-5" />
                  <span>{t(item.name)}</span>
                </div>
                <p className="text-xs font-normal leading-5 text-gray-500">
                  {item?.description}
                </p>
                <span
                  className={cn(
                    "absolute -end-[9px]  top-1/2 -translate-y-1/2 text-white opacity-0 duration-200 rtl:rotate-180 dark:text-gray-100",
                    {
                      "opacity-100": currentState === index,
                    }
                  )}
                >
                  <AiFillCaretRight className="h-auto w-3.5" />
                </span>
                <span
                  className={cn(
                    "absolute -end-[17px] top-1/2 -translate-y-1/2 text-gray-50  opacity-0 duration-200 rtl:rotate-180 dark:text-gray-0",
                    {
                      "opacity-100": currentState === index,
                    }
                  )}
                >
                  <AiFillCaretRight className="h-auto w-3.5" />
                </span>
              </button>
            );
          })}
        </div>
        <EnhancedMenuItems
          items={items}
          currentState={currentState}
          lang={lang}
        />
      </motion.div>
    );
  }
);

EnhancedMenu.displayName = "EnhancedMenu";

export function LinkMenu({
  items,
  className = "",
  lang,
}: {
  items: DropdownItemType[];
  className?: string;
  lang?: string;
}) {
  const pathname = usePathname();
  const { t } = useTranslation(lang!, "nav");

  return (
    <ul className={cn("w-full", className, "bg-gray-0 dark:bg-gray-100")}>
      {items.map((item, index) => {
        const Icon = lithiumMenuIcons?.[item.icon as LithiumMenuIconType];
        const isActive = item.href === pathname;
        return (
          <li
            key={`link-menu-${item.name}-${index}`}
            className="relative my-0.5 "
          >
            <Link
              href={`/${lang}${item?.href}` ?? "/"}
              className={cn(
                "flex items-center gap-3 whitespace-nowrap rounded-md bg-gray-100/0 px-3 py-2 font-medium text-gray-900 duration-200 hover:bg-gray-100 hover:dark:bg-gray-50/50",
                { "bg-gray-100 dark:bg-gray-50/50": isActive }
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="relative block">{t(item.name)}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default function HeaderMenuLeft({ lang }: { lang?: string }) {
  const { direction } = useDirection();
  const pathname = usePathname();
  const { t } = useTranslation(lang!, "nav");
  return (
    <>
      <NavMenu
        dir={direction as NavMenuDirection}
        menuClassName="pb-5 top-3 gap-8 relative"
        menuContentClassName="mt-2 border border-gray-200 dark:border-gray-300"
      >
        <NavMenu.Item>
          <NavMenu.Trigger className="flex items-center gap-1 duration-200 ">
            <MenuTriggerButton name="overview" />
          </NavMenu.Trigger>
          <NavMenu.Content className="border border-[red] bg-white dark:bg-gray-100">
            <div className="w-[172px]">
              <LinkMenu
                className="flex flex-col p-3 dark:bg-gray-100"
                items={lithiumMenuItems.overview.dropdownItems ?? []}
                lang={lang}
              />
            </div>
          </NavMenu.Content>
        </NavMenu.Item>
        <NavMenu.Item>
          <NavMenu.Trigger className="flex items-center gap-1 duration-200 ">
            <MenuTriggerButton name="widgets" />
          </NavMenu.Trigger>
          <NavMenu.Content>
            <div className="w-[127px]">
              <LinkMenu
                className="flex flex-col p-3 dark:bg-gray-100"
                items={lithiumMenuItems.widgets.dropdownItems ?? []}
                lang={lang}
              />
            </div>
          </NavMenu.Content>
        </NavMenu.Item>
        <NavMenu.Item>
          <NavMenu.Trigger className="flex items-center gap-1 duration-200 ">
            <MenuTriggerButton name="forms" />
          </NavMenu.Trigger>
          <NavMenu.Content>
            <div className="w-[460px]">
              <LinkMenu
                className="grid grid-cols-2 gap-x-2 p-3 dark:bg-gray-100"
                items={lithiumMenuItems.forms.dropdownItems ?? []}
                lang={lang}
              />
            </div>
          </NavMenu.Content>
        </NavMenu.Item>
      </NavMenu>
    </>
  );
}

function MenuTriggerButton({
  name,
  lang,
}: {
  name: LithiumMenuItemsKeys;
  lang?: string;
}) {
  const { t } = useTranslation(lang!, "nav");
  const { isActive } = useActivePathname();
  return (
    <>
      <span
        className={cn(
          "inline-block w-full overflow-hidden whitespace-nowrap pe-1.5 ps-0 text-sm font-medium leading-5 text-gray-900 transition-all duration-200",
          isActive(lithiumMenuItems[name].dropdownItems)
            ? "text-primary "
            : "group-hover:text-gray-900"
        )}
      >
        {t(lithiumMenuItems[name].name)}
      </span>
      <span
        className={cn(
          "text-gray-900 duration-200",
          isActive(lithiumMenuItems[name].dropdownItems!) && "text-primary"
        )}
      >
        <PiCaretDownBold />
      </span>
    </>
  );
}
