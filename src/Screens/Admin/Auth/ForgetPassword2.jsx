import { useMutation } from '@tanstack/react-query';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomButton from '../../../Components/Common/CustomButton';
import TextInput from '../../../Components/Common/FormElements/TextInput';
import { AuthLayout } from '../../../Components/Layout/AdminLayout/Auth/AuthLayout';
import { showToast } from '../../../Components/Toast/Toast';
import { usePageTitle } from '../../../Hooks/usePageTitle';
import {
  sendVerificationCode,
  verifyVerificationCode,
} from '../../../Services/Auth';
import { showErrorToast } from '../../../Utils/Utils';
import { forgotCode } from '../../../Utils/Validations/ValidationSchemas';

const ForgetPassword2 = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [timer, setTimer] = useState(60);
  const [isDisabled, setIsDisabled] = useState(false);
  const [startCountdown, setStartCountdown] = useState(false);
  const [formData, setFormData] = useState('check');

  usePageTitle('Forget-Password');

  useEffect(() => {
    let countdown;
    if (startCountdown && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsDisabled(false);
      setStartCountdown(false);
      setTimer(60);
    }
    return () => clearInterval(countdown);
  }, [timer, startCountdown]);

  const getVerificationCode = useMutation({
    mutationFn: sendVerificationCode,
    onSuccess: () => {
      setStartCountdown(true);
      showToast('Verification code resent', 'success');
    },
    onError: (error) => {
      console.error('Failed to send verification code', error);
      showErrorToast(error);
    },
  });

  const submitVerificationCode = useMutation({
    mutationFn: verifyVerificationCode,
    onSuccess: () => {
      showToast('Code verified successfully', 'success');
      navigate('/admin/forget-password3', { state: formData });
    },
    onError: (error) => {
      console.error('Failed to verify code', error);
      showErrorToast(error);
    },
  });

  const handleResend = () => {
    if (state.email) {
      setIsDisabled(true);
      getVerificationCode.mutate(state);
    } else {
      console.error('Resend failed');
    }
  };

  const handleSubmit = (values) => {
    const updatedFormData = {
      email: state.email,
      verificationCode: values.verificationCode,
    };
    setFormData(updatedFormData);
          navigate('/admin/forget-password3', { state: updatedFormData });
    // submitVerificationCode.mutate({
    //   email: state.email,
    //   code: values.verificationCode,
    // });
  };

  return (
    <AuthLayout
      authTitle="Forgot Password"
      authParagraph="An email has been sent to you with a verification code. Please enter it here."
      backOption={true}
      adminAuth={true}
    >
      <Formik
        initialValues={{ verificationCode: '' }}
        validationSchema={forgotCode}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          setFieldValue,
          isSubmitting,
        }) => (
          <Form className="mt-3">
            <div className="mb-2">
              <TextInput
                label="Verification Code"
                required
                id="verificationCode"
                type="text"
                placeholder="Enter Verification Code"
                value={values.verificationCode}
                onChange={(e) => {
                  const numericValue = e.target.value
                    .replace(/[^0-9]/g, '')
                    .slice(0, 4);
                  setFieldValue('verificationCode', numericValue);
                }}
                onBlur={handleBlur}
                error={touched.verificationCode && errors.verificationCode}
                labelClassName="label-padding-left"
              />
            </div>
            <div
              className={`d-flex align-items-center mt-2 ${
                isDisabled ? 'justify-content-between ' : 'justify-content-end '
              }`}
            >
              {isDisabled && (
                <p className="m-0 primary-text-color">
                  00:{timer < 10 ? `0${timer}` : timer}
                </p>
              )}
              <button
                type="button"
                onClick={handleResend}
                disabled={isDisabled}
                className="p-0 btn btn-link text-decoration-underline"
                style={{
                  color: isDisabled ? 'gray' : '#0075ff',
                  background: 'none',
                  border: 'none',
                  cursor: isDisabled ? 'not-allowed' : 'pointer',
                }}
              >
                Resend Code
              </button>
            </div>
            <div className="mt-4 beechMein">
              <CustomButton
                type="submit"
                loading={isSubmitting}
                loadingText="Submitting..."
                text="Continue"
                className="w-100"
              />

              {/* <CustomButton
                type="submit"
                text="Continue"
                loading={submitVerificationCode.isPending}
                disabled={submitVerificationCode.isPending}
              /> */}
            </div>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default ForgetPassword2;
