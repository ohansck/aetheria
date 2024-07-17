import WidgetCard from '@components/cards/widget-card';
import { Button, Title, Text } from 'rizzui';
import { teams as apps } from '@/data/teams-data';
import { PiArrowLineUpRightBold } from 'react-icons/pi';
import { useTranslation } from '@/app/i18n/client';

export default function RecentAppList({ lang }: { lang?: string }) {
  const { t } = useTranslation(lang!, 'common');

  return (
    <WidgetCard
      title={t('text-recent-apps')}
      titleClassName="leading-none"
      headerClassName="mb-3 lg:mb-4"
      action={
        <Button variant="outline" size="sm" className="text-sm">
          {t('text-view-all')}
        </Button>
      }
    >
      <div className="grid grid-cols-1 gap-5">
        {apps.map((app) => (
          <div key={app.name} className="flex items-start">
            <div className="me-3 shrink-0">{app.icon}</div>
            <div className="flex w-[calc(100%-48px)] items-center justify-between">
              <div className="w-[calc(100%-40px)]">
                <Title as="h4" className="mb-1 text-sm font-semibold">
                  {app.name}
                </Title>
                <Text className="w-[94%] truncate text-gray-500">
                  {app.content}
                </Text>
              </div>
              <div>
                <a
                  href={app.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow noindex"
                  className="inline-flex rounded-md border border-muted p-2"
                >
                  <PiArrowLineUpRightBold />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </WidgetCard>
  );
}
