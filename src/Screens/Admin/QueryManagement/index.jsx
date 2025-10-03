import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import {
  HiOutlineCheckCircle,
  HiOutlineEye,
  HiOutlineXCircle,
} from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import CustomModal from '../../../Components/CustomModal';
import CustomTable from '../../../Components/CustomTable/CustomTable';
import TableActionDropDown from '../../../Components/TableActionDropDown/TableActionDropDown';
import { showToast } from '../../../Components/Toast/Toast';
import withFilters from '../../../HOC/withFilters ';
import withModal from '../../../HOC/withModal';
import { usePageTitle } from '../../../Hooks/usePageTitle';
import { useFetchTableData } from '../../../Hooks/useTable';
import { getQueryManagementListing } from '../../../Services/Admin/QueryManagement';
import { userStatusFilters } from '../../../Utils/Constants/TableFilter';
import { queryManagementHeaders } from '../../../Utils/Constants/TableHeaders';
import { formatDate, serialNum, showErrorToast } from '../../../Utils/Utils';

const QueryManagement = ({
  showModal,
  closeModal,
  filters,
  setFilters,
  pagination,
  updatePagination,
}) => {
  usePageTitle('Query Management');
  const navigate = useNavigate();

  let queryClient = useQueryClient();

  //GET USERS
  const {
    data: fetchedData, // Renamed to avoid confusion with the derived `userManagement`
    isLoading,
    isError,
    error,
    refetch,
  } = useFetchTableData(
    'queryManagementListing',
    filters,
    updatePagination,
    getQueryManagementListing
  );

  // Provide a default value for `userManagement`
  const userManagement = fetchedData?.data ?? [];

  // console.log(userManagement, 'Abc');

  if (isError) {
    showErrorToast(error);
  }

  // const isStatusActive = (item) => {
  //   return item?.status_detail === 'Active';
  // };

  // //UPDATE STATUS
  // const handleStatusChange = (item) => {
  //   setSelectedObj(item);
  //   setChangeStatusModal(true);
  // };

  // // Mutation for updating status
  // const { mutate: updateStatusMutation, isPending: isStatusUpdating } =
  //   useMutation({
  //     mutationFn: async (id) => await updateStatus(id),
  //     onSuccess: (data) => {
  //       showToast('Status updated successfully', 'success');
  //       setChangeStatusModal(false);
  //       queryClient.invalidateQueries(['userListing', filters]);
  //     },
  //     onError: (error) => {
  //       console.error('Error updating status:', error);
  //     },
  //   });

  // // Confirm status change
  // const confirmStatusChange = () => {
  //   if (selectedObj) {
  //     updateStatusMutation(selectedObj.id);
  //   }
  // };

  return (
    <>
      <section className="query-management">
        <div className="admin-content-header mb-4">
          <h2>Query Management</h2>
        </div>
        <div className="admin-content-body rounded-20 p-4 p-lg-4 p-xxl-5">
          <Row>
            <Col xs={12}>
              <CustomTable
                filters={filters}
                setFilters={setFilters}
                headers={queryManagementHeaders}
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
                        <td colSpan={queryManagementHeaders.length}>
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
                        <td>{item?.user_name}</td>
                        <td>{item?.email}</td>
                        <td>{item?.type}</td>
                        <td>{formatDate(item?.created_at)}</td>
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

      {/* <CustomModal
        show={changeStatusModal}
        close={() => setChangeStatusModal(false)}
        disableClick={isStatusUpdating} // Disable action button during mutation
        action={confirmStatusChange} // Perform status change on confirm
        title={isStatusActive(selectedObj) ? 'Deactivate' : 'Activate'}
        description={`Are you sure you want to ${
          isStatusActive(selectedObj) ? 'deactivate' : 'activate'
        } this user?`}
      /> */}
    </>
  );
};

export default withModal(withFilters(QueryManagement));
