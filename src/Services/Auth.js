import axiosInstance from '../Config/axiosConfig';

export const loginCredentials = [
  {
    email: 'admin@gmail.com',
    phone: '+1561555768',
    password: '123456',
    status: true,
    role: 'admin',
    message: 'Login successfully',
    token: '1164|ihHvE9J6cn1U3St4Sk6v6JKOdm2ARA87hXYbIdS63831040a',
    full_name: 'John Wick',
    first_name: 'John',
    last_name: 'Wick',
    'photo-path': 'https://upload.wikimedia.org/wikipedia/commons/b/be/Pep_2017_%28cropped%29.jpg',
    'user-id': 1,
  },
  {
    user_id: 2,
    email: 'user@gmail.com',
    password: '123456',

    phone: '+1561555768',
    status: true,
    role: 'user',
    message: 'Login successfully',
    token: '1165|ihHvE9J6cn1U3St4Sk6v6JKOdm2ARA87hXYbIdS63831040a',
    full_name: 'Tom albert',
    first_name: 'Tom',
    last_name: 'Albert',
    // photo_path: images.UserImage,
  },
  {
    user_id: 3,
    email: 'provider@gmail.com',
    password: '123',
    language: 'spanish',
    relationship: 'Mother',
    phone: '+1561555768',
    status: true,
    role: 'provider',
    message: 'Login successfully',
    token: '1166|ihHvE9J6cn1U3St4Sk6v6JKOdm2ARA87hXYbIdS63831040a',
    full_name: 'Tom albert',
    first_name: 'Tom',
    last_name: '',
    user_name: 'albert',
  },
];

// Business
export const loginUser = async (credentials) => {
  try {
    const response = await axiosInstance.post(
      '/user-api/auth/login',
      credentials
    );
    const {
      data: {
        detail: { token, role, user },
        status,
      },
    } = response;
    return { token, role, user, status }; // Assume this returns the user object
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};
export const logoutUser = async () => {
  try {
    const response = await axiosInstance.post('/user-api/auth/logout');

    if (!response.data.status) {
      throw new Error('Error logging out', response);
    }
    // return { token, role, user, status }; // Assume this returns the user object
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};
export const signUpUser = async (formData) => {
  try {
    const response = await axiosInstance.post(
      '/user-api/auth/register',
      formData
    );

    if (!response.data.status) {
      throw new Error('Error logging out', response);
    }
    // return { token, role, user, status }; // Assume this returns the user object
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};

export const sendVerificationCodeId = async (formData) => {
  try {
    const response = await axiosInstance.post(
      '/user-api/id-recovery/verify-email-user-id',
      formData
    );

    if (!response.data.status) {
      throw new Error('Error sending Verification code', response);
    }
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};
export const verifyVerificationCodeId = async (formData) => {
  try {
    const response = await axiosInstance.post(
      '/user-api/id-recovery/verify-code-user-id',
      formData
    );

    if (!response.data.status) {
      throw new Error('Error verifiying code', response);
    }
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};
// export const sendVerificationCode = async (formData) => {
//   try {
//     const response = await axiosInstance.post(
//       '/user-api/password-recovery/verify-email',
//       formData
//     );

//     if (!response.data.status) {
//       throw new Error('Error sending Verification code', response);
//     }
//   } catch (error) {
//     throw error.response
//       ? error.response.data
//       : { message: 'Unknown error occurred' };
//   }
// };
export const sendVerificationCode = async (formData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ status: true, message: "Dummy verification code sent" });
    }, 1000);
  });
};
export const verifyVerificationCode = async (formData) => {
  try {
    const response = await axiosInstance.post(
      '/user-api/password-recovery/verify-code',
      formData
    );

    if (!response.data.status) {
      throw new Error('Error verifiying code', response);
    }
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};
export const setNewPassword = async (formData) => {
  try {
    const response = await axiosInstance.post(
      '/user-api/password-recovery/update-password',
      formData
    );

    if (!response.data.status) {
      throw new Error('Error verifiying code', response);
    }
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};

export const setUserId = async (id) => {
  try {
    const { data } = await axiosInstance.get(
      `/user-api/auth/suggest-user-ids?user_id=${id}`
    );
    return data.detail; // Assume this returns success obj
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};

// Admin
export const loginAdmin = async (credentials) => {
  // Check mock data first

  try {
    // Mock User Data Fetching Code Start
    const mockUser = loginCredentials.find(
      (u) =>
        (u.role === 'admin' || u.role === 'provider') &&
        u.email === credentials.email &&
        u.password === credentials.password
    );
    if (!mockUser) {
      throw {
        response: {
          data: {
            status: false,
            message: 'Invalid email or password',
          },
        },
      };
    }

    if (mockUser) {
      // Return in the same format as the API response
      return {
        token: mockUser.token,
        role: mockUser.role,
        user: mockUser,
        status: true,
      };
    }
    // Mock User Data Fetching Code End

    /* Working code With API
    const response = await axiosInstance.post(
      '/admin-api/auth/login',
      credentials
    );
    const {
      data: {
        detail: { token, role, user },
        status,
      },
    } = response;
    console.log(user, 'user from loginAdmin');
    return { token, role, user, status }; // Assume this returns the user object
     */
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};

export const logoutAdmin = async () => {
  // Clear mock authentication data
  
  // Working with Moke Data
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
  try {
    /*
    //  working With Api
    const response = await axiosInstance.post('/admin-api/auth/logout');

    if (!response.data.status) {
      throw new Error('Error logging out', response);
    }
      */

    // Working with Moke Data
    return {
      token: null,
      role: null,
      adminDetail: null,
      user: null,
      status: true,
      message: 'User logged out successfully',
    };

    // return { token, role, user, status }; // Assume this returns the user object
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};
