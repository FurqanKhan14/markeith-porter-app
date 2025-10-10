import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Col, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Skeleton from 'react-loading-skeleton';
import BackButton from '../../../Components/BackButton';
import CustomButton from '../../../Components/Common/CustomButton';
import TextInput from '../../../Components/Common/FormElements/TextInput';
import withModal from '../../../HOC/withModal';
import { usePageTitle } from '../../../Hooks/usePageTitle';
import { showToast } from '../../../Components/Toast/Toast';
import { addSubAdminValidation, editSubAdminValidation } from '../../../Utils/Validations/ValidationSchemas';
import { getAccountDetails } from '../../../Services/Admin/SubAminManagement';
import './styles.css';
import withFilters from '../../../HOC/withFilters ';

const SubAdminManagementEdit = ({ showModal }) => {
  usePageTitle('Edit Sub-Admins');
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();

  // ✅ Fetch existing sub-admin details
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
    enabled: !!id,
  });

  // ✅ Modules list
  const allModules = [
    'Dashboard',
    'Loader/Rigger Management',
    'Private Company Management',
    'Shipyard User Management',
    'Sub-Admin Management',
    'Report Management',
    'Query Management',
  ];

  // ✅ Mutation for update
  const updateSubAdminMutation = useMutation({
    mutationFn: async (values) => {
      // Simulated API delay
      await new Promise((res) => setTimeout(res, 1000));
      console.log('Updated Sub-Admin:', values);
      return { success: true };
    },
    onSuccess: () => {
      showModal(
        '',
        'Sub-Admin has been updated successfully!',
        () => {
          queryClient.invalidateQueries(['subAdminDetails']);
          navigate('/admin/sub-admin-management');
        },
        'success'
      );
    },
    onError: (error) => {
      console.error('Error updating Sub-Admin:', error);
      showModal(
        '',
        'Failed to update Sub-Admin. Please try again.',
        null,
        'error'
      );
    },
  });

  // ✅ Loading State
  if (isLoading) {
    return (
      <div className="admin-content-body rounded-20 p-4">
        <Skeleton height={30} width={'40%'} className="mb-3" />
        <Skeleton height={25} width={'60%'} className="mb-3" />
        <Skeleton height={200} width={'100%'} />
      </div>
    );
  }

  // ✅ Error State
  if (isError) {
    return (
      <div className="admin-content-body rounded-20 p-4">
        <p className="text-danger">{error.message}</p>
      </div>
    );
  }

  // ✅ Fallback dummy data (for local UI testing)
  const subAdmin = subAdminData?.data || {
    name: 'Alvin Eric',
    email: 'alvin.eric@gmail.com',
    privileges: {
      Dashboard: { view: true, action: true },
      'Loader/Rigger Management': { view: true, action: false },
      'Private Company Management': { view: true, action: true },
      'Shipyard User Management': { view: false, action: false },
      'Sub-Admin Management': { view: true, action: false },
      'Report Management': { view: true, action: true },
      'Query Management': { view: false, action: false },
    },
  };

  return (
    <section className="Edit-Sub-Admin">
      <div className="admin-content-header mb-4 d-flex gap-2 align-items-center">
        <BackButton />
        <h2 className="page-title">Edit Sub-Admins</h2>
      </div>

      <div className="admin-content-body rounded-20 p-4 p-lg-5">
        <Row>
          <Col xs={12} md={10} lg={8}>
            <Formik
              initialValues={{
                name: subAdmin.name || '',
                email: subAdmin.email || '',
                privileges: subAdmin.privileges || {},
              }}
              validationSchema={editSubAdminValidation}
              enableReinitialize
              onSubmit={(values) => {
                // ✅ Confirmation Modal before update
                showModal(
                  '',
                  'Sub-Admin has been updated Successfully!',
                  () => updateSubAdminMutation.mutate(values),
                  'success'
                );
              }}
            >
              {({ values, setFieldValue, errors, touched }) => (
                <Form>
                  {console.log(errors, "Erroes")}
                  {/* Basic Info */}
                  <Row>
                    <Col xs={12} className="mb-3 mb-lg-4">
                      <TextInput
                        name="name"
                        type="text"
                        required
                        label="Name"
                        placeholder="Enter Name"
                        value={values.name}
                        onChange={(e) => setFieldValue('name', e.target.value)}
                        error={touched.name && errors.name}
                      />
                    </Col>

                    <Col xs={12} className="mb-3 mb-lg-4">
                      <TextInput
                        name="email"
                        type="email"
                        required
                        label="Email Address"
                        placeholder="Enter Email Address"
                        value={values.email}
                        onChange={(e) => setFieldValue('email', e.target.value)}
                        error={touched.email && errors.email}
                      />
                    </Col>
                  </Row>

                  {/* Privileges Table */}
                  <div className="mb-4">
                    <label className="mainLabel d-block mb-2">
                      Privileges <span className="text-danger">*</span>
                    </label>
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
                          {allModules.map((module) => (
                            <tr key={module}>
                              <td className="text-start">{module}</td>
                              <td>
                                <Field
                                  type="checkbox"
                                  name={`privileges.${module}.view`}
                                  checked={
                                    values.privileges?.[module]?.view || false
                                  }
                                  onChange={(e) =>
                                    setFieldValue(
                                      `privileges.${module}.view`,
                                      e.target.checked
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <Field
                                  type="checkbox"
                                  name={`privileges.${module}.action`}
                                  checked={
                                    values.privileges?.[module]?.action || false
                                  }
                                  onChange={(e) =>
                                    setFieldValue(
                                      `privileges.${module}.action`,
                                      e.target.checked
                                    )
                                  }
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="mt-4">
                    <CustomButton
                      type="submit"
                      text="Update Sub-Admin"
                      loading={updateSubAdminMutation.isPending}
                      className="min-width-220 btn btn-link-profile"
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default withModal(SubAdminManagementEdit);
