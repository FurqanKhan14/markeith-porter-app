import { useMutation } from '@tanstack/react-query';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../../../Components/Common/CustomButton';
import TextInput from '../../../Components/Common/FormElements/TextInput';
import { AuthLayout } from '../../../Components/Layout/AdminLayout/Auth/AuthLayout';
import { usePageTitle } from '../../../Hooks/usePageTitle';
import { sendVerificationCode } from '../../../Services/Auth';
import { showErrorToast } from '../../../Utils/Utils';
import { forgotEmail } from '../../../Utils/Validations/ValidationSchemas';

const ForgetPassword = () => {
  usePageTitle('Forget-Password');
  const [email, setEmail] = useState('ege');
  const navigate = useNavigate();
  const getVerificationCode = useMutation({
    mutationFn: sendVerificationCode,
    onSuccess: () => {
      navigate('/admin/forget-password2', { state: { email } });
    },
    onError: (error) => {
      console.error('Failed to send verification code', error);
      showErrorToast(error);
    },
  });

  const handleSubmit = async (values, actions) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 5000));

      // Mutation call
      setEmail(values.email);
      getVerificationCode.mutate(values);

      // await loginMutation.mutateAsync(values);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      actions.setSubmitting(false); // Very important!
    }
  };

  // const handleSubmit = (values) => {
  //   setEmail(values.email);
  //   getVerificationCode.mutate(values);
  // };

  return (
    <AuthLayout
      authTitle="Forgot Password"
      authParagraph="Enter your email address to receive a verification code"
      backOption={true}
      isAdminAuth={true}
    >
      <Formik
        initialValues={{ email: '' }}
        validationSchema={forgotEmail}
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
          <Form className="">
            <TextInput
              id="email"
              name="email"
              label="Email Address"
              type="email"
              placeholder="Enter Email Address"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && errors.email}
              required
            />
            <div className="mt-5 beechMein">
              <CustomButton
                type="submit"
                onClick={handleSubmit}
                loading={isSubmitting}
                loadingText="Submitting..."
                text="Continue"
                className="w-100"
              />

              {/* <CustomButton
                type="submit"
                text="Continue"
                loading={getVerificationCode.isPending}
                disabled={getVerificationCode.isPending}
              /> */}
            </div>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default ForgetPassword;
