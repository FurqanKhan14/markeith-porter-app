import React from 'react';
import { Formik, Form } from 'formik';
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import BackButton from '../../../Components/BackButton';
import CustomButton from '../../../Components/Common/CustomButton';
import TextInput from '../../../Components/Common/FormElements/TextInput';
import PhoneInput from 'react-phone-number-input';
import withModal from '../../../HOC/withModal';
import { usePageTitle } from '../../../Hooks/usePageTitle';
import { showToast } from '../../../Components/Toast/Toast';
import { addLoaderValidation } from '../../../Utils/Validations/ValidationSchemas';
import './styles.css';

const LoaderRiggerAdd = ({ showModal }) => {
  usePageTitle('Add Loader Rigger');
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Dummy mutation for now
  const createLoaderMutation = useMutation({
    mutationFn: async (values) => {
      console.log('Creating Loader/Rigger:', values);
      await new Promise((res) => setTimeout(res, 1000)); // simulate API call
      return { success: true };
    },
    onSuccess: () => {
      showModal(
        '',
        'Loader/Rigger has been added successfully!',
        () => {
          navigate('/admin/loader-Rigger-management');
        },
        'success'
      );
      queryClient.invalidateQueries(['loaderRiggerListing']);
    },
    onError: (error) => {
      console.error('Error creating loader/rigger:', error);
      showToast('Failed to add Loader/Rigger', 'error');
    },
  });

  const handleSubmit = (values, { resetForm }) => {
    createLoaderMutation.mutate(values);
    resetForm();
  };

  return (
    <section className="Add New loader/Rigger">
      <div className="admin-content-header mb-4 d-flex gap-2">
        <BackButton />
        <h2>Add New Loader/Rigger</h2>
      </div>

      <div className="admin-content-body rounded-20 p-4 p-lg-4 p-xxl-5">
        <Row>
          <Col xs={12} md={10} lg={8} xl={6}>
            <Formik
              initialValues={{
                first_name: '',
                last_name: '',
                email: '',
                phone_number: '',
                password: '',
                password_confirmation: '',
              }}
              validationSchema={addLoaderValidation}
              onSubmit={handleSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                setFieldValue,
                isSubmitting,
              }) => (
                <Form>
                  <Row>
                    <Col xs={12} className="mb-3 mb-lg-4">
                      <TextInput
                        name="first_name"
                        type="text"
                        required
                        label="First Name"
                        placeholder="Enter First Name"
                        value={values.first_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.first_name && errors.first_name}
                      />
                    </Col>

                    <Col xs={12} className="mb-3 mb-lg-4">
                      <TextInput
                        name="last_name"
                        type="text"
                        required
                        label="Last Name"
                        placeholder="Enter Last Name"
                        value={values.last_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.last_name && errors.last_name}
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
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.email && errors.email}
                      />
                    </Col>

                    <Col xs={12} className="mb-3 mb-lg-4">
                      <label className="mainLabel">
                        Phone Number <span className="text-danger">*</span>
                      </label>
                      <PhoneInput
                        defaultCountry="US"
                        placeholder="Enter Phone Number"
                        value={values.phone_number}
                        onChange={(phone_number) =>
                          setFieldValue('phone_number', phone_number)
                        }
                        onBlur={handleBlur}
                        className=" d-flex form-control"
                      />
                      {touched.phone_number && errors.phone_number ? (
                        <div className="text-danger small">
                          {errors.phone_number}
                        </div>
                      ) : null}
                    </Col>

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

                    <Col xs={12} className="mt-3">
                      <CustomButton
                        type="submit"
                        text="Add New Loader/Rigger"
                        loading={createLoaderMutation.isPending}
                        className="min-width-220 btn btn-link-profile"
                      />
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default withModal(LoaderRiggerAdd);
