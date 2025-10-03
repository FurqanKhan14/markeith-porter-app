import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import CustomButton from '../../../Components/Common/CustomButton';
// import CustomInput from '../../../Components/CustomInput';
import { useLogin } from '../../../Hooks/useLogin';
import { usePageTitle } from '../../../Hooks/usePageTitle';
import { AuthLayout } from '../../../Components/Layout/AdminLayout/Auth/AuthLayout';
import { adminLoginValidationSchema } from '../../../Utils/Validations/ValidationSchemas';
import './Auth.css';
import TextInput from '../../../Components/Common/FormElements/TextInput';
import { FormCheck } from 'react-bootstrap';

const AdminLogin = () => {
  const loginMutation = useLogin('admin');
  usePageTitle('Admin Login');

  const handleSubmit = async (values, actions, isSubmitting) => {
    console.log("first")
    try {
      await new Promise((resolve) => setTimeout(resolve, 5000));

      // Mutation call
      loginMutation.mutate(values);

      // await loginMutation.mutateAsync(values);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      actions.setSubmitting(false); // Very important!
    }
  };

  return (
    <AuthLayout authTitle="Admin Login" authParagraph="">
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={adminLoginValidationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form className="mt-3 login-form" onSubmit={handleSubmit}>
            <div className="mb-3">
              <TextInput
                id="email"
                name="email"
                label="Email Address"
                type="text"
                placeholder="Enter Email Address"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && errors.email}
                touched={touched.email && errors.email}
                labelClassName="label-padding-left"
                required
              />
            </div>
            <div className="mb-3">
              <TextInput
                id="password"
                name="password"
                label="Password"
                type="password"
                placeholder="Enter Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && errors.password}
                labelClassName="label-padding-left"
                required
              />
            </div>

            <div className="d-flex align-items-center justify-content-between mt-1 flex-wrap gap-sm-0 gap-2">
              <FormCheck
                type={'checkbox'}
                name="rememberMe"
                id="rememberMe"
                label={`Remember Me`}
              />
              <Link
                to={'/admin/forget-password'}
                className="fw-regular text-link forgot-link"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="mt-4 mt-lg-5 text-center">
              <CustomButton
                type="submit"
                loading={isSubmitting}
                loadingText="submitting..."
                text="Login"
                className="w-100"
              />

              {/* <CustomButton
                type="submit"
                text="Login"
                loading={loginMutation.isPending}
                disabled={loginMutation.isPending}
              /> */}
            </div>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default AdminLogin;
