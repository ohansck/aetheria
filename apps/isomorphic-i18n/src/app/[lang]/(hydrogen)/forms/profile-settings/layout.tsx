import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import ProfileSettingsNav from '@/app/shared/account-settings/navigation';

const pageHeader = {
  title: 'text-account-settings',
  breadcrumb: [
    {
      href: '/',
      name: 'text-home',
    },
    {
      href: routes.forms.profileSettings,
      name: 'text-form',
    },
    {
      name: 'text-account-settings',
    },
  ],
};

export default function ProfileSettingsLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: {
    lang: string;
  };
}) {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <ProfileSettingsNav />
      {children}
    </>
  );
}
