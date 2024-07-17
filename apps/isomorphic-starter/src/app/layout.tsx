import type { Metadata } from "next";
import { inter, lexendDeca } from '@/app/fonts';
import cn from '@utils/class-names';
import { Toaster } from 'react-hot-toast';
import NextProgress from '@components/next-progress';
import HydrogenLayout from '@/layouts/hydrogen/layout';
import { ThemeProvider } from "@/app/shared/theme-provider";
import GlobalDrawer from "@/app/shared/drawer-views/container";
import GlobalModal from "@/app/shared/modal-views/container";

import "./globals.css";

export const metadata: Metadata = {
  title: "Isomorphic Starter Template",
  description: "Isomorphic the ultimate React TypeScript Admin Template. Streamline your admin dashboard development with our feature-rich, responsive, and highly customizable solution. Boost productivity and create stunning admin interfaces effortlessly.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html
      lang="en"
      dir="ltr"
      // required this one for next-themes, remove it if you are not using next-theme
      suppressHydrationWarning
    >
      <body
        // to prevent any warning that is caused by third party extensions like Grammarly
        suppressHydrationWarning
        className={cn(inter.variable, lexendDeca.variable, 'font-inter')}
      >
          <ThemeProvider>
            <NextProgress />
            <HydrogenLayout>{children}</HydrogenLayout>
            <Toaster />
            <GlobalDrawer />
            <GlobalModal />
          </ThemeProvider>
      </body>
    </html>
  );
}
