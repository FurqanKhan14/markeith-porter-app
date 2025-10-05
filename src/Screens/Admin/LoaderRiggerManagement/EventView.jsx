import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query';
import { Col, Row } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import { Link, useParams } from 'react-router-dom';
import { HiOutlineEye } from 'react-icons/hi2';
import BackButton from '../../../Components/BackButton';
import { usePageTitle } from '../../../Hooks/usePageTitle';
import { 
  viewEvents
} from '../../../Services/Admin/HeadCoachManagement';
import { formatDate } from '../../../Utils/Utils';
import './styles.css';

import withFilters from '../../../HOC/withFilters ';
import withModal from '../../../HOC/withModal';

const EventView = () => {
  usePageTitle('Event Details');
  let queryClient = useQueryClient();
  const { id } = useParams();

  // Event Details
  const {
    data: eventData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['eventData', id],
    queryFn: () => viewEvents(id),
    refetchOnWindowFocus: false,
    retry: 1,
  });

  console.log('Event Data:', eventData);
  console.log('ID:', id);

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
    <section className="event-details-management">
      <div className="admin-content-header mb-4 d-flex gap-2">
        <BackButton />
        <h2 className="page-title">View Event Details</h2>
      </div>
      <div className="admin-content-body rounded-20 p-4 p-lg-4 p-xxl-5 mb-4">
        <Row>
          <Col xs={12} xxl={10}>
            <Row>
              <Col xs={12} md={6} lg={4} xl={3} className="mb-4 mb-md-4 mb-xxl-5 detail-box">
                <h5 className="mb-2">Event Name</h5>
                <p className="fw-medium">{eventData?.event_name || 'N/A'}</p>
              </Col>
              <Col xs={12} md={6} lg={4} xl={3} className="mb-4 mb-md-4 mb-xxl-5 detail-box">
                <h5 className="mb-2">Event Date</h5>
                <p className="fw-medium">{formatDate(eventData?.event_date) || 'N/A'}</p>
              </Col>
              <Col xs={12} md={6} lg={4} xl={3} className="mb-4 mb-md-4 mb-xxl-5 detail-box">
                <h5 className="mb-2">Start Time</h5>
                <p className="fw-medium">{eventData?.event_start_time || 'N/A'}</p>
              </Col>
              <Col xs={12} md={6} lg={4} xl={3} className="mb-4 mb-md-4 mb-xxl-5 detail-box">
                <h5 className="mb-2">End Time</h5>
                <p className="fw-medium">{eventData?.event_end_time || 'N/A'}</p>
              </Col>
              <Col xs={12} md={6} lg={4} xl={3} className="mb-4 mb-md-4 mb-xxl-5 detail-box">
                <h5 className="mb-2">Duration</h5>
                <p className="fw-medium">{eventData?.duration || 'N/A'}</p>
              </Col>
              <Col xs={12} md={6} lg={4} xl={3} className="mb-4 mb-md-4 mb-xxl-5 detail-box">
                <h5 className="mb-2">Location</h5>
                <p className="fw-medium">{eventData?.location || 'N/A'}</p>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6} lg={4} xl={3} className="mb-4 mb-md-4 mb-xxl-5 detail-box">
                <h5 className="mb-2">Assigned To</h5>
                <p className="fw-medium">{eventData?.assigned_to || 'N/A'}</p>
              </Col>
              <Col xs={12} md={6} lg={4} xl={3} className="mb-4 mb-md-4 mb-xxl-5 detail-box">
                <h5 className="mb-2">Equipment</h5>
                <p className="fw-medium">{eventData?.equipment || 'N/A'}</p>
              </Col>
              <Col xs={12} md={6} lg={4} xl={3} className="mb-4 mb-md-4 mb-xxl-5 detail-box">
                <h5 className="mb-2">Attendance Required</h5>
                <p className="fw-medium">{eventData?.attendance_required || 'N/A'}</p>
              </Col>
              <Col xs={12} md={6} lg={4} xl={3} className="mb-4 mb-md-4 mb-xxl-5 detail-box">
                <h5 className="mb-2">Event Focus</h5>
                <p className="fw-medium">{eventData?.event_focus || 'N/A'}</p>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Link className='btn btn-primary text-uppercase' to={`/admin/head-coach-management/${id}/event-details/${id}/edit`}>Edit Event</Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default withFilters(withModal(EventView));
