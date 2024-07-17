import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import ImportButton from '@/app/shared/import-button';
import TableResizable from '@/app/shared/tan-table/resizable';

const pageHeader = {
  title: 'Resizable Table',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Home',
    },
    {
      name: 'Table',
    },
    {
      name: 'Resizable',
    },
  ],
};

export default function TanTableResizable() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          {/* <ExportButton data={data} fileName={fileName} header={header} /> */}
          <ImportButton title={'Import File'} />
        </div>
      </PageHeader>

      <TableResizable />
    </>
  );
}
