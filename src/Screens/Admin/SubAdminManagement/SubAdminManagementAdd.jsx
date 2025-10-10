import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Form, Formik } from 'formik';
import { Col, Row, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../../Components/BackButton';
import CustomButton from '../../../Components/Common/CustomButton';
import TextInput from '../../../Components/Common/FormElements/TextInput';
import { showToast } from '../../../Components/Toast/Toast';
import withModal from '../../../HOC/withModal';
import { usePageTitle } from '../../../Hooks/usePageTitle';
import { addSubAdminValidation } from '../../../Utils/Validations/ValidationSchemas';
import './styles.css';

const SubAdminManagementAdd = ({ showModal }) => {
  usePageTitle('Add Sub-Admins');
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const createSubAdminMutation = useMutation({
    mutationFn: async (values) => {
      console.log('Creating Sub-Admin:', values);
      await new Promise((res) => setTimeout(res, 1000)); // simulate API
      return { success: true };
    },
    onSuccess: () => {
      showModal(
        '',
        'Sub-Admin has been added successfully!',
        () => {
          navigate('/admin/sub-admin-management');
        },
        'success'
      );
      queryClient.invalidateQueries(['subAdminListing']);
    },
    onError: (error) => {
      console.error('Error creating sub-admin:', error);
      showToast('Failed to add Sub-Admin', 'error');
    },
  });

  const handleSubmit = (values, { resetForm }) => {
    createSubAdminMutation.mutate(values);
    resetForm();
  };

  const modules = [
    'Dashboard',
    'Loader/Rigger Management',
    'Private Company Management',
    'Shipyard User Management',
    'Sub-Admin Management',
    'Report Management',
    'Query Management',
  ];

  return (
    <section className="Add Sub-Admins">
      <div className="admin-content-header mb-4 d-flex gap-2">
        <BackButton />
        <h2>Add Sub-Admins</h2>
      </div>

      <div className="admin-content-body rounded-20 p-4 p-lg-4 p-xxl-5">
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            privileges: {},
          }}
          validationSchema={addSubAdminValidation}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            setFieldValue,
          }) => (
            <Form>
              <Row>
                <Col xs={12} md={8} lg={9} xl={6}>
                  <Row>
                    {/* Name */}
                    <Col xs={12} className="mb-3 mb-lg-4">
                      <TextInput
                        name="name"
                        type="text"
                        required
                        label="Name"
                        placeholder="Enter Name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.name && errors.name}
                      />
                    </Col>

                    {/* Email */}
                    <Col xs={12} className="mb-3 mb-lg-4">
                      <TextInput
                        name="email"
                        type="email"
                        required
                        label="Email Address"
                        placeholder="Enter Email Address"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.email && errors.email}
                      />
                    </Col>

                    {/* Password */}
                    <Col xs={12} className="mb-3 mb-lg-4">
                      <TextInput
                        name="password"
                        type="password"
                        required
                        label="Password"
                        placeholder="Enter Password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.password && errors.password}
                      />
                    </Col>

                    {/* Confirm Password */}
                    <Col xs={12} className="mb-3 mb-lg-4">
                      <TextInput
                        name="password_confirmation"
                        type="password"
                        required
                        label="Confirm Password"
                        placeholder="Confirm Password"
                        value={values.password_confirmation}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          touched.password_confirmation &&
                          errors.password_confirmation
                        }
                      />
                    </Col>

                  </Row>
                </Col>
            </Row>
            <Row>
                {/* Privileges Table */}
                <Col xs={12} className="mb-3 mb-lg-4">
                  <label className="mainLabel">
                    Privileges <span className="text-danger">*</span>
                  </label>
                  <Table bordered responsive className="privileges-table">
                    <thead>
                      <tr>
                        <th>Modules</th>
                        <th>View</th>
                        <th>Perform Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {modules.map((module, index) => (
                        <tr key={index}>
                          <td>{module}</td>
                          <td className="text-center">
                            <input
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
                          <td className="text-center">
                            <input
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
                  </Table>
                </Col>
                <Col xs={12} className="mt-3">
                  <CustomButton
                    type="submit"
                    text="Add Sub-Admin"
                    loading={createSubAdminMutation.isPending}
                    className="min-width-220 btn btn-link-profile"
                  />
                </Col>
              
            </Row>


              <Row>


                {/* Submit Button */}
              </Row>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default withModal(SubAdminManagementAdd);
