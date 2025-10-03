import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query';
import { Col, Row } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';
import { HiOutlineEye } from 'react-icons/hi2';
import BackButton from '../../../Components/BackButton';
import { usePageTitle } from '../../../Hooks/usePageTitle';
import { 
  viewRoster
} from '../../../Services/Admin/HeadCoachManagement';
import { formatDate } from '../../../Utils/Utils';
import './styles.css';

import withFilters from '../../../HOC/withFilters ';

import withModal from '../../../HOC/withModal';

const StudentDetailsView = () => {
  usePageTitle('Student Details');
  let queryClient = useQueryClient();
  const { id } = useParams();

  // Student Details
  const {
    data: studentData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['studentData', id],
    queryFn: () => viewRoster(id),
    refetchOnWindowFocus: false,
    retry: 1,
  });

  console.log('Student Data:', studentData);
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
    <section className="student-details-management">
      <div className="admin-content-header mb-4 d-flex gap-2">
        <BackButton />
        <h2 className="page-title">View Student Details</h2>
      </div>
      <div className="admin-content-body rounded-20 p-4 p-lg-4 p-xxl-5 mb-4">
        <Row>
          <Col xs={12} xxl={10}>
            <Row>
              <Col xs={12} md={6} lg={4} xl={3} className="mb-4 mb-md-4 mb-xxl-5 detail-box">
                <h5 className="mb-2">First Name</h5>
                <p className="fw-medium">{studentData?.first_name || 'N/A'}</p>
              </Col>
              <Col xs={12} md={6} lg={4} xl={3} className="mb-4 mb-md-4 mb-xxl-5 detail-box">
                <h5 className="mb-2">Last Name</h5>
                <p className="fw-medium">{studentData?.last_name || 'N/A'}</p>
              </Col>
              <Col xs={12} md={6} lg={4} xl={3} className="mb-4 mb-md-4 mb-xxl-5 detail-box">
                <h5 className="mb-2">Date of Birth</h5>
                <p className="fw-medium">{formatDate(studentData?.dob) || 'N/A'}</p>
              </Col>
              <Col xs={12} md={6} lg={4} xl={3} className="mb-4 mb-md-4 mb-xxl-5 detail-box">
                <h5 className="mb-2">Email</h5>
                <p className="fw-medium">{studentData?.email || 'N/A'}</p>
              </Col>
              <Col xs={12} md={6} lg={4} xl={3} className="mb-4 mb-md-4 mb-xxl-5 detail-box">
                <h5 className="mb-2">Mobile #</h5>
                <p className="fw-medium">{studentData?.mobile || 'N/A'}</p>
              </Col>
              <Col xs={12} md={6} lg={4} xl={3} className="mb-4 mb-md-4 mb-xxl-5 detail-box">
                <h5 className="mb-2">Graduation Year</h5>
                <p className="fw-medium">{studentData?.grad_year || 'N/A'}</p>
              </Col>
              <Col xs={12} md={6} lg={4} xl={3} className="mb-4 mb-md-4 mb-xxl-5 detail-box">
                <h5 className="mb-2">Year</h5>
                <p className="fw-medium">{studentData?.year || 'N/A'}</p>
              </Col>
              <Col xs={12} md={6} lg={4} xl={3} className="mb-4 mb-md-4 mb-xxl-5 detail-box">
                <h5 className="mb-2">Jersey Number</h5>
                <p className="fw-medium">{studentData?.jersey_number || 'N/A'}</p>
              </Col>
              <Col xs={12} md={6} lg={4} xl={3} className="mb-4 mb-md-4 mb-xxl-5 detail-box">
                <h5 className="mb-2">Offence</h5>
                <p className="fw-medium">{studentData?.Offence || 'N/A'}</p>
              </Col>
              <Col xs={12} md={6} lg={4} xl={3} className="mb-4 mb-md-4 mb-xxl-5 detail-box">
                <h5 className="mb-2">Defense</h5>
                <p className="fw-medium">{studentData?.Deffence || 'N/A'}</p>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <div className="admin-content-header mb-4 d-flex gap-2">
                  <h2 className="page-title">Parent Information</h2>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={12} xxl={10} className='order-1 order-xxl-0'>
                <Row>
                  <Col xs={12} md={6} lg={4} xl={3} className="mb-4 mb-md-4 mb-xxl-5 detail-box">
                    <h5 className="mb-2">Parent First Name</h5>
                    <p className="fw-medium">{studentData?.parent_info?.first_name || 'N/A'}</p>
                  </Col>
                  <Col xs={12} md={6} lg={4} xl={3} className="mb-4 mb-md-4 mb-xxl-5 detail-box">
                    <h5 className="mb-2">Parent Last Name</h5>
                    <p className="fw-medium">{studentData?.parent_info?.last_name || 'N/A'}</p>
                  </Col>
                  <Col xs={12} md={6} lg={4} xl={3} className="mb-4 mb-md-4 mb-xxl-5 detail-box">
                    <h5 className="mb-2">Parent Email</h5>
                    <p className="fw-medium">{studentData?.parent_info?.email || 'N/A'}</p>
                  </Col>
                  <Col xs={12} md={6} lg={4} xl={3} className="mb-4 mb-md-4 mb-xxl-5 detail-box">
                    <h5 className="mb-2">Mobile #</h5>
                    <p className="fw-medium">{studentData?.parent_info?.mobile || 'N/A'}</p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>

    </section>
  );
};

export default withFilters(withModal(StudentDetailsView));
