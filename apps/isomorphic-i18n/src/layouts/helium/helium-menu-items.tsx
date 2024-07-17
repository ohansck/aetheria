import { routes } from '@/config/routes';
import {
  PiSquaresFour,
  PiChartLineUp,
  PiUserGear,
  PiBellSimpleRinging,
  PiUser,
  PiEnvelopeSimpleOpen,
  PiFolders,
} from 'react-icons/pi';

// Note: do not add href in the label object, it is rendering as label
export const menuItems = [
  // label start
  {
    name: 'sidebar-menu-overview',
  },
  // label end
  {
    name: 'sidebar-menu-file-manager',
    href: '/',
    icon: <PiFolders />,
  },

  // label start
  {
    name: 'sidebar-menu-widgets',
  },
  // label end
  {
    name: 'sidebar-menu-cards',
    href: routes.widgets.cards,
    icon: <PiSquaresFour />,
  },
  {
    name: 'sidebar-menu-charts',
    href: routes.widgets.charts,
    icon: <PiChartLineUp />,
  },

  // label start
  {
    name: 'sidebar-menu-forms',
  },
  // label end
  {
    name: 'sidebar-menu-account-settings',
    href: routes.forms.profileSettings,
    icon: <PiUserGear />,
  },
  {
    name: 'sidebar-menu-notification-preference',
    href: routes.forms.notificationPreference,
    icon: <PiBellSimpleRinging />,
  },
  {
    name: 'sidebar-menu-personal-information',
    href: routes.forms.personalInformation,
    icon: <PiUser />,
  },
  {
    name: 'sidebar-menu-newsletter',
    href: routes.forms.newsletter,
    icon: <PiEnvelopeSimpleOpen />,
  },
];
