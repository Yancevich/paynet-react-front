import { NavLink } from 'react-router'
import type { FC, SVGProps } from 'react'

import Logo from '@/assets/logo-svg.svg?react'
import HomeIcon from '@/assets/sidebar-logos/home.svg?react'
import CryptoCardsIcon from '@/assets/sidebar-logos/crypto-cards.svg?react'
import HistoryIcon from '@/assets/sidebar-logos/history.svg?react'
import ExchangeIcon from '@/assets/sidebar-logos/exchange.svg?react'
import BuySellIcon from '@/assets/sidebar-logos/buy-sell.svg?react'
import PaymentsIcon from '@/assets/sidebar-logos/payments.svg?react'
import BusinessIcon from '@/assets/sidebar-logos/business.svg?react'
import CollapseIcon from '@/assets/sidebar-logos/collapse.svg?react'
import SettingsIcon from '@/assets/sidebar-logos/settings.svg?react'
import { navigationRoutes, routes } from '@/routes'
import './Sidebar.css'

interface SidebarProps {
  isCollapsed: boolean
  setIsCollapsed: (value: boolean | ((prev: boolean) => boolean)) => void
}

type NavItem = {
  id: number
  title: string
  Icon: FC<SVGProps<SVGSVGElement>>
  path: string
}

const Sidebar: FC<SidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  const iconMap: Record<string, FC<SVGProps<SVGSVGElement>>> = {
    index: HomeIcon,
    cards: CryptoCardsIcon,
    history: HistoryIcon,
    exchange: ExchangeIcon,
    crypto: BuySellIcon,
    payments: PaymentsIcon,
    business: BusinessIcon,
    settings: SettingsIcon,
  }

  const navMap = navigationRoutes.reduce<
    Record<(typeof navigationRoutes)[number]['key'], (typeof navigationRoutes)[number]>
  >((acc, item) => {
    acc[item.key] = item
    return acc
  }, {} as Record<(typeof navigationRoutes)[number]['key'], (typeof navigationRoutes)[number]>)

  const navList: NavItem[] = navigationRoutes
    .filter((item) => item.key !== 'settings')
    .map((item, index) => ({
      id: index + 1,
      title: item.title,
      Icon: iconMap[item.key] ?? HomeIcon,
      path: item.path,
    }))

  const indexPath =
    navigationRoutes.find((route) => route.key === 'index')?.path ?? '/'
  const settingsPath =
    navigationRoutes.find((route) => route.key === 'settings')?.path ??
    '/settings'

  const actionList = [
    {
      id: 1,
      title: 'Collapse',
      Icon: CollapseIcon,
      action: () => setIsCollapsed((prev) => !prev),
    },
  ]

  const mobileNavItems: NavItem[] = [
    {
      id: 1,
      title: 'Home',
      Icon: iconMap.index ?? HomeIcon,
      path: navMap.index?.path ?? '/',
    },
    {
      id: 2,
      title: 'Trade',
      Icon: iconMap.exchange ?? ExchangeIcon,
      path: navMap.exchange?.path ?? routes.exchange.path,
    },
    {
      id: 3,
      title: 'Cards',
      Icon: iconMap.cards ?? CryptoCardsIcon,
      path: navMap.cards?.path ?? routes.cards.path,
    },
    {
      id: 4,
      title: 'Payments',
      Icon: iconMap.payments ?? PaymentsIcon,
      path: navMap.payments?.path ?? routes.payments.path,
    },
    {
      id: 5,
      title: 'More',
      Icon: SettingsIcon,
      path: navMap.settings?.path ?? settingsPath,
    },
  ]

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar__logo">
        <Logo className="sidebar__img" />
      </div>

      <div className="sidebar__body">
        <nav className="sidebar__navigation navigation">
          <ul className="navigation__list">
            {navList.map((item) => (
              <li className="navigation__item" key={item.id}>
                <NavLink
                  to={item.path}
                  end={item.path === indexPath}
                  className={({ isActive }) =>
                    `sidebar-button ${isActive ? 'sidebar-button--active' : ''}`
                  }
                >
                  <item.Icon className="sidebar-button__img" />
                  <span className="sidebar-button__title">{item.title}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="sidebar__actions actions">
        <ul className="action__list">
          {actionList.map((item) => (
            <li
              className="navigation__item sidebar-button"
              key={item.id}
              onClick={item.action}
            >
              <item.Icon className="sidebar-button__img " />
              <span className="sidebar-button__title">{item.title}</span>
            </li>
          ))}
          <li className="navigation__item">
            <NavLink
              to={settingsPath}
              className={({ isActive }) =>
                `sidebar-button ${isActive ? 'sidebar-button--active' : ''}`
              }
            >
              <SettingsIcon className="sidebar-button__img " />
              <span className="sidebar-button__title">Settings</span>
            </NavLink>
          </li>
        </ul>
      </div>

      <nav className="sidebar__mobile-nav">
        <ul className="sidebar__mobile-list">
          {mobileNavItems.map((item) => (
            <li className="sidebar__mobile-item" key={item.id}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `sidebar-tab ${isActive ? 'sidebar-tab--active' : ''}`
                }
              >
                <item.Icon className="sidebar-tab__icon" />
                <span className="sidebar-tab__label">{item.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
