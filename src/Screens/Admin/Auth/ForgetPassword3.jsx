import { Form, Formik } from 'formik';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomButton from '../../../Components/Common/CustomButton';
import TextInput from '../../../Components/Common/FormElements/TextInput';
import { AuthLayout } from '../../../Components/Layout/AdminLayout/Auth/AuthLayout';
import { showToast } from '../../../Components/Toast/Toast';
import withModal from '../../../HOC/withModal';
import { usePageTitle } from '../../../Hooks/usePageTitle';
import { forgotPassword } from '../../../Utils/Validations/ValidationSchemas';

const ForgetPassword3 = ({ showModal, closeModal, ...props }) => {
  usePageTitle('Forget-Password');
  const { state } = useLocation();
  const { email, verificationCode } = state || {};
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  /*
  const submitUpdatePassword = useMutation({
    mutationFn: setNewPassword,
    onSuccess: () => {
      showToast('Password was reset', 'success');
      showModal(
        'Password Reset Successful',
        'Your password has been updated. You can now log in with your new password.',
        null,
        'success',
        () => navigate('/admin/login')
      );
    },
    onError: (error) => {
      console.error('Failed to send confirm Password', error);
      if (!isNullOrEmpty(error.errors?.password)) {
        showToast(error.errors.password[0], 'error');
      }
    },
  });
  const handleSubmit = (values) => {
    submitUpdatePassword.mutate({
      email,
      code: verificationCode,
      password: values.password,
      password_confirmation: values.password_confirmation,
    });
  };
  */
  const handleSubmit = (values) => {
    // Optionally validate values here
    showToast('Password was reset', 'success');
    showModal('', 'Your password has been Updated', null, 'success', () =>
      navigate('/admin/login')
    );
    console.log(values, 'values on Submit');
  };

  return (
    <AuthLayout
      authTitle="Password Recovery"
      authMain
      authParagraph="Set a New Password for Your Account"
      backOption={true}
      adminAuth={true}
    >
      <Formik
        initialValues={{ password: '', password_confirmation: '' }}
        validationSchema={forgotPassword}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting,
        }) => (
          <Form className="mt-3">
            <div className="mb-3">
              <TextInput
                label="New Password"
                required
                id="password"
                type="password"
                placeholder="Enter New Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && errors.password}
                labelClassName="label-padding-left"
              />
            </div>
            <div className="mb-3">
              <TextInput
                label="Confirm Password"
                required
                id="password_confirmation"
                type="password"
                placeholder="Enter Confirm Password"
                value={values.password_confirmation}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.password_confirmation && errors.password_confirmation
                }
                labelClassName="label-padding-left"
              />
            </div>

            <div className="mt-4 beechMein">
              <CustomButton
                type="submit"
                loading={loading || isSubmitting}
                loadingText="Submitting..."
                text="Update"
                className="w-100"
              />

              {/* <CustomButton
                type="submit"
                text="Update"
                loading={submitUpdatePassword.isPending}
                disabled={submitUpdatePassword.isPending}
              /> */}
            </div>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default withModal(ForgetPassword3);
