import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query';
import { Col, Row } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { HiOutlineEye } from 'react-icons/hi2';
import BackButton from '../../../Components/BackButton';
import { usePageTitle } from '../../../Hooks/usePageTitle';
import {
  viewLoader,
  viewPalletLogs,
  incidentLogs,
} from '../../../Services/Admin/LoaderRiggerManagement';
import { formatDate, fullName, serialNum } from '../../../Utils/Utils';
import './styles.css';
import { userStatus } from '../../../Utils/Constants/TableFilter';
import SelectInput from '../../../Components/Common/FormElements/SelectInput';
import {
  assistantCoachHeaders,
  incidentLogsHeaders,
  palletLogsHeaders,
  rosterHeaders,
  subscriptionCoachHeaders,
} from '../../../Utils/Constants/TableHeaders';
import CustomTable from '../../../Components/CustomTable/CustomTable';
import TableActionDropDown from '../../../Components/TableActionDropDown/TableActionDropDown';
import { useFetchTableData } from '../../../Hooks/useTable';
import withFilters from '../../../HOC/withFilters ';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { showToast } from '../../../Components/Toast/Toast';
import withModal from '../../../HOC/withModal';

const LoaderRiggerDetails = ({
  showModal,
  filters,
  setFilters,
  pagination,
  updatePagination,
}) => {
  usePageTitle('Loader Details');
  let queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectValue, setSelectValue] = useState({});
  // Head Coach Details
  const {
    data: loaderData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['viewLoader', id],
    queryFn: () => viewLoader(id),
    refetchOnWindowFocus: false,
    retry: 1,
  });

  // GET Pallet Logs
  const {
    data: palletLogsData,
    isLoading: palletLogsLoading,
    isError: palletLogsError,
    error: palletLogsErrorData,
  } = useQuery({
    queryKey: ['viewPalletLogs', id],
    queryFn: () => viewPalletLogs(id),
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const palletLogs = palletLogsData?.detail?.data ?? [];
  // console.log('Loader Data:', palletLogs);

  // GET Incident Logs
  const {
    data: incidentLogsData,
    isLoading: incidentLogsLoading,
    isError: incidentLogsError,
    error: incidentLogsErrorData,
  } = useQuery({
    queryKey: ['incidentLogs', id],
    queryFn: () => incidentLogs(id),
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const incident = incidentLogsData?.detail?.data ?? [];

  // console.log('Incident Logs Data:', incident);

  // Initialize selectValue when userManagement changes
  useEffect(() => {
    if (loaderData) {
      const isActive = loaderData.status === 1;
      const initialValues = {
        [loaderData.id]: isActive ? '1' : '0',
      };
      setSelectValue(initialValues);

      // console.log(`Status: ${isActive ? 'Active' : 'Inactive'}`);
      // console.log('Initial Values:', initialValues);
    }
  }, [loaderData]);

  //UPDATE STATUS
  const handleStatusChange = (itemId, event) => {
    const newStatus = event.target.value;
    const statusText = newStatus === '1' ? 'Active' : 'Inactive';

    // Update local state immediately for better UX
    setSelectValue((prev) => ({
      ...prev,
      [itemId]: newStatus,
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
  const updateStatusMutation = async (id) => {
    console.log('Simulating API call to update status for id:', id);
    showModal(
      ``,
      `Successfully updated this user?`,
      null,
      'success'
    );
  }
  
  // Mutation for updating status
  // const { mutate: updateStatusMutation, isPending: isStatusUpdating } =
  //   useMutation({
  //     mutationFn: async ({ id, status }) => {
  //       return await updateHeadCoachStatus(id, status);
  //     },
  //     onSuccess: (data, variables) => {
  //       showToast('Status updated successfully', 'success');
  //       // Show success modal after a short delay to avoid conflicts
  //       setTimeout(() => {
  //         const currentStatus =
  //           selectValue[variables.id] === '1' ? 'Active' : 'Inactive';

  //         showModal(
  //           ``,
  //           `User has been ${currentStatus.toLowerCase()} successfully!`,
  //           null,
  //           'success'
  //         );
  //       }, 1000); // Increased delay to ensure confirmation modal is closed
  //       queryClient.invalidateQueries(['headCoachDetails']);
  //     },
  //     onError: (error, variables) => {
  //       console.error('Error updating status:', error);
  //       showToast('Failed to update status', 'error');
  //       // Revert the local state change on error
  //       if (variables?.id && variables?.status !== undefined) {
  //         // Revert local state
  //         setSelectValue((prev) => ({
  //           ...prev,
  //           [variables.id]: variables.status === 1 ? '0' : '1',
  //         }));
  //       }
  //     },
  //   });

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
    <section className="loader/Rigger profile details">
      <div className="admin-content-header mb-4 d-flex gap-2">
        <BackButton />
        <h2 className="page-title">loader/Rigger profile details</h2>
      </div>
      <div className="admin-content-body rounded-20 p-4 p-lg-4 p-xxl-5 mb-4">
        <Row className="">
          <Col xs={12} xxl={2}>
            <div className="mt-3">
              <img src={loaderData?.image} alt="" />
            </div>
          </Col>
          <Col xs={12} xxl={2} className="order-0 order-xxl-1 mb-3 mb-xxl-0">
            <div className="d-flex align-items-center gap-2 justify-content-end">
              <SelectInput
                label="Status"
                options={userStatus}
                labelClassName="mb-0"
                value={selectValue[loaderData.id]}
                className={`status-select ${
                  selectValue[loaderData.id] === '1'
                    ? 'status-active'
                    : 'status-inactive'
                }`}
                onChange={(event) => handleStatusChange(loaderData.id, event)}
              />
            </div>
          </Col>
          <Col xs={12} xxl={8} className="order-1 order-xxl-0">
            <Row>
              <Col xs={12} className="mb-4 mb-md-4 mb-xxl-3 detail-box">
                <div className="d-flex align-items-center gap-5">
                  <h5 className="mb-0" style={{ minWidth: '150px' }}>
                    First Name:
                  </h5>
                  <p className="fw-medium mb-0">
                    {loaderData?.first_name || 'N/A'}
                  </p>
                </div>
              </Col>
              <Col xs={12} className="mb-4 mb-md-4 mb-xxl-3 detail-box">
                <div className="d-flex align-items-center gap-5">
                  <h5 className="mb-0" style={{ minWidth: '150px' }}>
                    Last Name:
                  </h5>
                  <p className="fw-medium mb-0">
                    {loaderData?.last_name || 'N/A'}
                  </p>
                </div>
              </Col>
              <Col xs={12} className="mb-4 mb-md-4 mb-xxl-3 detail-box">
                <div className="d-flex align-items-center gap-5">
                  <h5 className="mb-0" style={{ minWidth: '150px' }}>
                    Email Address:
                  </h5>
                  <p className="fw-medium mb-0">{loaderData?.email || 'N/A'}</p>
                </div>
              </Col>
              <Col xs={12} className="mb-4 mb-md-4 mb-xxl-3 detail-box">
                <div className="d-flex align-items-center gap-5">
                  <h5 className="mb-0" style={{ minWidth: '150px' }}>
                    Phone Number:
                  </h5>
                  <p className="fw-medium mb-0">
                    {loaderData?.mobile || 'N/A'}
                  </p>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>

      <div className="admin-content-body rounded-20 p-4 p-lg-4 p-xxl-4 mb-4">
        <Row>
          <Col xs={12}>
            <div className="admin-content-header mb-4 d-flex gap-2">
              <h2 className="page-title">Pallet Logs</h2>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <CustomTable
              filters={filters}
              setFilters={setFilters}
              headers={palletLogsHeaders}
              pagination={pagination}
              isLoading={palletLogsLoading}
              centerLastHeader={true}
              // dateFilters={[
              //   { title: 'Registration Date', from: 'from', to: 'to' },
              // ]}
            >
              {(palletLogs?.length || palletLogsError) && (
                <tbody>
                  {palletLogsError && (
                    <tr>
                      <td colSpan={palletLogsHeaders.length}>
                        <p className="text-danger mb-0">
                          Unable to fetch data at this time
                        </p>
                      </td>
                    </tr>
                  )}
                  {palletLogs?.map((item, index) => (
                    <tr key={item.id}>
                      <td>
                        {serialNum(
                          (filters?.page - 1) * filters?.per_page + index + 1
                        )}
                      </td>
                      <td>{item?.pallet_id}</td>
                      <td>{item?.pallet_type}</td>
                      <td>{item?.date}</td>
                      <td>
                        {' '}
                        <span
                          className="text-capitalize"
                          style={{
                            color:
                              item?.status === 'completed'
                                ? 'green'
                                : '#CE8D00',
                          }}
                        >
                          {item?.status || 'N/A'}
                        </span>
                      </td>
                      <td>
                        <Link to={`pallet-logs/${item.id}`}></Link>
                        <TableActionDropDown
                          actions={[
                            {
                              name: 'View',
                              icon: HiOutlineEye,
                              onClick: () => navigate(`pallet-logs/${item.id}`),
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
              <h2 className="page-title">Incident Logs</h2>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <CustomTable
              filters={filters}
              setFilters={setFilters}
              headers={incidentLogsHeaders}
              pagination={pagination}
              isLoading={incidentLogsLoading}
              centerLastHeader={true}
              // dateFilters={[
              //   { title: 'Registration Date', from: 'from', to: 'to' },
              // ]}
            >
              {(incident?.length || incidentLogsError) && (
                <tbody>
                  {incidentLogsError && (
                    <tr>
                      <td colSpan={palletLogsHeaders.length}>
                        <p className="text-danger mb-0">
                          Unable to fetch data at this time
                        </p>
                      </td>
                    </tr>
                  )}
                  {incident?.map((item, index) => (
                    <tr key={item.id}>
                      <td>
                        {serialNum(
                          (filters?.page - 1) * filters?.per_page + index + 1
                        )}
                      </td>
                      <td>{item?.pallet_id}</td>
                      <td>{item?.incident_Reason}</td>
                      <td>{item?.pallet_type}</td>
                      <td>{item?.date}</td>
                      <td>
                        {' '}
                        <span
                          className="text-capitalize"
                          style={{
                            color:
                              item?.status === 'completed'
                                ? 'green'
                                : '#CE8D00',
                          }}
                        >
                          {item?.status || 'N/A'}
                        </span>
                      </td>
                      <td>
                        <Link to={`incident-logs/${item.id}`}></Link>
                        <TableActionDropDown
                          actions={[
                            {
                              name: 'View',
                              icon: HiOutlineEye,
                              onClick: () => navigate(`incident-logs/${item.id}`),
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

export default withFilters(withModal(LoaderRiggerDetails));
