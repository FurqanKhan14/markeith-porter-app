import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { HiOutlineEye } from 'react-icons/hi2';
import { Link, useNavigate } from 'react-router-dom';
import CustomSelect from '../../../Components/Common/FormElements/SelectInput';
import CustomTable from '../../../Components/CustomTable/CustomTable';
import TableActionDropDown from '../../../Components/TableActionDropDown/TableActionDropDown';
import { showToast } from '../../../Components/Toast/Toast';
import withFilters from '../../../HOC/withFilters ';
import withModal from '../../../HOC/withModal';
import { usePageTitle } from '../../../Hooks/usePageTitle';
import { useFetchTableData } from '../../../Hooks/useTable';
import { getLoaderListing } from '../../../Services/Admin/PrivateCompanyManagement';
import {
  userStatus,
  userStatusFilters,
} from '../../../Utils/Constants/TableFilter';
import {
  headCoachHeaders,
  privateHeaders,
  subAdminHeaders,
} from '../../../Utils/Constants/TableHeaders';
import {
  formatDate,
  fullName,
  serialNum,
  showErrorToast,
} from '../../../Utils/Utils';
import './styles.css';

const SubAdminManagement = ({
  showModal,
  closeModal,
  filters,
  setFilters,
  pagination,
  updatePagination,
}) => {
  usePageTitle('Private Company Management');
  let queryClient = useQueryClient();
  const navigate = useNavigate();
  const [selectValue, setSelectValue] = useState({});

  //GET USERS
  const {
    data: fetchedData, // Renamed to avoid confusion with the derived `userManagement`
    isLoading,
    isError,
    error,
    refetch,
  } = useFetchTableData(
    'loaderListing',
    filters,
    updatePagination,
    getLoaderListing
  );
  const userManagement = fetchedData?.data ?? [];

  // console.log(userManagement, 'userManagement');

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
    if (userManagement.length > 0) {
      const initialValues = {};
      userManagement.forEach((item) => {
        // Simple mapping: 1 = active, 0 = inactive
        const isActive = isStatusActive(item);
        initialValues[item.id] = isActive ? '1' : '0';
        console.log(
          `Item ${item.id}: status=${
            item?.status
          }, isActive=${isActive}, selectValue=${isActive ? '1' : '0'}`
        );
      });
      setSelectValue(initialValues);
    }
  }, [userManagement]);

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
    const actionText = statusText === 'Active' ? 'activate' : 'deactivate';
    console.log('Showing modal for status change:', {
      itemId,
      newStatus,
      statusText,
    });

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
  const updateStatusMutation = async (id) => {
    console.log('Simulating API call to update status for id:', id);
    showModal(``, `Successfully updated this user?`, null, 'success');
  };

  // Mutation for updating status
  // const { mutate: updateStatusMutation, isPending: isStatusUpdating } =
  //   useMutation({
  //     mutationFn: async (id) => await updateHeadCoachStatus(id),
  //     onSuccess: (data, variables) => {
  //       showToast('Status updated successfully', 'success');
  //       // Show success modal after a short delay to avoid conflicts
  //       setTimeout(() => {
  //         const currentStatus =
  //           selectValue[variables] === '1' ? 'Active' : 'Inactive';
  //         showModal(
  //           ``,
  //           `User has been ${currentStatus.toLowerCase()} successfully!`,
  //           null,
  //           'success'
  //         );
  //       }, 1000); // Increased delay to ensure confirmation modal is closed
  //       queryClient.invalidateQueries(['headCoachListing', filters]);
  //     },
  //     onError: (error, variables) => {
  //       console.error('Error updating status:', error);
  //       showToast('Failed to update status', 'error');
  //       // Revert the local state change on error
  //       if (variables) {
  //         setSelectValue((prev) => {
  //           const newState = { ...prev };
  //           const item = userManagement.find((item) => item.id === variables);
  //           if (item) {
  //             newState[item.id] =
  //               item.status === 1 || item.status === '1' ? '1' : '0';
  //           }
  //           return newState;
  //         });
  //       }
  //     },
  //   });

  return (
    <>
      <section className="Sub-Admin Management">
        <div className="admin-content-header mb-4 d-flex justify-content-between align-items-center gap-2">
          <h2 className="screen-title mb-0">Sub-Admin Management</h2>
          <Link
            className="btn btn-link-profile text-capitalize"
            to="/admin/sub-admin-management/add"
          >
            Add Sub-Admin
          </Link>
        </div>
        <div className="admin-content-body rounded-20 p-4 p-lg-4 p-xxl-4 mb-4">
          <Row>
            <Col xs={12}>
              <CustomTable
                filters={filters}
                setFilters={setFilters}
                headers={subAdminHeaders}
                pagination={pagination}
                isLoading={isLoading}
                centerLastHeader={true}
                selectOptions={[
                  {
                    title: 'status',
                    options: userStatusFilters,
                  },
                ]}
                dateFilters={[
                  { title: 'Registration Date', from: 'from', to: 'to' },
                ]}
              >
                {(userManagement?.length || isError) && (
                  <tbody>
                    {isError && (
                      <tr>
                        <td colSpan={headCoachHeaders.length}>
                          <p className="text-danger mb-0">
                            Unable to fetch data at this time
                          </p>
                        </td>
                      </tr>
                    )}
                    {userManagement?.map((item, index) => (
                      <tr key={item.id}>
                        <td>
                          {serialNum(
                            (filters?.page - 1) * filters?.per_page + index + 1
                          )}
                        </td>
                        <td>{item?.first_name || '-'}</td>
                        <td>{item?.email || '-'}</td>
                        <td>{formatDate(item?.created_at)}</td>
                        <td>
                          <CustomSelect
                            options={userStatus}
                            value={selectValue[item.id]}
                            className={`status-select ${
                              selectValue[item.id] === '1'
                                ? 'status-active'
                                : 'status-inactive'
                            }`}
                            onChange={(event) =>
                              handleStatusChange(item.id, event)
                            }
                          />
                        </td>
                        <td>
                          <TableActionDropDown
                            actions={[
                              {
                                name: 'View',
                                icon: HiOutlineEye,
                                onClick: () => navigate(`${item.id}`),
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
    </>
  );
};

export default withModal(withFilters(SubAdminManagement));
