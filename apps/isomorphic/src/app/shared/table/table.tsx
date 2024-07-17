import React from 'react';
import cn from '@utils/class-names';

const tableStyles = {
  variants: {
    classic:
      'min-w-full border-collapse [&_thead]:border-y [&_thead]:bg-gray-100 [&_thead]:border-muted/70 [&_th]:text-gray-500 [&_th]:tracking-wider [&_th]:uppercase [&_th]:text-start [&_th]:font-semibold [&_th]:text-xs [&_th]:p-3 [&_tbody_tr]:border-b [&_tbody_tr]:border-muted/70 hover:[&_tbody_tr]:bg-gray-50 [&_td]:text-start [&_td]:py-4 [&_td]:px-3 before:[&_.sticky-left]:pointer-events-none before:[&_.sticky-left]:absolute before:[&_.sticky-left]:bottom-0 before:[&_.sticky-left]:end-0 before:[&_.sticky-left]:top-0 before:[&_.sticky-left]:hidden before:[&_.sticky-left]:w-5 before:[&_.sticky-left]:shadow-[inset_10px_0_8px_-8px_rgba(0,0,0,0.2)] first:before:[&_.sticky-left]:block dark:before:[&_.sticky-left]:shadow-[inset_10px_0_8px_-8px_rgba(130,136,155,0.1)] before:[&_.sticky-left]:transition-shadow before:[&_.sticky-left]:duration-300 before:[&_.sticky-left]:translate-x-full before:[&_.sticky-right]:content-[""] after:[&_.sticky-right]:pointer-events-none after:[&_.sticky-right]:absolute after:[&_.sticky-right]:-bottom-[1px] after:[&_.sticky-right]:start-0 after:[&_.sticky-right]:top-0 after:[&_.sticky-right]:hidden after:[&_.sticky-right]:w-5 after:[&_.sticky-right]:shadow-[inset_-10px_0_8px_-8px_rgba(0,0,0,0.2)] last:after:[&_.sticky-right]:block dark:after:[&_.sticky-right]:shadow-[inset_-10px_0_8px_-8px_rgba(130,136,155,0.1)] after:[&_.sticky-right]:transition-shadow after:[&_.sticky-right]:duration-300 after:[&_.sticky-right]:-translate-x-full after:[&_.sticky-right]:content-[""] [&_th.sticky-left]:bg-gray-100 [&_td.sticky-left]:bg-white dark:[&_td.sticky-left]:bg-gray-50 [&_th.sticky-right]:bg-gray-100 [&_td.sticky-right]:bg-white dark:[&_td.sticky-right]:bg-gray-50',

    modern:
      'min-w-full border-collapse [&_thead]:bg-gray-100 [&_th]:text-start [&_th]:text-gray-500 [&_th]:tracking-wider [&_th]:uppercase [&_th]:font-semibold [&_th]:text-xs [&_th]:p-3 [&_tbody_tr]:border-b [&_tbody_tr]:border-muted/70 hover:[&_tbody_tr]:bg-gray-50 [&_td]:py-4 [&_td]:px-3 before:[&_.sticky-left]:pointer-events-none before:[&_.sticky-left]:absolute before:[&_.sticky-left]:bottom-0 before:[&_.sticky-left]:end-0 before:[&_.sticky-left]:top-0 before:[&_.sticky-left]:hidden before:[&_.sticky-left]:w-5 before:[&_.sticky-left]:shadow-[inset_10px_0_8px_-8px_rgba(0,0,0,0.2)] first:before:[&_.sticky-left]:block dark:before:[&_.sticky-left]:shadow-[inset_10px_0_8px_-8px_rgba(130,136,155,0.1)] before:[&_.sticky-left]:transition-shadow before:[&_.sticky-left]:duration-300 before:[&_.sticky-left]:translate-x-full before:[&_.sticky-right]:content-[""] after:[&_.sticky-right]:pointer-events-none after:[&_.sticky-right]:absolute after:[&_.sticky-right]:-bottom-[1px] after:[&_.sticky-right]:start-0 after:[&_.sticky-right]:top-0 after:[&_.sticky-right]:hidden after:[&_.sticky-right]:w-5 after:[&_.sticky-right]:shadow-[inset_-10px_0_8px_-8px_rgba(0,0,0,0.2)] last:after:[&_.sticky-right]:block dark:after:[&_.sticky-right]:shadow-[inset_-10px_0_8px_-8px_rgba(130,136,155,0.1)] after:[&_.sticky-right]:transition-shadow after:[&_.sticky-right]:duration-300 after:[&_.sticky-right]:-translate-x-full after:[&_.sticky-right]:content-[""] [&_th.sticky-left]:bg-gray-100 [&_td.sticky-left]:bg-white dark:[&_td.sticky-left]:bg-gray-50 [&_th.sticky-right]:bg-gray-100 [&_td.sticky-right]:bg-white dark:[&_td.sticky-right]:bg-gray-50',

    minimal:
      'min-w-full border-collapse [&_thead]:bg-gray-100 first:[&_thead_th]:rounded-s-lg last:[&_thead_th]:rounded-e-lg [&_th]:text-start [&_th]:text-gray-500 [&_th]:tracking-wider [&_th]:uppercase [&_th]:font-semibold [&_th]:text-xs [&_th]:p-3 hover:[&_tbody_tr]:bg-gray-50 [&_td]:py-4 [&_td]:px-3 before:[&_.sticky-left]:pointer-events-none before:[&_.sticky-left]:absolute before:[&_.sticky-left]:bottom-0 before:[&_.sticky-left]:end-0 before:[&_.sticky-left]:top-0 before:[&_.sticky-left]:hidden before:[&_.sticky-left]:w-5 before:[&_.sticky-left]:shadow-[inset_10px_0_8px_-8px_rgba(0,0,0,0.2)] first:before:[&_.sticky-left]:block dark:before:[&_.sticky-left]:shadow-[inset_10px_0_8px_-8px_rgba(130,136,155,0.1)] before:[&_.sticky-left]:transition-shadow before:[&_.sticky-left]:duration-300 before:[&_.sticky-left]:translate-x-full before:[&_.sticky-right]:content-[""] after:[&_.sticky-right]:pointer-events-none after:[&_.sticky-right]:absolute after:[&_.sticky-right]:-bottom-[1px] after:[&_.sticky-right]:start-0 after:[&_.sticky-right]:top-0 after:[&_.sticky-right]:hidden after:[&_.sticky-right]:w-5 after:[&_.sticky-right]:shadow-[inset_-10px_0_8px_-8px_rgba(0,0,0,0.2)] last:after:[&_.sticky-right]:block dark:after:[&_.sticky-right]:shadow-[inset_-10px_0_8px_-8px_rgba(130,136,155,0.1)] after:[&_.sticky-right]:transition-shadow after:[&_.sticky-right]:duration-300 after:[&_.sticky-right]:-translate-x-full after:[&_.sticky-right]:content-[""] [&_th.sticky-left]:bg-gray-100 [&_td.sticky-left]:bg-white dark:[&_td.sticky-left]:bg-gray-50 [&_th.sticky-right]:bg-gray-100 [&_td.sticky-right]:bg-white dark:[&_td.sticky-right]:bg-gray-50',

    elegant:
      'min-w-full border-collapse [&_thead]:border-y [&_thead]:border-muted/70 [&_th]:text-start [&_th]:text-gray-500 [&_th]:tracking-wider [&_th]:uppercase [&_th]:font-semibold [&_th]:text-xs [&_th]:p-3 [&_tbody_tr]:border-b [&_tbody_tr]:border-muted/70 hover:[&_tbody_tr]:bg-gray-50 [&_td]:py-4 [&_td]:px-3 before:[&_.sticky-left]:pointer-events-none before:[&_.sticky-left]:absolute before:[&_.sticky-left]:bottom-0 before:[&_.sticky-left]:end-0 before:[&_.sticky-left]:top-0 before:[&_.sticky-left]:hidden before:[&_.sticky-left]:w-5 before:[&_.sticky-left]:shadow-[inset_10px_0_8px_-8px_rgba(0,0,0,0.2)] first:before:[&_.sticky-left]:block dark:before:[&_.sticky-left]:shadow-[inset_10px_0_8px_-8px_rgba(130,136,155,0.1)] before:[&_.sticky-left]:transition-shadow before:[&_.sticky-left]:duration-300 before:[&_.sticky-left]:translate-x-full before:[&_.sticky-right]:content-[""] after:[&_.sticky-right]:pointer-events-none after:[&_.sticky-right]:absolute after:[&_.sticky-right]:-bottom-[1px] after:[&_.sticky-right]:start-0 after:[&_.sticky-right]:top-0 after:[&_.sticky-right]:hidden after:[&_.sticky-right]:w-5 after:[&_.sticky-right]:shadow-[inset_-10px_0_8px_-8px_rgba(0,0,0,0.2)] last:after:[&_.sticky-right]:block dark:after:[&_.sticky-right]:shadow-[inset_-10px_0_8px_-8px_rgba(130,136,155,0.1)] after:[&_.sticky-right]:transition-shadow after:[&_.sticky-right]:duration-300 after:[&_.sticky-right]:-translate-x-full after:[&_.sticky-right]:content-[""] [&_th.sticky-left]:bg-white [&_td.sticky-left]:bg-white [&_th.sticky-right]:bg-white [&_td.sticky-right]:bg-white',

    retro:
      'min-w-full border-collapse [&_thead]:border-y [&_thead]:border-muted/70 [&_th]:text-start [&_th]:text-gray-500 [&_th]:tracking-wider [&_th]:uppercase [&_th]:font-semibold [&_th]:text-xs [&_th]:p-3 last:[&_tbody_tr]:border-b last:[&_tbody_tr]:border-muted/70 hover:[&_tbody_tr]:bg-gray-50 [&_td]:py-4 [&_td]:px-3 before:[&_.sticky-left]:pointer-events-none before:[&_.sticky-left]:absolute before:[&_.sticky-left]:bottom-0 before:[&_.sticky-left]:end-0 before:[&_.sticky-left]:top-0 before:[&_.sticky-left]:hidden before:[&_.sticky-left]:w-5 before:[&_.sticky-left]:shadow-[inset_10px_0_8px_-8px_rgba(0,0,0,0.2)] first:before:[&_.sticky-left]:block dark:before:[&_.sticky-left]:shadow-[inset_10px_0_8px_-8px_rgba(130,136,155,0.1)] before:[&_.sticky-left]:transition-shadow before:[&_.sticky-left]:duration-300 before:[&_.sticky-left]:translate-x-full before:[&_.sticky-right]:content-[""] after:[&_.sticky-right]:pointer-events-none after:[&_.sticky-right]:absolute after:[&_.sticky-right]:-bottom-[1px] after:[&_.sticky-right]:start-0 after:[&_.sticky-right]:top-0 after:[&_.sticky-right]:hidden after:[&_.sticky-right]:w-5 after:[&_.sticky-right]:shadow-[inset_-10px_0_8px_-8px_rgba(0,0,0,0.2)] last:after:[&_.sticky-right]:block dark:after:[&_.sticky-right]:shadow-[inset_-10px_0_8px_-8px_rgba(130,136,155,0.1)] after:[&_.sticky-right]:transition-shadow after:[&_.sticky-right]:duration-300 after:[&_.sticky-right]:-translate-x-full after:[&_.sticky-right]:content-[""] [&_th.sticky-left]:bg-white [&_td.sticky-left]:bg-white [&_th.sticky-right]:bg-white [&_td.sticky-right]:bg-white',
  },
};

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, variant = 'classic', ...props }, ref) => (
    <table
      ref={ref}
      className={cn(tableStyles.variants[variant], className)}
      {...props}
    />
  )
);

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.ComponentPropsWithRef<'thead'>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={className} {...props} />
));

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.ComponentPropsWithRef<'tbody'>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={className} {...props} />
));

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.ComponentPropsWithRef<'tfoot'>
>(({ className, ...props }, ref) => (
  <tfoot ref={ref} className={className} {...props} />
));

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.ComponentPropsWithRef<'tr'>
>(({ className, ...props }, ref) => (
  <tr ref={ref} className={className} {...props} />
));

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ComponentPropsWithRef<'th'>
>(({ className, ...props }, ref) => (
  <th ref={ref} className={className} {...props} />
));

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.ComponentPropsWithRef<'td'>
>(({ className, ...props }, ref) => (
  <td ref={ref} className={className} {...props} />
));

Table.displayName = 'Table';
TableHeader.displayName = 'TableHeader';
TableBody.displayName = 'TableBody';
TableFooter.displayName = 'TableFooter';
TableRow.displayName = 'TableRow';
TableHead.displayName = 'TableHead';
TableCell.displayName = 'TableCell';

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
};

export type TableVariantProps = keyof typeof tableStyles.variants;
export interface TableProps extends React.ComponentPropsWithRef<'table'> {
  variant?: TableVariantProps;
}
