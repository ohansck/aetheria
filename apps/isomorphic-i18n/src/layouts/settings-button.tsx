"use client";

import dynamic from "next/dynamic";
import CogSolidIcon from "@components/icons/cog-solid";
import { ActionIcon } from "rizzui";
import cn from "@utils/class-names";
import DrawerHeader from "@/layouts/drawer-header";
import { usePresets } from "@/config/color-presets";
import { useDrawer } from "@hooks/use-drawer";
import { useApplyColorPreset, useColorPresets } from "./settings/use-theme-color";
const SettingsDrawer = dynamic(() => import("@/layouts/settings-drawer"), {
  ssr: false,
});

export default function SettingsButton({
  className,
  children,
  t,
}: {
  className?: string;
  children?: React.ReactNode;
  t?: (key: string) => string | undefined;
}) {
  const COLOR_PRESETS = usePresets();
  const { openDrawer, closeDrawer } = useDrawer();
  const { colorPresets } = useColorPresets();

  useApplyColorPreset<any>(colorPresets ?? COLOR_PRESETS[0].colors);

  return (
    <ActionIcon
      aria-label="Settings"
      variant="text"
      className={cn(
        "relative h-[34px] w-[34px] shadow backdrop-blur-md dark:bg-gray-100 md:h-9 md:w-9",
        className
      )}
      onClick={() =>
        openDrawer({
          view: (
            <>
              <DrawerHeader onClose={closeDrawer} />
              <SettingsDrawer />
            </>
          ),
          placement: "right",
          customSize: "420px",
        })
      }
    >
      {children ? (
        children
      ) : (
        <CogSolidIcon
          strokeWidth={1.8}
          className="h-[22px] w-auto animate-spin-slow"
        />
      )}
    </ActionIcon>
  );
}
