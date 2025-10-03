import { Form, Formik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import CustomButton from '../../../Components/Common/CustomButton';
import CustomSelect from '../../../Components/Common/FormElements/SelectInput';
import BackButton from '../../../Components/BackButton';
import { usePageTitle } from '../../../Hooks/usePageTitle';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSubscriptionPlan } from '../../../Services/Admin/SubscriptionManagement';
import { showToast } from '../../../Components/Toast/Toast';
import withModal from '../../../HOC/withModal';
import TextInput from '../../../Components/Common/FormElements/TextInput';
import { SubscriptionValidationSchema } from '../../../Utils/Validations/ValidationSchemas';
import { durationOptions, subscriptionTypeOptions } from '../../../Utils/Constants/SelectOptions';

const SubscriptionAdd = ({ showModal }) => {
  usePageTitle('Add Subscription Plan');
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // CREATE SUBSCRIPTION PLAN MUTATION
  const createSubscriptionMutation = useMutation({
    mutationFn: createSubscriptionPlan,
    onSuccess: (data) => {
      showModal('', 'Subscription plan has been created successfully!', () => {
        navigate('/admin/subscription-logs/subscription-plan');
      }, 'success');
      queryClient.invalidateQueries(['subscriptionPlansListing']);
    },
    onError: (error) => {
      console.error('Error creating subscription plan:', error);
      showToast('Failed to create subscription plan', 'error');
    },
  });

  const handleSubmit = (values, {resetForm}) => {
    console.log('values', values);
    showModal('', `Subscription plan has been created successfully!`, () => {
      navigate('/admin/subscription-logs/subscription-plan');
    }, 'success');
    resetForm();
    // createSubscriptionMutation.mutate(values);
  };

  return (
    <section className="subscription-logs">
      <div className="admin-content-header mb-4 d-flex gap-2">
        <BackButton />
        <h2>Add Subscription Plan</h2>
      </div>
      <div className="admin-content-body rounded-20 p-4 p-lg-4 p-xxl-5">
        <Row>
          <Col xs={12} md={10} lg={8} xl={6}>
            <Formik
              initialValues={{
                subscription_title: '',
                type: '',
                duration: '',
                amount: '',
                description: '',
                status: 'active',
              }}
              validationSchema={SubscriptionValidationSchema}
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
                        name="subscription_title"
                        type="text"
                        required
                        label="Subscription Title"
                        placeholder="Enter Subscription title"
                        value={values.subscription_title}
                        labelClassName={`label-padding-left`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.subscription_title && errors.subscription_title}
                      />
                    </Col>

                    <Col xs={12} className="mb-3 mb-lg-4">
                      <CustomSelect
                        name="type"
                        label="Type"
                        required
                        options={subscriptionTypeOptions}
                        value={values.type}
                        labelClassName={`label-padding-left`}
                        onChange={(value) => setFieldValue('type', value)}
                        onBlur={handleBlur}
                        error={touched.type && errors.type}
                        touched={touched.type}
                        placeholder="Select Type"
                      />
                    </Col>

                    <Col xs={12} className="mb-3 mb-lg-4">
                      <CustomSelect
                        name="duration"
                        label="Duration"
                        required
                        options={durationOptions}
                        value={values.duration}
                        labelClassName={`label-padding-left`}
                        onChange={(value) => setFieldValue('duration', value)}
                        onBlur={handleBlur}
                        error={touched.duration && errors.duration}
                        touched={touched.duration}
                        placeholder="Select Duration"
                        selectClass="select-input-height"
                      />
                    </Col>

                    <Col xs={12} className="mb-3 mb-lg-4">
                      <TextInput
                        name="amount"
                        type="number"
                        required
                        label="Amount"
                        placeholder="Enter amount"
                        value={values.amount}
                        labelClassName={`label-padding-left`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.amount && errors.amount}
                      />
                    </Col>

                    <Col xs={12} className="mb-3 mb-lg-4">
                      <TextInput
                        name="description"
                        type="textarea"
                        rows={5}
                        required
                        label="Description"
                        placeholder="Enter description"
                        value={values.description}
                        labelClassName={`label-padding-left`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.description && errors.description}
                      />
                    </Col>

                    <Col xs={12} className="mb-4">
                      <div className="d-flex gap-3">
                        <CustomButton
                          type="submit"
                          text="Create Plan"
                          loading={createSubscriptionMutation.isPending}
                          className="min-width-220"
                        />
                        <CustomButton
                          type="button"
                          text="Cancel"
                          onClick={() => navigate('/admin/subscription-logs/subscription-plan')}
                          className="btn-secondary min-width-220"
                        />
                      </div>
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

export default withModal(SubscriptionAdd);