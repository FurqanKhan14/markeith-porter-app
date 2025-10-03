import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';
import BackButton from '../../../Components/BackButton';
import CustomButton from '../../../Components/Common/CustomButton';
import CustomModal from '../../../Components/CustomModal';
import CustomTable from '../../../Components/CustomTable/CustomTable';
import StatusChip from '../../../Components/StatusChip/StatusChip';
import { showToast } from '../../../Components/Toast/Toast';
import { usePageTitle } from '../../../Hooks/usePageTitle';
import { viewQueryManagement} from '../../../Services/Admin/QueryManagement';
import { statusClassMap } from '../../../Utils/Constants/SelectOptions';
import { formatDate } from '../../../Utils/Utils';
import './styles.css';

const QueryDetails = ({ showModal, closeModal, updatePagination }) => {
  usePageTitle('User Detils');
  const [changeStatusModal, setChangeStatusModal] = useState(false);
  const { id } = useParams();
  let queryClient = useQueryClient();

  // Mutation for updating status
  const { mutate: updateStatusMutation, isPending: isStatusUpdating } =
    useMutation({
      mutationFn: async () => await updateStatus(id),
      onSuccess: (data) => {
        showToast('Status updated successfully', 'success');
        setChangeStatusModal(false);
        queryClient.invalidateQueries(['userDetails', id]);
      },
      onError: (error) => {
        showToast('Failed to update status', 'error');
        console.error('Error updating status:', error);
      },
    });

  const handleStatusChange = () => {
    const newStatus = user?.status_detail === 'Active' ? 'Inactive' : 'Active';
    updateStatusMutation(newStatus);
  };

  // User Details
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['queryDetails', id],
    queryFn: () => viewQueryManagement(id),
    refetchOnWindowFocus: false,
    retry: 1,
  });



  if (isLoading) {
    return (
      <>
        <div className="d-card ">
          <div className="row">
            <div className="col-12 col-lg-10 col-xl-9 col-xxl-7">
              <div className="row mb-4">
                {Array.from({ length: 19 }).map((_, i) => (
                  <div
                    key={i}
                    className="col-12 col-sm-6 mb-3  align-items-center"
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
    <section className="query-management">
      <div className="admin-content-header mb-4 d-flex gap-2">
        <BackButton />
        <h2 className="page-title">View User</h2>
      </div>
      <div className="admin-content-body rounded-20 p-4 p-lg-4 p-xxl-5">
        <Row>
          <Col xs={12} xxl={9}>
            <Row>
              <Col xs={12} lg={4} className="mb-4 mb-md-4 mb-xxl-5 detail-box">
                <h5 className="mb-2">full Name</h5>
                <p className="fw-medium">{user?.user_name}</p>
              </Col>
              <Col xs={12} lg={4} className="mb-4 mb-md-4 mb-xxl-5 detail-box">
                <h5 className="mb-2">Email Address</h5>
                <p className="fw-medium">{user?.email}</p>
              </Col>
              <Col xs={12} lg={4} className="mb-4 mb-md-4 mb-xxl-5 detail-box">
                <h5 className="mb-2">Type</h5>
                <p className="fw-medium">{user?.type}</p>
              </Col>
              <Col xs={12} lg={4} className="mb-4 mb-md-4 mb-xxl-5 detail-box">
                <h5 className="mb-2">date</h5>
                <p className="fw-medium">{formatDate(user?.created_at)}</p>
              </Col>
              <Col xs={12} lg={6} className="mb-4 mb-md-4 mb-xxl-5 detail-box">
                <h5 className="mb-2">subject</h5>
                <p className="fw-medium">{user?.subject || ''}</p>
              </Col>
              <Col xs={12} lg={10} className="detail-box">
                <h5 className="mb-2">Message</h5>
                <p className="fw-medium">{user?.message || ''}</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </section>

    
  );
};

export default QueryDetails;
