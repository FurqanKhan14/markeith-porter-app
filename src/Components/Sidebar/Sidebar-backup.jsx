import { Link, NavLink, useLocation } from 'react-router-dom';
import Dashboard from '../../assets/images/sidebar/dashboard.svg?react';
import SubscriptionLogs from '../../assets/images/sidebar/subscriptionLog.svg?react';
import SubscriptionManagement from '../../assets/images/sidebar/subscriptionManagement.svg?react';
import Support from '../../assets/images/sidebar/support.svg?react';
import SupportLogs from '../../assets/images/sidebar/supportLog.svg?react';
import User from '../../assets/images/sidebar/user.svg?react';

import { useEffect, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { HiLockOpen } from 'react-icons/hi2';
import useUserStore from '../../Stores/UserStore';
import { isNullOrEmpty } from '../../Utils/Utils';
import Styles from './Sidebar.module.css';
import { Nav } from 'react-bootstrap';

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
    id: 'user-mgmt',
    label: 'User Management',
    link: '/admin/user-management',
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
    <div
      className={`${Styles.sidebar} ${Styles[sideBarClass]} ${
        disable ? Styles.disabled : ''
      }`}
      id="sidebar"
    >
      {disable && <div className={Styles.overlay}></div>}
      {/* <div className={Styles['sidebar-title-wrapper']}>
        {renderLink(
          '/dashboard',
          <h2 className={Styles['sidebar-title']}>
            M{!sideBarClass && 'ilestone'}
          </h2>
        )}
      </div> */}
      <div id="sidebar-wrapper">
        <div className="main-menu menu-fixed menu-light">
          <div className="main-menu-content">
            <Nav
              activeKey="/home"
              onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
              as="ul"
              className="navigation navigation-main d-block"
              >
              {menuItems.map((item) => (
                 item.roles.includes(role) ? (
                  <Nav.Item as="li" key={item.id}>
                    <NavLink to={item.link}>
                        <i className="fa">
                          {item.icon && <item.icon className={Styles.icon} />}
                        </i>
                        <span className="menu-title">
                        {item.label}
                        </span>
                    </NavLink>
                  </Nav.Item>
                 ) : null
              ))}
              </Nav>
          </div>
        </div>
      </div>

      <div className={Styles['dropdown-container']}>
        {menuItems.map((item) =>
          item.roles.includes(role) ? (
            <div key={item.id} className={Styles['menu-item-container']}>
              {/* Button with no sub items */}
              {item?.link && !item?.subItems?.length ? (
                renderLink(
                  item.link,
                  <button
                    className={`${Styles['menu-item']} ${
                      location.pathname.includes(item.link) ? Styles.active : ''
                    }`}
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={openItem === item.id}
                    aria-controls={`submenu-${item.id}`}
                  >
                    {item.icon && <item.icon className={Styles.icon} />}
                    <p className="m-0">{item.label}</p>
                    {item.subItems ? (
                      <FaChevronDown
                        className={`${Styles.chevron} ${
                          openItem === item.id ? Styles.open : ''
                        }`}
                      />
                    ) : (
                      ''
                    )}
                  </button>
                )
              ) : (
                <>
                  {/* Button with sub items */}
                  <button
                    className={`${Styles['menu-item']} ${
                      location.pathname.includes(item.link) ? Styles.active : ''
                    }`}
                    onClick={(e) => {
                      if (disable) {
                        e.preventDefault();
                        return;
                      }
                      toggleItem(item.id);
                    }}
                    aria-expanded={openItem === item.id}
                    aria-controls={`submenu-${item.id}`}
                  >
                    {item.icon && <item.icon className={Styles.icon} />}
                    <p className="m-0">{item.label}</p>
                    {item.subItems ? (
                      <FaChevronDown
                        className={`${Styles.chevron} ${
                          openItem === item.id ? Styles.open : ''
                        }`}
                      />
                    ) : (
                      ''
                    )}
                  </button>
                </>
              )}
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
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default Sidebar;
