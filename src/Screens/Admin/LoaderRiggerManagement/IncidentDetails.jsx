import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../../../Components/BackButton';
import { incidentLogsData } from '../../../Config/data';
import withFilters from '../../../HOC/withFilters ';
import withModal from '../../../HOC/withModal';
import { usePageTitle } from '../../../Hooks/usePageTitle';
import './styles.css';

const IncidentDetails = ({
  showModal,
  filters,
  setFilters,
  pagination,
  updatePagination,
}) => {
  usePageTitle('Head Coach Details');
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectValue, setSelectValue] = useState({});

  // ✅ Mock API function (data call)
  const getIncidentById = async (id) => {
    const incident = incidentLogsData?.detail?.data?.find(
      (item) => item.id === Number(id)
    );
    // Simulate API delay
    await new Promise((res) => setTimeout(res, 400));
    return incident;
  };

  // ✅ GET Incident Details (React Query)
  const {
    data: incidentData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['incidentDetails', id],
    queryFn: () => getIncidentById(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  // ✅ Handle status change (modal confirm)
  const handleStatusChange = (itemId, event) => {
    const newStatus = event.target.value;
    const statusText = newStatus === '1' ? 'Active' : 'Inactive';

    setSelectValue((prev) => ({
      ...prev,
      [itemId]: newStatus,
    }));

    const actionText = statusText === 'Active' ? 'Activate' : 'Inactivate';

    showModal(
      '',
      `Are you sure you want to ${actionText} this user?`,
      () => {
        console.log('Modal confirmed, calling API for itemId:', itemId);
      },
      'info'
    );
  };

  // ✅ Loading skeleton
  if (isLoading) {
    return (
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
    );
  }

  if (!incidentData) {
    return (
      <div className="d-card">
        <p>No data found for this incident ID.</p>
      </div>
    );
  }

  // ✅ Render data
  return (
    <section className="incident-detail-page">
      <div className="admin-content-header mb-4 d-flex gap-2">
        <BackButton />
        <h2 className="page-title">Incident Detail</h2>
      </div>
      {/* --- Route Info --- */}
      <div className="admin-content-body rounded-20 p-4 mb-4">
        <Row>
          <Col xs={12}>
            <p className="d-flex gap-5">
              <strong style={{ minWidth: '180px' }}>
                Main Reason Of incident:
              </strong>{' '}
              <span>{incidentData?.incident_Reason}</span>
            </p>
          </Col>
          <Col xs={12}>
            <p className="d-flex gap-5">
              <strong style={{ minWidth: '180px' }}>Note:</strong>{' '}
              <span>{incidentData?.items}</span>
            </p>
          </Col>
        </Row>
        <strong>Uploaded Images:</strong>
        {incidentData?.status && (
          <div className="d-flex flex-wrap gap-2 mt-3">
            {incidentData?.images?.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`incident-img-${i}`}
                className="rounded border"
                width="auto"
                height="auto"
              />
            ))}
          </div>
        )}
      </div>

      {/* --- Incident Header Info --- */}
      <h2 className="fw-bold mb-3 mt-5">Pallet Form Details</h2>
      <div className="admin-content-body rounded-20 p-4 mb-4">
        <Row className="">
          <Col xs={12} lg={2} className="mb-3 mb-lg-0 text-lg-start">
            <div>
              <img src={incidentData?.image || ''} alt="" />
            </div>
          </Col>
          <Col md={6} lg={8}>
            <div className="d-flex align-items-center gap-3 mt-4">
              <div>
                <p className="d-flex gap-5">
                  <span style={{ minWidth: '180px' }} className="fw-bold">
                    Pallet ID:
                  </span>{' '}
                  <span>{incidentData?.pallet_id}</span>
                </p>
                <p className="d-flex gap-5">
                  <span style={{ minWidth: '180px' }} className="fw-bold">
                    Pallet Type:
                  </span>{' '}
                  <span>{incidentData?.pallet_type}</span>
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
                    incidentData?.status === 'completed' ? 'green' : '#CE8D00',
                }}
              >
                {incidentData?.status || 'N/A'}
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
        <h2 className="fw-bold">{incidentData?.company_name || 'N/A'}</h2>
        <p className="d-flex justify-content-center gap-5">
          <span>Email Address: </span> <span>{incidentData?.email || 'N/A'}</span>
        </p>
        <p className="d-flex justify-content-center gap-5">
          <span>Phone Number: </span> <span>{incidentData?.mobile || 'N/A'}</span>
        </p>
      </div>

      {/* --- Pallet Dimensions --- */}
      <h2 className="fw-bold mb-3">Pallet Dimensions</h2>
      <div className="admin-content-body rounded-20 p-4 mb-4">
        <Row>
          <Col xs={12}>
            <p className="d-flex gap-5">
              <strong style={{ minWidth: '180px' }}>Length:</strong>{' '}
              {incidentData?.pallet_dimensions_1}
            </p>
          </Col>
          <Col xs={12}>
            <p className="d-flex gap-5">
              <strong style={{ minWidth: '180px' }}>Width:</strong>{' '}
              {incidentData?.pallet_dimensions_2}
            </p>
          </Col>
          <Col xs={12}>
            <p className="d-flex gap-5">
              <strong style={{ minWidth: '180px' }}>Height:</strong>{' '}
              {incidentData?.pallet_dimensions_3}
            </p>
          </Col>
          <Col xs={12}>
            <p className="d-flex gap-5">
              <strong style={{ minWidth: '180px' }}>Weight:</strong>{' '}
              {incidentData?.pallet_dimensions_4}
            </p>
          </Col>
        </Row>
      </div>

      {/* --- Items --- */}
      <h2 className="fw-bold mb-3">Items Contents</h2>
      <div className="admin-content-body rounded-20 p-4 mb-4">
        <ul>
          {incidentData?.items?.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
      {/* --- QR Code --- */}
      <h2 className="fw-bold mb-3">Pallet Dimensions</h2>
      <div className="admin-content-body rounded-20 p-4 mb-4">
        <Row>
          <Col xs={12}>
            <p className="d-flex gap-5">
              <strong style={{ minWidth: '180px' }}>Start Location:</strong>{' '}
              {incidentData?.start_location}
            </p>
          </Col>
          <Col xs={12}>
            <p className="d-flex gap-5">
              <strong style={{ minWidth: '180px' }}>End Location:</strong>{' '}
              {incidentData?.end_location}
            </p>
          </Col>
          <Col xs={12}>
            <p className="d-flex gap-5">
              <strong style={{ minWidth: '180px' }}>Estimated Duration:</strong>{' '}
              {incidentData?.estimated_duration}
            </p>
          </Col>
          <Col xs={12}>
            <p className="d-flex gap-5">
              <strong style={{ minWidth: '180px' }}>Delivery Date:</strong>{' '}
              {incidentData?.delivery_date}
            </p>
          </Col>
          <Col xs={12}>
            <p className="d-flex gap-5">
              <strong style={{ minWidth: '180px' }}>Total Amount:</strong>{' '}
              {incidentData?.total_amount}
            </p>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default withFilters(withModal(IncidentDetails));
