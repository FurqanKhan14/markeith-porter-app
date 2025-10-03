import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Button, Card, Col, Row } from "react-bootstrap";
import { PulseLoader } from 'react-spinners';
import CustomButton from '../../../Components/Common/CustomButton';
import CustomSelect from '../../../Components/Common/FormElements/SelectInput';
import { usePageTitle } from '../../../Hooks/usePageTitle';
import {
  editNotification,
  getNotifications,
} from '../../../Services/Admin/Notifications';
import useUserStore from '../../../Stores/UserStore';
import { notificationOptions } from '../../../Utils/Constants/SelectOptions';
import { formatDate, showErrorToast } from '../../../Utils/Utils';
import './style.css';
import { FaClock } from 'react-icons/fa6';
import { FaCalendarAlt } from 'react-icons/fa';

const Notifications = () => {
  usePageTitle('Notifications');
  const { role } = useUserStore();

  const [load, setLoad] = useState(false);
  const [loadMore, setLoadMore] = useState(true);
  const queryClient = useQueryClient();
  const [params, setParams] = useState({ per_page: 10 });
  const handleLoadMore = () => {
    setParams((prev) => ({ ...prev, per_page: prev.per_page + 10 }));
  };

  const markAsRead = (id, index) => {
    editNotificationMutation.mutate(id);
  };

  //GET NOTIFICATIONS
  const {
    data: notificationsData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['getNotifications', params],
    queryFn: () => getNotifications(params),
    refetchOnWindowFocus: false,
    enabled: role === 'admin',
    retry: 1,
  });

  const notifications = notificationsData?.notifications?.data ?? [];

  if (isError) {
    console.error('Error Fetching Notifications:', error);
    showErrorToast(error);
  }

  const editNotificationMutation = useMutation({
    mutationFn: (id) => editNotification(id),
    onSuccess: () => {
      queryClient.invalidateQueries('getNotifications');
    },
    onError: (error) => {
      console.error('Error updating notification', error);
      showErrorToast(error);
    },
  });

  // Handle CustomSelect Change
  const handleFilterChange = (selectedOption) => {
    const value = selectedOption.target.value;
    setParams((prev) => ({ ...prev, status: value })); // Directly set the selected value
  };

  console.log(notifications, 'notifications');
  return (
    <>
    <section className="notification-page">
      <div className="admin-content-header mb-4 d-flex gap-2">
        <h2 className="screen-title mb-0">Notifications</h2>
      </div>
      <div className="admin-content-body rounded-20 p-4 p-lg-4 p-xxl-4 mb-4">
        <Row>
          <Col xs={12} className='notification-filter d-flex flex-column flex-sm-row justify-content-sm-between align-items-sm-center gap-3 mb-3 mb-lg-4'>
            <div className=" d-flex align-items-center gap-3">
              <CustomSelect
                label="Show"
                labelClassName="mb-0"
                name="unread_only"
                options={notificationOptions}
                firstIsLabel={false}
                className="gray"
                onChange={handleFilterChange} // Updates params on selection
              />
            </div>
            <div className="">
              <Button
                  className="p-2"
                  // onClick={() => {
                  //   console.log("mark all clicked");
                  // }}
                  variant={`link ${true ? "greenbtn" : "grayColor"}`}
                  text={""}
                >Mark All as Read</Button>

              {/* <SiteButton variant="underline" className="text-capitalize" onClick={() => setIsRead(!isRead)}>mark All as read</SiteButton> */}
            </div>
          </Col>
        </Row>
        <Row className="row mt-4">
          {load ? (
            <PulseLoader />
          ) : (
            notifications?.map((notification, index) => (
              <Card  key={notification.id} className={`card-notifications flex-row px-3 px-md-4 py-3 py-md-4 gap-lg-2 gap-xxl-3 ${!notification.read_at ? 'unread' : ''}`}>
                {/* <i className="noti-icon flex-shrink-0 align-self-start me-3 me-md-0">
                  <FontAwesomeIcon icon={faBell} />
                </i> */}
                <Card.Body className="p-0 d-md-flex align-self-center">
                  <div className="flex-grow-1 pe-0 px-md-3 ">
                    <Card.Text>{notification.data.body}</Card.Text>
                    {notification.created_at  && (
                      <div className="meta"> 
                        {notification.created_at && (
                          <time className="time-meta" dateTime="">
                             <FaClock />
                              <span className='d-none'>Date:</span> {formatDate(notification.created_at)}</time>
                          )
                        }
                        {notification.created_at && (
                          <time className="time-meta" dateTime="">
                            <FaCalendarAlt />
                            <span className='d-none'>Time:</span> {formatDate(notification.created_at, 'HH:MM')}</time>
                        )}
                      </div>
                    )}
                  </div> 
                  
                  {!notification.read_at &&(
                    <div className="flex-shrink-0 text-end d-flex align-items-center justify-content-end">
                      <Button
                      onClick={() => markAsRead(notification.id, index)}
                      variant={`link fw-medium ${true ? "blueColor" : "grayColor"}`}
                      >
                        {/* {props.read === null ? "Mark as Read" : "Mark as Unread"} */}
                      Mark as Read
                      </Button>
                    </div>
                  )}
                </Card.Body>
              </Card>
            ))
          )}
        </Row>
        {loadMore && (
          <Row>
            <Col xs={12}>
              <div className="beechMein mt-4">
                <CustomButton
                  className="secondaryBtn px-5"
                  text="Load More"
                  onClick={handleLoadMore}
                />
              </div>
            </Col>
          </Row>
        )}
      </div>
    </section>
    </>
  );
};

export default Notifications;


// <div
//   className={`col-12 notification-card ${
//     !notification.read_at ? 'unread' : ''
//   }`}
//   key={notification.id}
// >
//   <div className="notification-content">
//     <p>{notification.data.body}</p>
//     <div
//       style={{ height: 26 }}
//       className=" d-flex justify-content-between flex-wrap"
//     >
//       <div className="date-and-time d-flex gap-3 gap-md-4">
//         <div>
//           Date: <p>{formatDate(notification.created_at)}</p>
//         </div>
//         <div>
//           Time:{' '}
//           <p>{formatDate(notification.created_at, 'HH:MM')}</p>
//         </div>
//       </div>
//       <div className="notification-status-button">
//         {!notification.read_at && (
//           <button
//             className={'notButton text-link'}
//             onClick={() => markAsRead(notification.id, index)}
//           >
//             Mark as Read
//           </button>
//         )}
//       </div>
//     </div>
//   </div>
// </div>
