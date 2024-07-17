import TeamSettingsView from '@/app/shared/account-settings/team-settings';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Team'),
};

export default function ProfileSettingsFormPage({
  params: { lang },
}: {
  params: {
    lang: string;
  };
}) {
  return <TeamSettingsView />;
}
