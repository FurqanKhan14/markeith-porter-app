import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import {
  HiOutlineCheckCircle,
  HiOutlineEye,
  HiOutlineXCircle,
} from 'react-icons/hi2';
import { Link, useNavigate } from 'react-router-dom';
import CustomModal from '../../../Components/CustomModal';
import CustomTable from '../../../Components/CustomTable/CustomTable';
import TableActionDropDown from '../../../Components/TableActionDropDown/TableActionDropDown';
import { showToast } from '../../../Components/Toast/Toast';
import withFilters from '../../../HOC/withFilters ';
import withModal from '../../../HOC/withModal';
import { usePageTitle } from '../../../Hooks/usePageTitle';
import { useFetchTableData } from '../../../Hooks/useTable';
import {
  getSubscriptionPlansListing, updateSubscriptionPlanStatus
} from '../../../Services/Admin/SubscriptionManagement';
import { subscriptionStatusFilters, subscriptionTypeFilters, userStatus } from '../../../Utils/Constants/TableFilter';
import { subscriptionPlanHeaders } from '../../../Utils/Constants/TableHeaders';
import { formatDate, replaceUnderscoreWithSpace, serialNum, showErrorToast } from '../../../Utils/Utils';
import BackButton from '../../../Components/BackButton';
import SelectInput from '../../../Components/Common/FormElements/SelectInput';

