import axiosInstance from '../../Config/axiosConfig.js';
import { buildFormData } from '../../Utils/Utils.jsx';
import { queryManagementData } from '../../Config/data.jsx';

// GET
export const getQueryManagementListing = async (params) => {
  try {
    const data  = queryManagementData;
    // const { data } = await axiosInstance.get('/admin-api/users', {
    //   params,
    // });
    return data.detail; // Assume this returns the listing object
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};

// DETAILS
export const viewQueryManagement = async (id) => {
  try {
    const data = queryManagementData.detail.data.find(u => u.id === Number(id));
    return data;
    
    // const { data } = await axiosInstance.get(`/admin-api/users/${id}`);
    // return data.detail; // Assume this returns success obj


  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};
