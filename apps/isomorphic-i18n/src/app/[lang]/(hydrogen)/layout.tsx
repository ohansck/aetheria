'use client';
import { LAYOUT_OPTIONS } from '@/config/enums';
import { useLayout } from '@/layouts/use-layout';
import HydrogenLayout from '@/layouts/hydrogen/layout';
import HeliumLayout from '@/layouts/helium/helium-layout';
import BerylLiumLayout from '@/layouts/beryllium/beryllium-layout';

import { useIsMounted } from '@hooks/use-is-mounted';
import LithiumLayout from '@/layouts/lithium/lithium-layout';
import BoronLayout from '@/layouts/boron/boron-layout';
import CarbonLayout from '@/layouts/carbon/carbon-layout';

export default function DefaultLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: {
    lang: string;
  };
}) {
  const { layout } = useLayout();
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  if (layout === LAYOUT_OPTIONS.HELIUM) {
    return <HeliumLayout lang={lang}>{children}</HeliumLayout>;
  }
  if (layout === LAYOUT_OPTIONS.LITHIUM) {
    return <LithiumLayout lang={lang}>{children}</LithiumLayout>;
  }
  if (layout === LAYOUT_OPTIONS.BERYLLIUM) {
    return <BerylLiumLayout lang={lang}>{children}</BerylLiumLayout>;
  }
  if (layout === LAYOUT_OPTIONS.BORON) {
    return <BoronLayout lang={lang}>{children}</BoronLayout>;
  }
  if (layout === LAYOUT_OPTIONS.CARBON) {
    return <CarbonLayout lang={lang}>{children}</CarbonLayout>;
  }

  return <HydrogenLayout lang={lang}>{children}</HydrogenLayout>;
}
