// import ExportButton from '@/app/shared/export-button';
import ImportButton from '@/app/shared/import-button';
import PageHeader from '@/app/shared/page-header';
import TableBasic from '@/app/shared/tan-table/basic';
import { routes } from '@/config/routes';

const pageHeader = {
  title: 'Tan Stack Table',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Home',
    },
    {
      name: 'Tables',
    },
    {
      name: 'Basic Variants',
    },
  ],
};

export default function TanStackTableBasic() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          {/* <ExportButton data={data} fileName={fileName} header={header} /> */}
          <ImportButton title={'Import File'} />
        </div>
      </PageHeader>

      <TableBasic />
    </>
  );
}
