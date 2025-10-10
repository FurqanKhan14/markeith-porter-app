import * as Yup from 'yup';

export const signUpValidationSchema = Yup.object().shape({
  business_name: Yup.string()
    .required('Business Name is required')
    .max(50, 'Business Name must be at most 50 characters'),
  user_name: Yup.string()
    .required('Full Name is required')
    .matches(
      /^[a-zA-Z]+(?: [a-zA-Z]+)*$/,
      'Full Name must contain only letters'
    )
    .max(39, 'Full Name must be at most 39 characters'),
  user_id: Yup.string()
    .required('User ID is required')
    .max(30, 'User ID must be at most 30 characters'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be atleast 8 characters long'),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords do not match')
    .required('Please re-enter your new password'),
});
export const changePasswordValidation = Yup.object().shape({
  current_password: Yup.string().required('Current Password is required'),
  password: Yup.string()
    .required('New Password is required')
    .min(8, 'Password must be atleast 8 characters long'),
  password_confirmation: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords do not match.')
    .label('Confirm Password'),
});
export const loginValidationSchema = Yup.object().shape({
  user_id: Yup.string().required('User ID is required'),
  password: Yup.string()
    // .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});
export const forgotEmail = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email address is required'),
});
export const forgotCode = Yup.object().shape({
  verificationCode: Yup.string()
    .required('Verification code is required')
    .matches(/^\d{4}$/, 'Verification code must be 4 digits'),
});
export const forgotPassword = Yup.object().shape({
  password: Yup.string()
    // .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  password_confirmation: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords do not match')
    .label('Confirm Password'),
});
export const adminLoginValidationSchema = Yup.object().shape({
  email: Yup.string().required('Email is required'),
  password: Yup.string()
    // .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

export const editAdminProfileSchema = Yup.object({
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  email: Yup.string().required('Email is required'),
});

export const changePasswordSchema = Yup.object({
  current_password: Yup.string().required('Current Password is required'),
  password: Yup.string().required('New Password is required'),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords do not match')
    .required('Please re-enter your new password'),
});

export const promoCodeSchema = Yup.object().shape({
  code_name: Yup.string().required('Promocode name is required'),
  code_discount: Yup.number()
    .typeError('Discount must be a number')
    .required('Discount is required')
    .min(1, 'Minimum 1%')
    .max(100, 'Maximum 100%'),
});

export const SubscriptionValidationSchema = Yup.object().shape({
  subscription_title: Yup.string().required('Subscription Title is required'),
  type: Yup.string().required('Type is required'),
  duration: Yup.string().required('Duration is required'),
  amount: Yup.number()
    .typeError('Amount must be a number')
    .required('Amount is required')
    .positive('Amount must be greater than zero'),
  description: Yup.string().required('Description is required'),
});

export const eventEditValidationSchema = Yup.object().shape({
  event_name: Yup.string().required('Event name is required'),
  event_date: Yup.date().required('Event date is required'),
  event_start_time: Yup.string().required('Start time is required'),
  event_end_time: Yup.string().required('End time is required'),
  duration: Yup.string().required('Duration is required'),
  location: Yup.string().required('Location is required'),
  assigned_to: Yup.string().required('Assigned to is required'),
  equipment: Yup.string().required('Equipment is required'),
  attendance_required: Yup.boolean().required(
    'Attendance required is required'
  ),
  event_focus: Yup.string().required('Event focus is required'),
});

export const addLoaderValidation = Yup.object().shape({
  first_name: Yup.string()
    .trim()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name cannot exceed 50 characters')
    .required('First name is required'),

  last_name: Yup.string()
    .trim()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name cannot exceed 50 characters')
    .required('Last name is required'),

  email: Yup.string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email address is required'),

  // phone_number: Yup.string()
  //   .required('Phone number is required')
  //   .matches(/^[0-9]{6,15}$/, 'Phone number must be between 6 and 15 digits'),

  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(
      /[@$!%*?&#]/,
      'Password must contain at least one special character (@, $, !, %, *, ?, & or #)'
    ),

  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

export const addSubAdminValidation = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters')
    .required('Name is required'),

  email: Yup.string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email address is required'),

  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(
      /[@$!%*?&#]/,
      'Password must contain at least one special character (@, $, !, %, *, ?, & or #)'
    ),

  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),

  privileges: Yup.object()
    .test(
      'has-some-privilege',
      'At least one privilege must be selected',
      (value) => {
        if (!value) return false;
        // Check if at least one privilege (view or action) is true
        return Object.values(value).some(
          (mod) => mod.view || mod.action
        );
      }
    )
    .required('Privileges are required'),
});
export const editSubAdminValidation = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters')
    .required('Name is required'),

  email: Yup.string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email address is required'),




  privileges: Yup.object()
    .test(
      'has-some-privilege',
      'At least one privilege must be selected',
      (value) => {
        if (!value) return false;
        // Check if at least one privilege (view or action) is true
        return Object.values(value).some(
          (mod) => mod.view || mod.action
        );
      }
    )
    .required('Privileges are required'),
});