import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query';
import { Col, Row } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';
import { HiOutlineEye } from 'react-icons/hi2';
import BackButton from '../../../Components/BackButton';
import { usePageTitle } from '../../../Hooks/usePageTitle';
import { 
  getAssistantCoachListing, 
  getRosterListing, 
  getSubscriptionListing, 
  getEventsListing, 
  viewAssistantCoach, 
  viewHeadCoach,
  updateHeadCoachStatus 
} from '../../../Services/Admin/HeadCoachManagement';
import { formatDate, fullName, serialNum } from '../../../Utils/Utils';
import './styles.css';
import { userStatus } from '../../../Utils/Constants/TableFilter';
import SelectInput from '../../../Components/Common/FormElements/SelectInput';
import { 
  assistantCoachHeaders, 
  assistantCoachRosterHeaders, 
  subscriptionCoachHeaders, 
  totalEventsHeaders 
} from '../../../Utils/Constants/TableHeaders';
import CustomTable from '../../../Components/CustomTable/CustomTable';
import TableActionDropDown from '../../../Components/TableActionDropDown/TableActionDropDown';
import { useFetchTableData } from '../../../Hooks/useTable';
import withFilters from '../../../HOC/withFilters ';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { showToast } from '../../../Components/Toast/Toast';
import withModal from '../../../HOC/withModal';

const AssistantCoachView = ({
  showModal,
  filters,
  setFilters,
  pagination,
  updatePagination,
}) => {
  usePageTitle('Assistant Coach Details');
  let queryClient = useQueryClient();
  const { id } = useParams();

  // Assistant Coach Details
  const {
    data: assistantCoachData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['assistantCoachData', id],
    queryFn: () => viewAssistantCoach(id),
    refetchOnWindowFocus: false,
    retry: 1,
  });

  console.log('Assistant Coach Data:', assistantCoachData);
  console.log('ID:', id);

  // GET Subscription for this assistant coach
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

  // GET Roster for this assistant coach
  const {
    data: rosterData,
    isLoading: rosterLoading,
    isError: rosterError,
    error: rosterErrorData,
  } = useQuery({
    queryKey: ['rosterListing', id],
    queryFn: () => getRosterListing({ assistant_coach_id: id }),
    refetchOnWindowFocus: false,
    retry: 1,
  });
  const roster = rosterData?.data ?? [];


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
    <section className="assistant-coach-management">
      <div className="admin-content-header mb-4 d-flex gap-2">
        <BackButton />
        <h2 className="page-title">View Assistant Coach</h2>
      </div>
      <div className="admin-content-body rounded-20 p-4 p-lg-4 p-xxl-5 mb-4">
        <Row>
          <Col xs={12} xxl={10} className='order-1 order-xxl-0'>
            <Row>
              <Col xs={12} md={6} lg={4} xl={3} className="mb-4 mb-md-4 mb-xxl-5 detail-box">
                <h5 className="mb-2">First Name</h5>
                <p className="fw-medium">{assistantCoachData?.first_name || 'N/A'}</p>
              </Col>
              <Col xs={12} md={6} lg={4} xl={3} className="mb-4 mb-md-4 mb-xxl-5 detail-box">
                <h5 className="mb-2">Last Name</h5>
                <p className="fw-medium">{assistantCoachData?.last_name || 'N/A'}</p>
              </Col>
              <Col xs={12} md={6} lg={4} xl={3} className="mb-4 mb-md-4 mb-xxl-5 detail-box">
                <h5 className="mb-2">Email</h5>
                <p className="fw-medium">{assistantCoachData?.email || 'N/A'}</p>
              </Col>
              <Col xs={12} md={6} lg={4} xl={3} className="mb-4 mb-md-4 mb-xxl-5 detail-box">
                <h5 className="mb-2">Mobile #</h5>
                <p className="fw-medium">{assistantCoachData?.mobile || 'N/A'}</p>
              </Col>
              <Col xs={12} md={6} lg={4} xl={3} className="mb-4 mb-md-4 mb-xxl-5 detail-box">
                <h5 className="mb-2">Role</h5>
                <p className="fw-medium">{assistantCoachData?.role || 'N/A'}</p>
              </Col>
              <Col xs={12} md={6} lg={4} xl={3} className="mb-4 mb-md-4 mb-xxl-5 detail-box">
                <h5 className="mb-2">Offence</h5>
                <p className="fw-medium">{assistantCoachData?.offence || 'N/A'}</p>
              </Col>
              <Col xs={12} md={6} lg={4} xl={3} className="mb-4 mb-md-4 mb-xxl-5 detail-box">
                <h5 className="mb-2">Defense</h5>
                <p className="fw-medium">{assistantCoachData?.defense || 'N/A'}</p>
              </Col>
            </Row>
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
              isLoading={subscriptionLoading}
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
              <h2 className="page-title">View Roster Details</h2>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <CustomTable
              filters={filters}
              setFilters={setFilters}
              headers={assistantCoachRosterHeaders}
              pagination={pagination}
              isLoading={rosterLoading}
            >
              {(roster?.length || rosterError) && (
                <tbody>
                  {rosterError && (
                    <tr>
                      <td colSpan={assistantCoachRosterHeaders.length}>
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
                      <td>{fullName(item?.parent_info)}</td>
                      <td>{item?.email}</td>
                      <td>{formatDate(item?.dob)}</td>
                      <td>{item?.mobile}</td>
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

export default withFilters(withModal(AssistantCoachView));
