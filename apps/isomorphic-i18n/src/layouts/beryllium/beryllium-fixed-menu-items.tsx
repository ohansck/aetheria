import { routes } from '@/config/routes';
import { IconType } from 'react-icons/lib';
import {
  PiBellSimpleRinging,
  PiChartLineUp,
  PiEnvelopeSimpleOpen,
  PiFolders,
  PiHouse,
  PiNotePencil,
  PiPackage,
  PiSquaresFour,
  PiUser,
  PiUserGear,
} from 'react-icons/pi';
import { atom } from 'jotai';

export interface SubMenuItemType {
  name: string;
  description?: string;
  href: string;
  badge?: string;
}

export interface ItemType {
  name: string;
  icon: IconType;
  href?: string;
  description?: string;
  badge?: string;
  subMenuItems?: SubMenuItemType[];
}

export interface MenuItemsType {
  id: string;
  name: string;
  title: string;
  icon: IconType;
  menuItems: ItemType[];
}

export const berylliumMenuItems: MenuItemsType[] = [
  {
    id: '1',
    name: 'sidebar-menu-home',
    title: 'sidebar-menu-overview',
    icon: PiHouse,
    menuItems: [
      {
        name: 'sidebar-menu-file-manager',
        href: '/',
        icon: PiFolders,
      },
    ],
  },
  {
    id: '4',
    name: 'sidebar-menu-widgets',
    title: 'sidebar-menu-widgets',
    icon: PiPackage,
    menuItems: [
      {
        name: 'sidebar-menu-cards',
        href: routes.widgets.cards,
        icon: PiSquaresFour,
      },
      {
        name: 'sidebar-menu-charts',
        href: routes.widgets.charts,
        icon: PiChartLineUp,
      },
    ],
  },
  {
    id: '5',
    name: 'sidebar-menu-forms',
    title: 'sidebar-menu-forms',
    icon: PiNotePencil,
    menuItems: [
      {
        name: 'sidebar-menu-account-settings',
        href: routes.forms.profileSettings,
        icon: PiUserGear,
      },
      {
        name: 'sidebar-menu-notification-preference',
        href: routes.forms.notificationPreference,
        icon: PiBellSimpleRinging,
      },
      {
        name: 'sidebar-menu-personal-information',
        href: routes.forms.personalInformation,
        icon: PiUser,
      },
      {
        name: 'sidebar-menu-newsletter',
        href: routes.forms.newsletter,
        icon: PiEnvelopeSimpleOpen,
      },
    ],
  },
];
export const berylliumMenuItemAtom = atom(berylliumMenuItems[0]);
