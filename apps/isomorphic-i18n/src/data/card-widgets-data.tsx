import {
  PiBankDuotone,
  PiFileTextDuotone,
  PiGiftDuotone,
  PiPulseDuotone,
} from 'react-icons/pi';

export const widgetCardStat = [
  {
    title: 'text-revenue',
    metric: '$2780.00',
    bgColor: 'bg-[#3872FA]',
    textColor: 'text-[#3872FA]',
    icon: <PiBankDuotone className="h-6 w-6" />,
  },
  {
    title: 'text-profit',
    metric: '$2780.00',
    bgColor: 'bg-[#10b981]',
    textColor: 'text-[#10b981]',
    icon: <PiGiftDuotone className="h-6 w-6" />,
  },
  {
    title: 'text-invoices',
    metric: '$2780.00',
    bgColor: 'bg-[#f1416c]',
    textColor: 'text-[#f1416c]',
    icon: <PiFileTextDuotone className="h-6 w-6" />,
  },
  {
    title: 'text-expense',
    metric: '$2780.00',
    bgColor: 'bg-[#7928ca]',
    textColor: 'text-[#7928ca]',
    icon: <PiPulseDuotone className="h-6 w-6" />,
  },
];

export const widgetData = [
  {
    name: 'text-sales',
    color: '#3872FA',
    stat: widgetCardStat,
  },
  {
    name: 'text-profit',
    color: '#10b981',
    statTitle: 'Profit',
    statMetric: '$2780.00',
    stat: widgetCardStat,
  },
  {
    name: 'text-customer',
    color: '#f1416c',
    statTitle: 'Overdue Invoices',
    statMetric: '$2780.00',
    stat: widgetCardStat,
  },
  {
    name: 'text-inventory',
    color: '#7928ca',
    statTitle: 'Expense',
    statMetric: '$2780.00',
    stat: widgetCardStat,
  },
];

export const chartData = [
  {
    day: 'Mon',
    bounceRate: 40,
    pageSession: 40,
  },
  {
    day: 'Tue',
    bounceRate: 90,
    pageSession: 30,
  },
  {
    day: 'Thu',
    bounceRate: 64,
    pageSession: 43,
  },
  {
    day: 'Wed',
    bounceRate: 99,
    pageSession: 50,
  },
  {
    day: 'Fri',
    bounceRate: 50,
    pageSession: 70,
  },
  {
    day: 'Sun',
    bounceRate: 70,
    pageSession: 80,
  },
];
