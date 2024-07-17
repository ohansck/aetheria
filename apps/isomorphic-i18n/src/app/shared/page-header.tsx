'use client'

import { Title } from 'rizzui';
import cn from '@utils/class-names';
import Breadcrumb from '@ui/breadcrumb';
import { useTranslation } from '../i18n/client';

export type PageHeaderTypes = {
  title: string;
  breadcrumb: { name: string; href?: string }[];
  className?: string;
  lang?: string;
};

export default function PageHeader({
  title,
  breadcrumb,
  children,
  className,
  lang
}: React.PropsWithChildren<PageHeaderTypes>) {
  const { t } = useTranslation(lang!, 'common');

  return (
    <header className={cn('mb-6 @container xs:-mt-2 lg:mb-7', className)}>
      <div className="flex flex-col @lg:flex-row @lg:items-center @lg:justify-between">
        <div>
          <Title
            as="h2"
            className="mb-2 text-[22px] lg:text-2xl 4xl:text-[26px]"
          >
            {t(title!)}
          </Title>

          <Breadcrumb
            separator=""
            separatorVariant="circle"
            className="flex-wrap"
          >
            {breadcrumb.map((item) => (
              <Breadcrumb.Item
                key={item.name}
                {...(item?.href && { href: item?.href })}
              >
                {t(item.name)}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
        </div>
        {children}
      </div>
    </header>
  );
}
