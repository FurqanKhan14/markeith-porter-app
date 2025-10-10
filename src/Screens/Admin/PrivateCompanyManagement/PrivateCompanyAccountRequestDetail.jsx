import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import { Link, useNavigate, useParams } from 'react-router-dom';
import BackButton from '../../../Components/BackButton';
import CustomModal from '../../../Components/CustomModal';
import withFilters from '../../../HOC/withFilters ';
import withModal from '../../../HOC/withModal';
import { usePageTitle } from '../../../Hooks/usePageTitle';
import { getAccountDetails } from '../../../Services/Admin/PrivateCompanyManagement';
import './styles.css';
// import { images } from '../../../assets/images/Gallery.png';

const PrivateManagementPalletDetails = ({
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
  const [showReason, setShowReason] = useState(false);

  // GET Assistant Coach

  const {
    data: palletData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['viewPalletLogsDetails', id],
    queryFn: () => getAccountDetails(id), // ✅ pass direct id
    enabled: !!id,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  // const pallet = palletData?.data ?? [];

  console.log(palletData, 'Pall 123');

  // Initialize selectValue when userManagement changes

  //UPDATE STATUS
  // const handleStatusChange = (itemId, event) => {
  //   const newStatus = event.target.value;
  //   const statusText = newStatus === '1' ? 'Active' : 'Inactive';

  //   // Update local state immediately for better UX
  //   setSelectValue((prev) => ({
  //     ...prev,
  //     [itemId]: newStatus,
  //   }));

  //   // Show confirmation modal using showModal
  //   const actionText = statusText === 'Active' ? 'Activate' : 'Inactivate';
  //   // console.log('Calling mutation with:', { id: itemId, status: Number(newStatus) });

  //   showModal(
  //     ``,
  //     `Are you sure you want to ${actionText} this user?`,
  //     () => {
  //       // This will be called when user confirms
  //       console.log('Modal confirmed, calling API for itemId:', itemId);
  //       updateStatusMutation({ id: itemId, status: Number(newStatus) });
  //     },
  //     'info'
  //   );
  // };

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

  // if (isError) {
  //   return (
  //     <>
  //       <div className="d-card">
  //         <p className="text-danger">{error.message}</p>
  //       </div>
  //     </>
  //   );
  // }

  const handleStatusChange = (newStatus) => {
    showModal(
      ``,
      `Are you sure you want to ${
        newStatus === '1' ? 'accept' : 'reject'
      } the account request ?`,
      () => {
        // This will be called when user confirms the action
        handleUpdateStatus();

        // Here you would typically call a mutation to update the status in the backend
      },
      'info'
    );
  };
  const handleUpdateStatus = async () => {
    console.log('Simulating API call to update status for id:', id);
    showModal(
      ``,
      `Account Request has been accepted successfully!`,
      null,
      'success'
    );
  };

  const handleReject = async () => {
    console.log('Simulating API call to update status for id:', id);
    showModal(
      ``,
      `Account Request has been rejected successfully!`,
      () => handleReason(),
      'info'
    );
  };
  const handleReason = (item) => {
    setShowReason(true);
  };

  const reasonAction = () => {
    setShowReason(false);
    showModal(
      `successful`,
      `Account Request has been rejected successfully!`,
      null,
      'success'
    );

    console.log('dsdsd');
  };

  return (
    <section className="View Request Details">
      <div className="admin-content-header mb-4 d-flex gap-2">
        <BackButton />
        <h2 className="page-title">View Request Details</h2>
      </div>

      {/* --- Pallet Header Info --- */}
      <div className="admin-content-body rounded-20 p-4 mb-4">
        <Row className="">
          <Col xs={12} lg={2} className="mb-3 mb-lg-0 text-lg-start">
            <div>
              <img src={palletData?.image || ''} alt="" />
            </div>
          </Col>
          <Col md={6} lg={8}>
            <div className="d-flex align-items-center gap-3 mt-4">
              <div>
                <p className="d-flex gap-5">
                  <span style={{ minWidth: '180px' }} className="fw-bold">
                    company Name:
                  </span>{' '}
                  <span>{palletData?.first_name}</span>
                </p>
                <p className="d-flex gap-5">
                  <span style={{ minWidth: '180px' }} className="fw-bold">
                    Email Address:
                  </span>{' '}
                  <span>{palletData?.email}</span>
                </p>
                <p className="d-flex gap-5">
                  <span style={{ minWidth: '180px' }} className="fw-bold">
                    Phone number:
                  </span>{' '}
                  <span>{palletData?.mobile}</span>
                </p>
                {palletData?.status_detail === 'rejected' && (
                  <p className="d-flex gap-5">
                    <span style={{ minWidth: '180px' }} className="fw-bold">
                      Rejection Reason:
                    </span>{' '}
                    <span>{palletData?.rejection_reason}</span>
                  </p>
                )}
              </div>
            </div>
            {palletData?.status_detail === 'pending' && (
              <div className="mt-3 gap-2 d-flex">
                <Link
                  className="btn btn-link-profile text-capitalize btn-accept"
                  onClick={() => {
                    handleStatusChange();
                  }}
                >
                  Accept Request
                </Link>
                <Link
                  className="btn btn-link-profile text-capitalize"
                  onClick={() => {
                    handleReject();
                  }}
                >
                  Reject Request
                </Link>
              </div>
            )}
          </Col>
          <Col md={6} lg={2} className="text-lg-end">
            <span>
              Status:{' '}
              <span
                className="text-capitalize"
                style={{
                  color:
                    palletData?.status_detail === 'pending' ? '#CE8D00' : 'red',
                }}
              >
                {palletData?.status_detail || 'N/A'}
              </span>
            </span>
          </Col>
        </Row>
      </div>

      <CustomModal
        show={showReason}
        close={() => setShowReason(false)}
        title={''}
        description={''}
        variant={'success'}
        btntext={'Submit'} // Changed from btnText to btntext
        action={reasonAction}
      >
        <div className="reason-modal">
          <h2 className="page-title mb-3">Reason for Rejection</h2>
          <label htmlFor="" className="form-label">
            Reason<span className="text-danger">*</span>
          </label>
          <textarea
            rows={4}
            className="form-control"
            placeholder="Enter reason here..."
          ></textarea>
        </div>
      </CustomModal>
    </section>
  );
};

export default withFilters(withModal(PrivateManagementPalletDetails));