const SubscriptionPlan = ({
  showModal,
  filters,
  setFilters,
  pagination,
  updatePagination,
}) => {
  usePageTitle('Subscription Plan');
  const navigate = useNavigate();
  let queryClient = useQueryClient();
  const [changeStatusModal, setChangeStatusModal] = useState(false);
  const [selectedObj, setSelectedObj] = useState(null);
  const [selectValue, setSelectValue] = useState({});

  //GET SUBSCRIPTION LISTING
  const {
    data: fetchedData,
    isLoading,
    isError,
    error,
    refetch,
  } = useFetchTableData(
    'subscriptionListing',
    filters,
    updatePagination,
    getSubscriptionPlansListing
  );

  // Provide a default value for `subscriptionLogs`
  const subscriptionPlans = fetchedData?.data ?? [];

  if (isError) {
    showErrorToast(error);
  }
  
  const isStatusActive = (item) => {
    // Simple logic based on item?.status
    const status = item?.status;
    console.log(`Item ${item.id}: status="${status}"`);
    
    // If status is 1, return true (active), if 0, return false (inactive)
    return status === 1 || status === '1';
  };
  

  // Initialize selectValue when userManagement changes
  useEffect(() => {
    if (subscriptionPlans.length > 0) {
      const initialValues = {};
      subscriptionPlans.forEach((item) => {
        // Simple mapping: 1 = active, 0 = inactive
        const isActive = isStatusActive(item);
        initialValues[item.id] = isActive ? '1' : '0';
        console.log(`Item ${item.id}: status=${item?.status}, isActive=${isActive}, selectValue=${isActive ? '1' : '0'}`);
      });
      setSelectValue(initialValues);
    }
  }, [subscriptionPlans]);

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
    console.log('Showing modal for status change:', { itemId, newStatus, statusText });
    
    showModal(
      ``,
      `Are you sure you want to ${actionText} this user?`,
      () => {
        // This will be called when user confirms
        console.log('Modal confirmed, calling API for itemId:', itemId);
        updateStatusMutation(itemId);
      },
      'info'
    );
  };

  // Mutation for updating status
  const { mutate: updateStatusMutation, isPending: isStatusUpdating } =
    useMutation({
      mutationFn: async (id) => await updateSubscriptionPlanStatus(id),
      onSuccess: (data, variables) => {
        showToast('Status updated successfully', 'success');
        // Show success modal after a short delay to avoid conflicts
        setTimeout(() => {
          const currentStatus = selectValue[variables] === '1' ? 'Active' : 'Inactive';
          showModal(
            ``,
            `User has been ${currentStatus.toLowerCase()} successfully!`,
            null,
            'success'
          );
        }, 1000); // Increased delay to ensure confirmation modal is closed
        queryClient.invalidateQueries(['subscriptionListing', filters]);
      },
      onError: (error, variables) => {
        console.error('Error updating status:', error);
        showToast('Failed to update status', 'error');
        // Revert the local state change on error
        if (selectedObj) {
          setSelectValue(prev => ({
            ...prev,
            [selectedObj.id]: selectedObj.status === '1' ? '0' : '1'
          }));
        }
      },
    });

  // Confirm status change
  // const confirmStatusChange = () => {
  //   if (selectedObj) {
  //     updateStatusMutation(selectedObj.id);
  //   }
  // };

  return (
    <>
      <section className="subscription-logs">

        <div className="admin-content-header gap-3 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
          <div className="d-flex align-items-center gap-2">
        <BackButton />
          <h2>Subscription Plan</h2>
          </div>
          <div className="d-flex align-items-center gap-2">
          <Link className="btn btn-primary text-uppercase" to="/admin/subscription-logs/subscription-plan/add">
            Add Plan
          </Link>
          </div>
        </div>
        <div className="admin-content-body rounded-20 p-4 p-lg-4 p-xxl-5">
          <Row>
            <Col xs={12}>
              <CustomTable
                filters={filters}
                setFilters={setFilters}
                headers={subscriptionPlanHeaders}
                pagination={pagination}
                isLoading={isLoading}
                centerLastHeader={true}
                selectOptions={[
                  {
                    title: 'status',
                    options: subscriptionStatusFilters,
                  },
                  {
                    title: 'Type',
                    options: subscriptionTypeFilters,
                  },
                ]}
                dateFilters={[
                  { title: 'Payment Date', from: 'from', to: 'to' },
                  { title: 'Expire Date', from: 'from', to: 'to' },
                ]}
              >
                {(subscriptionPlans?.length || isError) && (
                  <tbody>
                    {isError && (
                      <tr>
                        <td colSpan={subscriptionPlanHeaders.length}>
                          <p className="text-danger mb-0">
                            Unable to fetch data at this time
                          </p>
                        </td>
                      </tr>
                    )}
                    {subscriptionPlans?.map((item, index) => (
                      <tr key={item.id}>
                        <td>
                          {serialNum(
                            (filters?.page - 1) * filters?.per_page + index + 1
                          )}
                        </td>
                        <td>{item?.subscription_title}</td>
                        <td>{replaceUnderscoreWithSpace( item?.duration)}</td>
                        <td>{item?.amount}</td>
                        <td>
                          <SelectInput
                            options={userStatus}
                            value={selectValue[item.id]}
                            className={`status-select ${selectValue[item.id] === '1' ? 'status-active' : 'status-inactive'}`}
                            onChange={(event) => handleStatusChange(item.id, event)}
                          />
                        </td>
                        <td>{formatDate(item?.created_at)}</td>
                        <td>{formatDate(item?.updated_at)}</td>
                        <td>
                        <TableActionDropDown
                            actions={[
                              {
                                name: 'View',
                                icon: HiOutlineEye,
                                onClick: () => navigate(`${item.id}`),
                                className: 'view',
                              },
                           
                              // {
                              //   name: 'View',
                              //   icon: HiOutlineEye,
                              //   onClick: () => navigate(`${item.id}`),
                              //   className: 'view',
                              // },
                              // {
                              //   name: isStatusActive(item)
                              //     ? 'Deactivate'
                              //     : 'Activate',
                              //   icon: isStatusActive(item)
                              //     ? HiOutlineXCircle
                              //     : HiOutlineCheckCircle,
                              //   onClick: () => handleStatusChange(item),
                              //   className: isStatusActive(item)
                              //     ? 'delete with-color'
                              //     : 'view with-color',
                              // },
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
    </>
  );
};

export default withModal(withFilters(SubscriptionPlan));
