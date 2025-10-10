import { useQuery } from '@tanstack/react-query';
import { Col, Row } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../../../Components/BackButton';
import withModal from '../../../HOC/withModal';
import { usePageTitle } from '../../../Hooks/usePageTitle';
import { getAccountDetails } from '../../../Services/Admin/SubAminManagement';
import './styles.css';

const SubAdminManagementDetails = ({ showModal }) => {
  usePageTitle('Sub-Admin Details');
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch Sub-Admin Details
  const {
    data: subAdminData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['subAdminDetails', id],
    queryFn: () => getAccountDetails(id),
    refetchOnWindowFocus: false,
    retry: 1,
  });

  if (isLoading) {
    return (
      <div className="admin-content-body rounded-20 p-4">
        <Skeleton height={30} width={'40%'} className="mb-3" />
        <Skeleton height={25} width={'60%'} className="mb-3" />
        <Skeleton height={200} width={'100%'} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="admin-content-body rounded-20 p-4">
        <p className="text-danger">{error.message}</p>
      </div>
    );
  }

  const subAdmin = subAdminData?.data || {
    name: 'Elbert',
    email: 'elbert@gmail.com',
    privileges: {
      Dashboard: { view: true, action: false },
      'Loader/Rigger Management': { view: true, action: false },
      'Private Company Management': { view: false, action: true },
      'Shipyard User Management': { view: true, action: false },
      'Sub-Admin Management': { view: false, action: true },
      'Report Management': { view: true, action: true },
      'Query Management': { view: false, action: false },
    },
  };

  const handleEdit = () => {
    navigate(`/admin/sub-admin-management/edit/${id}`);
  };

  return (
    <section className="Sub-Admin-Details">
      {/* Header */}
      <div className="admin-content-header mb-4 d-flex gap-2 align-items-center">
        <BackButton />
        <h2 className="page-title">Sub-Admin Details</h2>
      </div>

      {/* Main Content */}
      <div className="admin-content-body rounded-20 p-4 p-lg-5">
        <Row>
          <Col xs={12} md={10} lg={8}>
            {/* Basic Info */}
            <div className="mb-4">
              <p className="fw-bold mb-1">
                Name: <span className="fw-normal">{subAdmin.name}</span>
              </p>
              <p className="fw-bold mb-1">
                Email Address:{' '}
                <span className="fw-normal">{subAdmin.email}</span>
              </p>
            </div>

            {/* Privileges Table */}
            <div>
              <p className="fw-bold mb-2">Privileges</p>
              <div className="table-responsive">
                <table className="table table-bordered align-middle text-center">
                  <thead className="table-light">
                    <tr>
                      <th className="text-start">Modules</th>
                      <th>View</th>
                      <th>Perform Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(subAdmin.privileges).map(
                      ([module, perms]) => (
                        <tr key={module}>
                          <td className="text-start">{module}</td>
                          <td>{perms.view ? '✔️' : ''}</td>
                          <td>{perms.action ? '✔️' : ''}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>

              {/* Edit Button */}
              <div className="mt-4">
                <button
                  type="button"
                  className="btn btn-link-profile min-width-220"
                  onClick={handleEdit}
                >
                  Edit
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default withModal(SubAdminManagementDetails);
