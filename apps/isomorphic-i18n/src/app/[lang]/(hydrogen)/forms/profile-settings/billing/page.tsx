import BillingSettingsView from '@/app/shared/account-settings/billing-settings';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Billing'),
};

export default function IntegrationSettingsFormPage({
  params: { lang },
}: {
  params: {
    lang: string;
  };
}) {
  return <BillingSettingsView />;
}
