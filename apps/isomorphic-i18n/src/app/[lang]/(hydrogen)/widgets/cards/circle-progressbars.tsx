import { Button, Text, ActionIcon } from 'rizzui';
import cn from '@utils/class-names';
import WidgetCard from '@components/cards/widget-card';
import CircleProgressBar from '@components/charts/circle-progressbar';
import { PiSlidersHorizontalDuotone } from 'react-icons/pi';
import { useTranslation } from '@/app/i18n/client';

const data = [
  {
    name: 'text-new-customers',
    value: '60%',
    percentage: 60,
    color: '#3872FA',
    bgColor: 'bg-[#3872FA]',
    bgActiveColor: 'active:enabled:bg-[#2750AF]',
    message: 'text-new-customers-message',
  },
  {
    name: 'text-convention-rate',
    value: '71%',
    percentage: 71,
    color: '#10b981',
    bgColor: 'bg-[#10b981]',
    bgActiveColor: 'active:enabled:bg-[#059669]',
    message: 'text-new-customers-message',
  },
  {
    name: 'text-page-session',
    value: '80%',
    percentage: 80,
    color: '#f1416c',
    bgColor: 'bg-[#f1416c]',
    bgActiveColor: 'active:enabled:bg-[#f0106c]',
    message: 'text-new-customers-message',
  },
  {
    name: 'text-bounce-rate',
    value: '67%',
    percentage: 67,
    color: '#7928ca',
    bgColor: 'bg-[#7928ca]',
    bgActiveColor: 'active:enabled:bg-[#4c2889]',
    message: 'text-new-customers-message',
  },
];

export default function CircleProgressBars({
  className,
  lang,
}: {
  className?: string;
  lang?: string;
}) {
  const { t } = useTranslation(lang!, 'common');

  return (
    <>
      {data.map((item) => (
        <WidgetCard
          key={item.name}
          title={t(item.name)}
          description={t('text-widget-description')}
          rounded="lg"
          action={
            <ActionIcon variant="outline" rounded="full">
              <PiSlidersHorizontalDuotone className="h-auto w-5" />
            </ActionIcon>
          }
          descriptionClassName="text-gray-500 mt-1.5"
          className={cn(className)}
        >
          <div className="mt-5 grid w-full grid-cols-1 justify-around gap-6 @container @sm:py-2 @7xl:gap-8">
            <div className="text-center">
              <div className="mx-auto mb-5 mt-2 w-full max-w-[180px] sm:mb-7 xl:mb-8 2xl:mb-10 2xl:mt-4">
                <CircleProgressBar
                  percentage={item.percentage}
                  size={180}
                  stroke="#f0f0f0"
                  strokeWidth={12}
                  progressColor={item.color}
                  label={
                    <Text className="font-lexend text-xl font-bold text-gray-900 @xs:text-2xl">
                      {item.value}
                    </Text>
                  }
                  strokeClassName="dark:stroke-gray-200"
                />
              </div>
              <Text className="leading-relaxed">
                <Text as="strong" className="font-semibold">
                {t('text-notes')}:
                </Text>{' '}
                {t(item.message)}
              </Text>
            </div>

            <Button
              size="lg"
              className={cn(
                'text-sm font-semibold text-white',
                item.bgColor,
                item.bgActiveColor
              )}
            >
              {t('text-view-details')}
            </Button>
          </div>
        </WidgetCard>
      ))}
    </>
  );
}
