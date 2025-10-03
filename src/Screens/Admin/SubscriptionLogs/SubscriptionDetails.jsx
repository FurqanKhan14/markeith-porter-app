import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import {
  HiOutlineCheckCircle,
  HiOutlineEye,
  HiOutlineXCircle,
} from 'react-icons/hi2';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CustomModal from '../../../Components/CustomModal';
import CustomTable from '../../../Components/CustomTable/CustomTable';
import TableActionDropDown from '../../../Components/TableActionDropDown/TableActionDropDown';
import { showToast } from '../../../Components/Toast/Toast';
import withFilters from '../../../HOC/withFilters ';
import withModal from '../../../HOC/withModal';
import { usePageTitle } from '../../../Hooks/usePageTitle';
import { useFetchTableData } from '../../../Hooks/useTable';
import {
  updateSubscriptionPlanStatus,
  viewSubscriptionPlan,
} from '../../../Services/Admin/SubscriptionManagement';

import { formatDate, replaceUnderscoreWithSpace, showErrorToast } from '../../../Utils/Utils';
import BackButton from '../../../Components/BackButton';
import { userStatus } from '../../../Utils/Constants/TableFilter';
import SelectInput from '../../../Components/Common/FormElements/SelectInput';

const SubscriptionDetails = ({
  showModal
}) => {
  usePageTitle('Subscription Plan');
  let queryClient = useQueryClient();
  const { id } = useParams();
  const navigate = useNavigate();
  const [changeStatusModal, setChangeStatusModal] = useState(false);
  const [selectedObj, setSelectedObj] = useState(null);
  const [selectValue, setSelectValue] = useState({});

  //GET SUBSCRIPTION DATA
  const {
    data: fetchedData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['subscriptionDetails', id],
    queryFn: () => viewSubscriptionPlan(id),
    onError: (error) => {
      console.error("Error fetching subscription details:", error.message);
    },
    refetchOnWindowFocus: false,
    retry: 1,
  });

  if (isError) {
    showErrorToast(error);
  }
  const subscriptionData = fetchedData ?? {};

  // console.log(subscriptionData, 'subscriptionData');


  // Initialize selectValue when userManagement changes
    useEffect(() => {
      if (subscriptionData) {
        const isActive = subscriptionData.status === 1;
        const initialValues = {
          [subscriptionData.id]: isActive ? '1' : '0',
        };
        setSelectValue(initialValues);
    
        console.log(`Status: ${isActive ? 'Active' : 'Inactive'}`);
        console.log('Initial Values:', initialValues);
      }
    }, [subscriptionData]);
  

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
    console.log('Calling mutation with:', { id: itemId, status: Number(newStatus) });
    
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
        return await updateSubscriptionPlanStatus(id, status);
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
        queryClient.invalidateQueries(['subscriptionDetails']);
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


  return (
    <>
      <section className="subscription-logs">
        <div className="admin-content-header mb-4 d-flex gap-2">
          <BackButton />
          <h2>View Plan</h2>
        </div>
        <div className="admin-content-body rounded-20 p-4 p-lg-4 p-xxl-5">
          <Row>
            <Col xs={12} md={9} lg={8} xxl={7}>
              <Row>
                <Col xs={12} md={6} lg={6} className="mb-4 mb-md-4 mb-xxl-5 detail-box">
                  <h5 className="mb-2">Subscription Title</h5>
                  <p className="fw-medium">{subscriptionData?.subscription_title}</p>
                </Col>
                <Col xs={12} md={6} lg={6} className="mb-4 mb-md-4 mb-xxl-5 detail-box">
                  <h5 className="mb-2">Duration</h5>
                  <p className="fw-medium">{replaceUnderscoreWithSpace(subscriptionData?.duration)}</p>
                </Col>
                <Col xs={12} md={6} lg={6} className="mb-4 mb-md-4 mb-xxl-5 detail-box">
                  <h5 className="mb-2">Amount</h5>
                  <p className="fw-medium">${subscriptionData?.amount}</p>
                </Col>
                <Col xs={12} md={6} lg={6} className="mb-4 mb-md-4 mb-xxl-5 detail-box">
                  <h5 className="mb-2">Type</h5>
                  <p className="fw-medium">{replaceUnderscoreWithSpace(subscriptionData?.type)}</p>
                </Col>
                <Col xs={12} xxl={9} className="mb-4 mb-md-4 mb-xxl-5 detail-box">
                  <h5 className="mb-2">Description</h5>
                  <p className="fw-medium">{subscriptionData?.description}</p>
                </Col>
                <Col xs={12} md={12} lg={12}>
                <Link 
                  to={`/admin/subscription-logs/subscription-plan/edit/${id}`}      
                  className="btn btn-primary text-uppercase"
                >
                  Edit
                </Link>
                </Col>
              </Row>
            </Col>
            <Col xs={12} md={3} lg={4} xxl={5}>
              <div className="d-flex justify-content-end">
                <SelectInput
                  options={userStatus}
                  value={selectValue[subscriptionData.id]}
                  className={`status-select ${selectValue[subscriptionData.id] === '1' ? 'status-active' : 'status-inactive'}`}
                  onChange={(event) => handleStatusChange(subscriptionData.id, event)}
                />
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
};

export default withModal(withFilters(SubscriptionDetails));
