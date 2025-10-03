import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query';
import { Col, Row } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import { useNavigate, useParams } from 'react-router-dom';
import { HiOutlineEye } from 'react-icons/hi2';
import BackButton from '../../../Components/BackButton';
import { usePageTitle } from '../../../Hooks/usePageTitle';
import { getAssistantCoachListing, getRosterListing, getSubscriptionListing, getEventsListing, viewHeadCoach, updateHeadCoachStatus } from '../../../Services/Admin/HeadCoachManagement';
import { formatDate, fullName, serialNum } from '../../../Utils/Utils';
import './styles.css';
import { userStatus } from '../../../Utils/Constants/TableFilter';
import SelectInput from '../../../Components/Common/FormElements/SelectInput';
import { assistantCoachHeaders, rosterHeaders, subscriptionCoachHeaders, totalEventsHeaders } from '../../../Utils/Constants/TableHeaders';
import CustomTable from '../../../Components/CustomTable/CustomTable';
import TableActionDropDown from '../../../Components/TableActionDropDown/TableActionDropDown';
import { useFetchTableData } from '../../../Hooks/useTable';
import withFilters from '../../../HOC/withFilters ';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { showToast } from '../../../Components/Toast/Toast';
import withModal from '../../../HOC/withModal';


const HeadCoachView = ({
  showModal,
  filters,
  setFilters,
  pagination,
  updatePagination,
}) => {
  usePageTitle('Head Coach Details');
  let queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectValue, setSelectValue] = useState({});
  // Head Coach Details
  const {
    data: headCoach,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['headCoachDetails', id],
    queryFn: () => viewHeadCoach(id),
    refetchOnWindowFocus: false,
    retry: 1,
  });

  // GET Assistant Coach
  const {
    data: assistantCoachData,
    isLoading: assistantCoachLoading,
    isError: assistantCoachError,
    error: assistantCoachErrorData,
  } = useQuery({
    queryKey: ['assistantCoachListing', id],
    queryFn: () => getAssistantCoachListing({ head_coach_id: id }),
    refetchOnWindowFocus: false,
    retry: 1,
  });
  const assistantCoach = assistantCoachData?.data ?? [];

  // GET Total Events
  const {
    data: totalEventsData,
    isLoading: totalEventsLoading,
    isError: totalEventsError,
    error: totalEventsErrorData,
  } = useQuery({
    queryKey: ['totalEventsListing', id],
    queryFn: () => getEventsListing({ assistant_coach_id: id }),
    refetchOnWindowFocus: false,
    retry: 1,
  });
  const totalEvents = totalEventsData?.data ?? [];


  // GET Subscription
  const {
    data: subscriptionData,
    isLoading: subscriptionLoading,
    isError: subscriptionError,
    error: subscriptionErrorData,
  } = useQuery({
    queryKey: ['subscriptionListing', id],
    queryFn: () => getSubscriptionListing({ assistant_coach_id: id }),
    refetchOnWindowFocus: false,
    retry: 1,
  });
  const subscription = subscriptionData?.data ?? [];

  // GET Roster
  const {
    data: rosterData,
    isLoading: rosterLoading,
    isError: rosterError,
    error: rosterErrorData,
  } = useQuery({
    queryKey: ['rosterListing', id],
    queryFn: () => getRosterListing({ head_coach_id: id }),
    refetchOnWindowFocus: false,
    retry: 1,
  });
  const roster = rosterData?.data ?? [];

  // console.log(roster, 'roster 123');




    // Initialize selectValue when userManagement changes
    useEffect(() => {
      if (headCoach) {
        const isActive = headCoach.status === 1;
        const initialValues = {
          [headCoach.id]: isActive ? '1' : '0',
        };
        setSelectValue(initialValues);
    
        // console.log(`Status: ${isActive ? 'Active' : 'Inactive'}`);
        // console.log('Initial Values:', initialValues);
      }
    }, [headCoach]);
  

  //UPDATE STATUS
    const handleStatusChange = (itemId, event) => {
    const newStatus = event.target.value;
    const statusText = newStatus === '1' ? 'Active' : 'Inactive';
    
    // Update local state immediately for better UX
    setSelectValue(prev => ({
      ...prev,
      [itemId]: newStatus
    }));

    // Show confirmation modal using showModal
    const actionText = statusText === 'Active' ? 'Activate' : 'Inactivate';
    // console.log('Calling mutation with:', { id: itemId, status: Number(newStatus) });
    
    showModal(
      ``,
      `Are you sure you want to ${actionText} this user?`,
      () => {
        // This will be called when user confirms
        console.log('Modal confirmed, calling API for itemId:', itemId);
        updateStatusMutation({ id: itemId, status: Number(newStatus) });
      },
      'info'
    );
    };
    
  // Mutation for updating status
  const { mutate: updateStatusMutation, isPending: isStatusUpdating } =
    useMutation({
      mutationFn: async ({ id, status }) => {
        return await updateHeadCoachStatus(id, status);
      },
      onSuccess: (data, variables) => {
        showToast('Status updated successfully', 'success');
        // Show success modal after a short delay to avoid conflicts
        setTimeout(() => {
          const currentStatus = selectValue[variables.id] === '1' ? 'Active' : 'Inactive';

          showModal(
            ``,
            `User has been ${currentStatus.toLowerCase()} successfully!`,
            null,
            'success'
          );
        }, 1000); // Increased delay to ensure confirmation modal is closed
        queryClient.invalidateQueries(['headCoachDetails']);
      },
      onError: (error, variables) => {
        console.error('Error updating status:', error);
        showToast('Failed to update status', 'error');
        // Revert the local state change on error
        if (variables?.id && variables?.status !== undefined) {
          // Revert local state
          setSelectValue(prev => ({
            ...prev,
            [variables.id]: variables.status === 1 ? '0' : '1'
          }));
        }
      },
    });


  if (isLoading) {
    return (
      <>
        <div className="d-card">
          <div className="row">
            <div className="col-12 col-lg-10 col-xl-9 col-xxl-7">
              <div className="row mb-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="col-12 col-sm-6 mb-3 align-items-center"
                    style={{ height: 56 }}
                  >
                    <Skeleton
                      style={{ marginTop: 28 }}
                      duration={1}
                      width={'50%'}
                      baseColor="#ddd"
                      height={22}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <div className="d-card">
          <p className="text-danger">{error.message}</p>
        </div>
      </>
    );
  }

  return (
    <section className="head-coach-management">
      <div className="admin-content-header mb-4 d-flex gap-2">
        <BackButton />
        <h2 className="page-title">View Head Coach</h2>
      </div>
      <div className="admin-content-body rounded-20 p-4 p-lg-4 p-xxl-5 mb-4">
        <Row>
          <Col xs={12} xxl={2} className='order-0 order-xxl-1 mb-3 mb-xxl-0'>
            <div className="d-flex align-items-center gap-2 justify-content-end">
              <SelectInput
                label="Status"
                options={userStatus}
                labelClassName="mb-0"
                value={selectValue[headCoach.id]}
                className={`status-select ${selectValue[headCoach.id] === '1' ? 'status-active' : 'status-inactive'}`}
                onChange={(event) => handleStatusChange(headCoach.id, event)}
              />
            </div>
          </Col>
          <Col xs={12} xxl={10} className='order-1 order-xxl-0'>
            <Row>
              <Col xs={12} md={6} lg={4} xl={3} className="mb-4 mb-md-4 mb-xxl-5 detail-box">
                <h5 className="mb-2">First Name</h5>
                <p className="fw-medium">{headCoach?.first_name || 'N/A'}</p>
              </Col>
              <Col xs={12} md={6} lg={4} xl={3} className="mb-4 mb-md-4 mb-xxl-5 detail-box">
                <h5 className="mb-2">Last Name</h5>
                <p className="fw-medium">{headCoach?.last_name || 'N/A'}</p>
              </Col>
              <Col xs={12} md={6} lg={4} xl={3} className="mb-4 mb-md-4 mb-xxl-5 detail-box">
                <h5 className="mb-2">Email Address</h5>
                <p className="fw-medium">{headCoach?.email || 'N/A'}</p>
              </Col>
              <Col xs={12} md={6} lg={4} xl={3} className="mb-4 mb-md-4 mb-xxl-5 detail-box">
                <h5 className="mb-2">Mobile #</h5>
                <p className="fw-medium">{headCoach?.mobile || 'N/A'}</p>
              </Col>
              <Col xs={12} md={6} lg={4} xl={3} className="mb-4 mb-md-4 mb-xxl-5 detail-box">
                <h5 className="mb-2">School Name</h5>
                <p className="fw-medium">{headCoach?.school || 'N/A'}</p>
              </Col>
              <Col xs={12} md={6} lg={4} xl={3} className="mb-4 mb-md-4 mb-xxl-5 detail-box">
                <h5 className="mb-2">Team Mascot</h5>
                <p className="fw-medium">{headCoach?.team_mascot || 'N/A'}</p>
              </Col>
              <Col xs={12} md={6} lg={4} xl={3} className="mb-4 mb-md-4 mb-xxl-5 detail-box">
                <h5 className="mb-2">State</h5>
                <p className="fw-medium">{headCoach?.state || 'N/A'}</p>
              </Col>
              <Col xs={12} md={6} lg={4} xl={3} className="mb-4 mb-md-4 mb-xxl-5 detail-box">
                <h5 className="mb-2">Level</h5>
                <p className="fw-medium">{formatDate(headCoach?.created_at) || 'N/A'}</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      
      <div className="admin-content-body rounded-20 p-4 p-lg-4 p-xxl-4 mb-4">
        <Row>
          <Col xs={12}>
            <div className="admin-content-header mb-4 d-flex gap-2">
              <h2 className="page-title">View Assistant Coaches</h2>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <CustomTable
              filters={filters}
              setFilters={setFilters}
              headers={assistantCoachHeaders}
              pagination={pagination}
              isLoading={assistantCoachLoading}
              centerLastHeader={true}
              // dateFilters={[
              //   { title: 'Registration Date', from: 'from', to: 'to' },
              // ]}
            >
              {(assistantCoach?.length || assistantCoachError) && (
                <tbody>
                  {assistantCoachError && (
                    <tr>
                      <td colSpan={assistantCoachHeaders.length}>
                        <p className="text-danger mb-0">
                          Unable to fetch data at this time
                        </p>
                      </td>
                    </tr>
                  )}
                  {assistantCoach?.map((item, index) => (
                    <tr key={item.id}>
                      <td>
                        {serialNum(
                          (filters?.page - 1) * filters?.per_page + index + 1
                        )}
                      </td>
                      <td>{fullName(item)}</td>
                      <td>{item?.email}</td>
                      <td>{item?.subscription_title}</td>
                      <td>{formatDate(item?.created_at)}</td>
                      <td>
                        <TableActionDropDown
                          actions={[
                            {
                              name: 'View',
                              icon: HiOutlineEye,
                              onClick: () => navigate(`/admin/head-coach-management/${id}/assistant-coach-management/${item.id}`),
                              className: 'view',
                            },
                          ]}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </CustomTable>
          </Col>
        </Row>
      </div>

      <div className="admin-content-body rounded-20 p-4 p-lg-4 p-xxl-4 mb-4">
        <Row>
          <Col xs={12}>
            <div className="admin-content-header mb-4 d-flex gap-2">
              <h2 className="page-title">View Total Events</h2>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <CustomTable
              filters={filters}
              setFilters={setFilters}
              headers={totalEventsHeaders}
              pagination={pagination}
              isLoading={totalEventsLoading}
              centerLastHeader={true}
              // dateFilters={[
              //   { title: 'Registration Date', from: 'from', to: 'to' },
              // ]}
            >
              {(totalEvents?.length || totalEventsError) && (
                <tbody>
                  {totalEventsError && (
                    <tr>
                      <td colSpan={totalEventsHeaders.length}>
                        <p className="text-danger mb-0">
                          Unable to fetch data at this time
                        </p>
                      </td>
                    </tr>
                  )}
                  {totalEvents?.map((item, index) => (
                    <tr key={item.id}>
                      <td>
                        {serialNum(
                          (filters?.page - 1) * filters?.per_page + index + 1
                        )}
                      </td>
                      <td>{item?.event_name}</td>
                      <td>{item?.event_date}</td>
                      <td>{item?.event_start_time} - {item?.event_end_time}</td>
                      <td>{item?.location}</td>
                      <td>{item?.assigned_to}</td>
                      <td>
                        <TableActionDropDown
                          actions={[
                            {
                              name: 'View',
                              icon: HiOutlineEye,
                              onClick: () => navigate(`/admin/head-coach-management/${id}/event-details/${item.id}`),
                              className: 'view',
                            },
                          ]}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </CustomTable>
          </Col>
        </Row>
      </div>   

      <div className="admin-content-body rounded-20 p-4 p-lg-4 p-xxl-4 mb-4">
        <Row>
          <Col xs={12}>
            <div className="admin-content-header mb-4 d-flex gap-2">
              <h2 className="page-title">View Subscription</h2>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <CustomTable
              filters={filters}
              setFilters={setFilters}
              headers={subscriptionCoachHeaders}
              pagination={pagination}
              isLoading={totalEventsLoading}
              // dateFilters={[
              //   { title: 'Registration Date', from: 'from', to: 'to' },
              // ]}
            >
              {(subscription?.length || subscriptionError) && (
                <tbody>
                  {subscriptionError && (
                    <tr>
                      <td colSpan={subscriptionCoachHeaders.length}>
                        <p className="text-danger mb-0">
                          Unable to fetch data at this time
                        </p>
                      </td>
                    </tr>
                  )}
                  {subscription?.map((item, index) => (
                    <tr key={item.id}>
                      <td>
                        {serialNum(
                          (filters?.page - 1) * filters?.per_page + index + 1
                        )}
                      </td>
                      <td>{item?.subscription_title}</td>
                      <td>{item?.duration}</td>
                      <td>{item?.total_amount}</td>
                      <td>{item?.coupon}</td>
                      <td>{formatDate(item?.payment_date)}</td>
                      <td>{formatDate(item?.expiration)}</td>
                    </tr>
                  ))}
                </tbody>
              )}
            </CustomTable>
          </Col>
        </Row>
      </div>  

      <div className="admin-content-body rounded-20 p-4 p-lg-4 p-xxl-4 mb-3">
        <Row>
          <Col xs={12}>
            <div className="admin-content-header mb-4 d-flex gap-2">
              <h2 className="page-title">View Roaster Details</h2>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <CustomTable
              filters={filters}
              setFilters={setFilters}
              headers={rosterHeaders}
              pagination={pagination}
              isLoading={rosterLoading}
              centerLastHeader={true}
              // dateFilters={[
              //   { title: 'Registration Date', from: 'from', to: 'to' },
              // ]}
            >
              {(roster?.length || rosterError) && (
                <tbody>
                  {rosterError && (
                    <tr>
                      <td colSpan={rosterHeaders.length}>
                        <p className="text-danger mb-0">
                          Unable to fetch data at this time
                        </p>
                      </td>
                    </tr>
                  )}
                  {roster?.map((item, index) => (
                    <tr key={item.id}>
                      <td>
                        {serialNum(
                          (filters?.page - 1) * filters?.per_page + index + 1
                        )}
                      </td>
                      <td>{fullName(item)}</td>
                      <td>{item?.email}</td>
                      <td>{item?.mobile}</td>
                      <td>{formatDate(item?.dob)}</td>
                      <td>
                        <TableActionDropDown
                          actions={[
                            {
                              name: 'View',
                              icon: HiOutlineEye,
                              onClick: () => navigate(`/admin/head-coach-management/${id}/student-details/${item.id}`),
                              className: 'view',
                            },
                          ]}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </CustomTable>
          </Col>
        </Row>
      </div>   
    </section>
  );
};

export default withFilters(withModal(HeadCoachView));
