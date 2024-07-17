import { siteConfig } from "@/config/site.config";
import { inter, lexendDeca } from "@/app/fonts";
import cn from "@utils/class-names";

import "./[lang]/globals.css";

export const metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning={true}>
      <body
        // to prevent any warning that is caused by third party extensions like Grammerly
        suppressHydrationWarning={true}
        className={cn(inter.variable, lexendDeca.variable, "font-inter")}
      >
        {children}
      </body>
    </html>
  );
}
