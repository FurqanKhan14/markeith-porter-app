import { Link, NavLink, useLocation } from 'react-router-dom';
import Dashboard from '../../assets/images/sidebar/dashboard.svg?react';
import SubscriptionLogs from '../../assets/images/sidebar/subscriptionLog.svg?react';
import SubscriptionManagement from '../../assets/images/sidebar/subscriptionManagement.svg?react';
import Support from '../../assets/images/sidebar/support.svg?react';
import SupportLogs from '../../assets/images/sidebar/supportLog.svg?react';
import User from '../../assets/images/sidebar/user.svg?react';

import React, { useEffect, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { HiLockOpen } from 'react-icons/hi2';
import useUserStore from '../../Stores/UserStore';
import { isNullOrEmpty } from '../../Utils/Utils';
import Styles from './Sidebar.module.css';
import { Nav } from 'react-bootstrap';
import './styles.css';

const menuItems = [
  {
    roles: ['employee', 'user'],
    id: '1',
    label: 'Dashboard',
    link: '/dashboard',
    icon: Dashboard,
  },
  {
    roles: ['admin'],
    id: 'admin-dashboard',
    label: 'Dashboard',
    link: '/admin/dashboard',
    icon: Dashboard,
  },
  {
    roles: ['admin'],
    id: 'head-coach-management',
    label: 'Head Coach Management',
    link: '/admin/head-coach-management',
    icon: User,
  },
  {
    roles: ['admin'],
    id: 'subscription-mgmt',
    label: 'Subscription Logs',
    link: '/admin/subscription-logs',
    icon: User,
  },
  {
    roles: ['admin'],
    id: 'query-mgmt',
    label: 'Query Management',
    link: '/admin/query-management',
    icon: User,
  },
  {
    roles: ['admin'],
    id: 'promo-code',
    label: 'Promo code',
    link: '/admin/promo-code-Management',
    icon: User,
  },
];

const Sidebar = ({ sideBarClass, disable = false }) => {
  const location = useLocation();
  const [openItem, setOpenItem] = useState(null);
  const isCollapsed = sideBarClass === 'collapsed';
  const { role } = useUserStore();

  const toggleItem = (id) => {
    setOpenItem(openItem === id ? null : id);
  };

  useEffect(() => {
    if (isCollapsed) {
      setOpenItem(null); // Close all items when sidebar collapses
    }
  }, [isCollapsed]);

  useEffect(() => {
    if (sideBarClass) {
      setOpenItem(null);
    }
  }, [sideBarClass]);

  const renderLink = (to, children) => {
    if (disable) {
      return <div className={Styles.disabledLink}>{children}</div>;
    }
    return <Link to={to}>{children}</Link>;
  };

  return (
    <div className={`${disable ? Styles.disabled : ''}`} id="admin-sidebar">
      {disable && <div className={Styles.overlay}></div>}
      {/* <div className={Styles['sidebar-title-wrapper']}>
        {renderLink(
          '/dashboard',
          <h2 className={Styles['sidebar-title']}>
            M{!sideBarClass && 'ilestone'}
          </h2>
        )}
      </div> */}

      <div className="side-nav-wrapper">
        <Nav
          activeKey="/home"
          onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
          as="ul"
          className="side-nav d-block"
        >
          {menuItems.map((item,) =>
            item.roles.includes(role) ? (
              <React.Fragment key={item.id}>
                <Nav.Item as="li">
                  <NavLink to={item.link}>
                    <i className="fa">
                      {item.icon && <item.icon className={Styles.icon} />}
                    </i>
                    <span className="menu-title">{item.label}</span>
                  </NavLink>
                </Nav.Item>

                {!isNullOrEmpty(item.subItems) && (
                  <div
                    id={`submenu-${item.id}`}
                    className={`${Styles.submenu} ${
                      openItem === item.id ? Styles.open : ''
                    }`}
                  >
                    {item.subItems.map((subItem, index) => {
                      return subItem.link ? (
                        <div key={subItem.link}>
                          {renderLink(
                            subItem.link,
                            <div
                              className={`${Styles['submenu-item']} ${
                                index === item.subItems.length - 1
                                  ? Styles['last-item']
                                  : ''
                              } ${
                                location.pathname.includes(subItem.link)
                                  ? Styles.active
                                  : ''
                              }`}
                            >
                              {subItem.name}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div
                          key={subItem.name}
                          className={`${Styles['submenu-item']}`}
                        >
                          <p className="mb-0 fw-bold fst-italic">
                            {subItem.name}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </React.Fragment>
            ) : null
          )}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
