import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../../../Components/BackButton';
import withFilters from '../../../HOC/withFilters ';
import withModal from '../../../HOC/withModal';
import { usePageTitle } from '../../../Hooks/usePageTitle';
import { viewPalletLogsDetails } from '../../../Services/Admin/LoaderRiggerManagement';
import './styles.css';
// import { images } from '../../../assets/images/Gallery.png';

const PalletDetails = ({
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

  // GET Assistant Coach

  const {
    data: palletData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['viewPalletLogsDetails', id],
    queryFn: () => viewPalletLogsDetails(id), // ✅ pass direct id
    enabled: !!id,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  // const pallet = palletData?.data ?? [];

  console.log(palletData, 'Pall 123');

  // Initialize selectValue when userManagement changes

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

  return (
    <section className="pallet-detail-page">
      <div className="admin-content-header mb-4 d-flex gap-2">
        <BackButton />
        <h2 className="page-title">Pallet Form Detail</h2>
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
                    Pallet ID:
                  </span>{' '}
                  <span>{palletData?.pallet_id}</span>
                </p>
                <p className="d-flex gap-5">
                  <span style={{ minWidth: '180px' }} className="fw-bold">
                    Pallet Type:
                  </span>{' '}
                  <span>{palletData?.pallet_type}</span>
                </p>
              </div>
            </div>
          </Col>
          <Col md={6} lg={2} className="text-lg-end">
            <span>
              Status:{' '}
              <span
                className="text-capitalize"
                style={{
                  color:
                    palletData?.status === 'completed' ? 'green' : '#CE8D00',
                }}
              >
                {palletData?.status || 'N/A'}
              </span>
            </span>
          </Col>
        </Row>
      </div>

      {/* --- Company Info --- */}
      <div
        className="admin-content-body rounded-20 p-4 mb-4 text-center"
        style={{ background: '#E9E9EB' }}
      >
        <h2 className="fw-bold">{palletData?.company_name || 'N/A'}</h2>
        <p className="d-flex justify-content-center gap-5">
          <span>Email Address: </span> <span>{palletData?.email || 'N/A'}</span>
        </p>
        <p className="d-flex justify-content-center gap-5">
          <span>Phone Number: </span> <span>{palletData?.mobile || 'N/A'}</span>
        </p>
      </div>

      {/* --- Pallet Dimensions --- */}
      <h2 className="fw-bold mb-3">Pallet Dimensions</h2>
      <div className="admin-content-body rounded-20 p-4 mb-4">
        <Row>
          <Col xs={12}>
            <p className="d-flex gap-5">
              <strong style={{ minWidth: '180px' }}>Length (cm):</strong>{' '}
              <span>{palletData?.length}</span>
            </p>
          </Col>
          <Col xs={12}>
            <p className="d-flex gap-5">
              <strong style={{ minWidth: '180px' }}>Width (cm):</strong>{' '}
              <span>{palletData?.width}</span>
            </p>
          </Col>
          <Col xs={12}>
            <p className="d-flex gap-5">
              <strong style={{ minWidth: '180px' }}>Height (cm):</strong>{' '}
              <span>{palletData?.height}</span>
            </p>
          </Col>
          <Col xs={12}>
            <p className="d-flex gap-5">
              <strong style={{ minWidth: '180px' }}>Total Weight:</strong>{' '}
              <span>{palletData?.total_weight}</span>
            </p>
          </Col>
        </Row>
      </div>

      {/* --- Items Contents --- */}
      <h2 className="fw-bold mb-3">Items Contents:</h2>
      <div className="admin-content-body rounded-20 p-4 mb-4">
        <ul className="list-unstyled">
          {palletData?.items?.map((item, i) => (
            <li key={i}>• {item}</li>
          ))}
        </ul>
      </div>

      {/* --- Route Information --- */}
      <h2 className="fw-bold mb-3">Route Information</h2>
      <div className="admin-content-body rounded-20 p-4 mb-4">
        <Row>
          <Col xs={12}>
            <p className="d-flex gap-5">
              <strong style={{ minWidth: '180px' }}>Start Location:</strong>{' '}
              <span>{palletData?.start_location}</span>
            </p>
          </Col>
          <Col xs={12}>
            <p className="d-flex gap-5">
              <strong style={{ minWidth: '180px' }}>End Location:</strong>{' '}
              <span>{palletData?.end_location}</span>
            </p>
          </Col>
          <Col xs={12}>
            <p className="d-flex gap-5">
              <strong style={{ minWidth: '180px' }}>Estimated Duration:</strong>{' '}
              <span>{palletData?.estimated_duration}</span>
            </p>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <p className="d-flex gap-5">
              <strong style={{ minWidth: '180px' }}>Delivery Date:</strong>{' '}
              <span>{palletData?.delivery_date}</span>
            </p>
          </Col>
          <Col xs={12}>
            <p className="d-flex gap-5">
              <strong style={{ minWidth: '180px' }}>Total Amount:</strong>{' '}
              <span>{palletData?.total_amount}</span>
            </p>
          </Col>
        </Row>
        {palletData?.status !== 'ongoing' && (
          <div className="d-flex flex-wrap gap-2 mt-3">
            {palletData?.images?.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`pallet-img-${i}`}
                className="rounded border"
                width="auto"
                height="auto"
              />
            ))}
          </div>
        )}
      </div>

      {/* --- QR Code --- */}
      <div className="admin-content-body rounded-20 p-4 mb-4 text-center">
        <img
          src={palletData?.qr_code}
          alt="QR Code"
          width="auto"
          height="auto"
          className="mb-5 mx-auto"
        />
        <button className="btn btn-link-profile">Download QR Code</button>
      </div>
    </section>
  );
};

export default withFilters(withModal(PalletDetails));
