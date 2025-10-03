import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
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
  getSubscriptionListing,
} from '../../../Services/Admin/SubscriptionManagement';
import { statusClassMap } from '../../../Utils/Constants/SelectOptions';
import { subscriptionStatusFilters, subscriptionTypeFilters } from '../../../Utils/Constants/TableFilter';
import { subscriptionLogsHeaders } from '../../../Utils/Constants/TableHeaders';
import { formatDate, serialNum, showErrorToast } from '../../../Utils/Utils';
import StatusChip from '../../../Components/StatusChip/StatusChip';

const SubscriptionLogs = ({
  filters,
  setFilters,
  pagination,
  updatePagination,
}) => {
  usePageTitle('Subscription Logs');
  const navigate = useNavigate();
  let queryClient = useQueryClient();

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
    getSubscriptionListing
  );

  // Provide a default value for `subscriptionLogs`
  const subscriptionLogs = fetchedData?.data ?? [];

  if (isError) {
    showErrorToast(error);
  }
  


  return (
    <>
      <section className="subscription-logs">
        <div className="admin-content-header gap-3 d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center mb-4">
          <h2>Subscription Logs</h2>
          <Link className="btn btn-primary text-uppercase" to="/admin/subscription-logs/subscription-plan">
            Manage Subscription Plan
          </Link>
        </div>
        <div className="admin-content-body rounded-20 p-4 p-lg-4 p-xxl-5">
          <Row>
            <Col xs={12}>
              <CustomTable
                filters={filters}
                setFilters={setFilters}
                headers={subscriptionLogsHeaders}
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
                {(subscriptionLogs?.length || isError) && (
                  <tbody>
                    {isError && (
                      <tr>
                        <td colSpan={subscriptionLogsHeaders.length}>
                          <p className="text-danger mb-0">
                            Unable to fetch data at this time
                          </p>
                        </td>
                      </tr>
                    )}
                    {subscriptionLogs?.map((item, index) => (
                      <tr key={item.id}>
                        <td>
                          {serialNum(
                            (filters?.page - 1) * filters?.per_page + index + 1
                          )}
                        </td>
                        <td>{item?.user_name}</td>
                        <td>{item?.email}</td>
                        <td>{item?.school}</td>
                        <td>{item?.type}</td>
                        <td>{item?.subscription_plan}</td>
                        <td>{item?.duration}</td>
                        <td>
                          <span
                            className={`status-tag ${statusClassMap[item?.status_detail]}`}
                          >
                            {item?.status_detail}
                          </span>
                        </td>
                        <td>{item?.amount}</td>
                        <td>{formatDate(item?.created_at)}</td>
                        <td>{formatDate(item?.expire_at)}</td>
                       
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

export default withFilters(SubscriptionLogs);
