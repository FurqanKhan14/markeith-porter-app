import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import {
  // Navbar as BootstrapNavbar,
  Navbar,
  Button,
  Dropdown,
  ListGroup,
} from 'react-bootstrap';
import { GoBell } from 'react-icons/go';
import { HiMenu, HiOutlineColorSwatch } from 'react-icons/hi';
import { LuLogOut } from 'react-icons/lu';
import { RiUserSettingsLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { useLogout } from '../../Hooks/useLogout';
import {
  editNotification,
  getNotifications,
} from '../../Services/Admin/Notifications';
import useUserStore from '../../Stores/UserStore';
import { calculateTimePassed } from '../../Utils/Utils';
import CustomButton from '../Common/CustomButton';
import CustomModal from '../CustomModal';
import TableActionDropDown from '../TableActionDropDown/TableActionDropDown';
import './navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faChevronDown,
  faEllipsisV,
  faRightFromBracket,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { images } from '../../assets';

const Header = ({ sideBarToggle, sideBarClass }) => {
  let navigate = useNavigate();
  const { user, role } = useUserStore();
  const logoutMutation = useLogout();
  const branch_name = user?.branch_name;
  const [logoutModal, setLogoutModal] = useState(false);
  const queryClient = useQueryClient();
  const [params, setParams] = useState({ unread_only: 1 });

  //GET NOTIFICATIONS
  const { data: notificationsData } = useQuery({
    queryKey: ['getNotifications', params],
    queryFn: () => getNotifications(params),
    refetchOnWindowFocus: false,
    retry: 1,
    enabled: role === 'admin',
  });

  const notificationState = notificationsData?.notifications?.data ?? [];

  const editNotificationMutation = useMutation({
    mutationFn: (id) => editNotification(id),
    onSuccess: () => {
      queryClient.invalidateQueries('PackageDetails');
    },
    onError: (error) => {
      console.error('Error updating notification', error);
      showErrorToast(error);
    },
  });

  const getInitials = (name = '') => {
    return name
      ?.split(' ')
      ?.map((word) => word?.[0]?.toUpperCase())
      ?.join('');
  };
  const handleLogoutClick = () => {
    setLogoutModal(true);
  };

  const logoutAdmin = () => {
    logoutMutation.mutate(role);
  };

  const markAsRead = (id) => {
    editNotificationMutation.mutate(id);
  };

  return (
    <>
      <header id="header">
        <Navbar className="header-navbar" expand="md" variant="light">
          <div className="navbar-wrapper w-100 d-md-flex">
            <div className="navbar-header d-flex">
              <ul className="nav navbar-nav flex-row flex-grow-1 d-flex">
                <li className="nav-item d-md-none align-self-center ps-3">
                  <Button
                    className="menu-toggle"
                    variant=""
                    size=""
                    // onClick={props.toggleSideNav}
                  >
                    <FontAwesomeIcon icon={faBars} />
                  </Button>
                </li>
                <li className="nav-item align-self-center flex-grow-1 text-center">
                  <Navbar.Brand as={Link} to="/admin/dashboard">
                    <img
                      src={images.adminLogo}
                      className="brand-logo img-fluid"
                      alt="admin logo"
                    />
                  </Navbar.Brand>
                </li>
                <li className="nav-item d-md-none align-self-center pe-3">
                  <Navbar.Toggle
                    aria-controls="navbar-mobile"
                    className="menu-toggle"
                  >
                    <FontAwesomeIcon icon={faEllipsisV} />
                  </Navbar.Toggle>
                </li>
              </ul>
            </div>

            <div className="navbar-container flex-grow-1 align-self-center">
              <Navbar.Collapse id="navbar-mobile" className='navbar-mobile'>
                <ListGroup
                  bsPrefix="nav navbar-nav ms-auto justify-content-end d-flex flex-row"
                  as="ul"
                >
                  <ListGroup.Item
                    as="li"
                    className="nav-item d-flex align-self-center me-4"
                  >
                    <Dropdown className="notiDropdown d-flex ">
                      <Dropdown.Toggle
                        variant="transparent"
                        className="position-relative notButton  p-0"
                      >
                        <GoBell className="notification-bell-icon" size={28} />
                        <span className="badge">
                          {notificationState.length > 9
                            ? '9+'
                            : notificationState.length}
                        </span>
                      </Dropdown.Toggle>
                      <Dropdown.Menu className={`notiMenu`} align="end">
                        <div className="notificationsBody">
                          <div className="notificationsBodyHeader py-2">
                            <p className="mb-0 fw-medium">Notifications</p>
                            <div className="newNotificationCount">
                              <p>{notificationState.length} new</p>
                            </div>
                          </div>
                          <hr className="my-0" />
                          {notificationState?.map((notification, index) => (
                            <div
                              className={`singleNoti gap-2 ${
                                notification.read_at ? 'read' : 'unread'
                              }`}
                              key={notification.id}
                            >
                              <div className="notificationBell">
                                <GoBell size={18} />
                              </div>
                              <div className="singleNotiContent flex-grow-1 d-flex flex-column justify-content-between gap-2">
                                <p className="notiTitle">
                                  {notification.data.body}
                                </p>
                                <div className="d-flex align-items-end justify-content-between">
                                  <div className="d-flex flex-wrap gap-0 gap-sm-2">
                                    <p className="notiDateTime d-flex gap-2">
                                      {calculateTimePassed(
                                        notification.created_at
                                      )}
                                    </p>
                                  </div>
                                  {!notification.read_at && (
                                    <button
                                      className={`notification-btn flex-shrink-0${
                                        notification.read
                                          ? 'read-btn'
                                          : ' unread-btn'
                                      }`}
                                      onClick={() =>
                                        markAsRead(notification?.id)
                                      }
                                    >
                                      Mark As Read
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="notiFooter">
                          <Dropdown.Toggle
                            variant="transparent"
                            className="notButton notifi-btn p-0"
                          >
                            <Link to={'/notifications'}>View All</Link>
                          </Dropdown.Toggle>
                        </div>
                      </Dropdown.Menu>
                    </Dropdown>
                  </ListGroup.Item>
                  <ListGroup.Item as="li" className="nav-item dropdown-user">
                    <TableActionDropDown
                      actions={[
                        {
                          name: 'My Profile',
                          icon: RiUserSettingsLine,
                          onClick: () => {
                            if (user?.role === 'admin') {
                              navigate('/admin/profile');
                            } else {
                              navigate('/profile');
                            }
                          },
                        },
                        {
                          name: 'Logout',
                          icon: LuLogOut,
                          onClick: handleLogoutClick,
                        },
                      ]}
                    >
                      <div className="user-avatar">
                        <div className="user-image">
                          
                          <img src={user?.["photo-path"] || images.placeholder} alt="avatar" />
                        </div>
                        <h6>{getInitials(user?.user_name || "Hello")}</h6>
                        <h6>Hello!</h6>
                      </div>
                    </TableActionDropDown>

                    {/* <Dropdown className="dropdown-user">
                      <Dropdown.Toggle
                        className="after-none"
                        variant=""
                        id="dropdown-basic"
                      >
                        <span className="avatar avatar-online">
                          <img src={user?.photo} alt="avatar" />
                          <h6>
                            <h6>{getInitials(user?.user_name)}</h6>
                          </h6>
                        </span>
                        <span className="user-name fw-semibold"></span>
                        <FontAwesomeIcon
                          className="ms-2"
                          icon={faChevronDown}
                        ></FontAwesomeIcon>
                      </Dropdown.Toggle>

                      <Dropdown.Menu align="end">
                        <Dropdown.Item as={Link} to={`/${role}/profile`}>
                          <FontAwesomeIcon icon={faUser} />
                          My Profile
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => setShowModal(true)}>
                          <FontAwesomeIcon icon={faRightFromBracket} />
                          Logout
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown> */}
                  </ListGroup.Item>
                  <ListGroup.Item
                    as="li"
                    className="nav-item d-none d-md-block d-lg-none align-self-center ms-2"
                  >
                    <Button
                      className="menu-toggle"
                      variant=""
                      size=""
                      // onClick={props.toggleSideNav}
                    >
                      <FontAwesomeIcon icon={faBars} />
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Navbar.Collapse>
            </div>
          </div>
        </Navbar>
      </header>

      <Navbar className={`customHeader ${sideBarClass}`} expand="md">
        <div className="d-flex gap-2 gap-sm-3">
          <div
            className={`toggleSidebarButton beechMein ${sideBarClass}`}
            onClick={sideBarToggle}
          >
            <HiMenu size={26} />
          </div>
          <h4 className="screen-title-body header-branch-name mb-0">
            {branch_name}
          </h4>
        </div>

        <div className="d-flex gap-2 gap-sm-3">
          {role !== 'admin' && (
            <CustomButton onClick={() => navigate('support')}>
              Support
            </CustomButton>
          )}

          <Dropdown className="notiDropdown d-flex ">
            <Dropdown.Toggle
              variant="transparent"
              className="position-relative notButton  p-0"
            >
              <GoBell className="notification-bell-icon" size={28} />
              <span className="badge">
                {notificationState.length > 9 ? '9+' : notificationState.length}
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu className={`notiMenu`} align="end">
              <div className="notificationsBody">
                <div className="notificationsBodyHeader py-2">
                  <p className="mb-0 fw-medium">Notifications</p>
                  <div className="newNotificationCount">
                    <p>{notificationState.length} new</p>
                  </div>
                </div>
                <hr className="my-0" />
                {notificationState?.map((notification, index) => (
                  <div
                    className={`singleNoti gap-2 ${
                      notification.read_at ? 'read' : 'unread'
                    }`}
                    key={notification.id}
                  >
                    <div className="notificationBell">
                      <GoBell size={18} />
                    </div>
                    <div className="singleNotiContent flex-grow-1 d-flex flex-column justify-content-between gap-2">
                      <p className="notiTitle">{notification.data.body}</p>
                      <div className="d-flex align-items-end justify-content-between">
                        <div className="d-flex flex-wrap gap-0 gap-sm-2">
                          <p className="notiDateTime d-flex gap-2">
                            {calculateTimePassed(notification.created_at)}
                          </p>
                        </div>
                        {!notification.read_at && (
                          <button
                            className={`notification-btn flex-shrink-0${
                              notification.read ? 'read-btn' : ' unread-btn'
                            }`}
                            onClick={() => markAsRead(notification?.id)}
                          >
                            Mark As Read
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="notiFooter">
                <Dropdown.Toggle
                  variant="transparent"
                  className="notButton notifi-btn p-0"
                >
                  <Link to={'/notifications'}>View All</Link>
                </Dropdown.Toggle>
              </div>
            </Dropdown.Menu>
          </Dropdown>

          {/* <CustomButton onClick={() => toggleTheme()}>
            Toggle Theme
          </CustomButton> */}
          <TableActionDropDown
            actions={[
              {
                name: 'My Profile',
                icon: RiUserSettingsLine,
                onClick: () => {
                  if (user?.role === 'admin') {
                    navigate('/admin/profile');
                  } else {
                    navigate('/profile');
                  }
                },
              },
              {
                name: 'Logout',
                icon: LuLogOut,
                onClick: handleLogoutClick,
              },
            ]}
          >
            <div className="userImage beechMein">
              <h6>{getInitials(user?.user_name)}</h6>
            </div>
          </TableActionDropDown>
        </div>
      </Navbar>
      <CustomModal
        show={logoutModal}
        close={() => {
          setLogoutModal(false);
        }}
        disableClick={logoutMutation.isPending}
        action={logoutAdmin}
        title="Logout?"
        description="Are you sure you want to logout?"
      />
    </>
  );
};

export default Header;
