import axiosInstance from '../../Config/axiosConfig.js';
import { buildFormData } from '../../Utils/Utils.jsx';
import { promoManagementData } from '../../Config/data.jsx';

// GET
export const getPromoListing = async (params) => {
  try {
    const data = promoManagementData;
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

export const updatePromo = async (id) => {
  try {
    const response = await axiosInstance.post(`/admin-api/users/${id}`);
    const {
      data: { message, status },
    } = response;
    return { message, status }; // Assume this returns the success object
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};

// DETAILS
export const viewPromo = async (id) => {
  try {
    const data = promoManagementData.detail.data.find(
      (u) => u.id === Number(id)
    );
    return data;

    // const { data } = await axiosInstance.get(`/admin-api/users/${id}`);
    // return data.detail; // Assume this returns success obj
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};

export const deletePromo = async (id) => {
  try {
    const data = promoManagementData.detail.data.find(
      (u) => u.id === Number(id)
    );
    return data;

    // const { data } = await axiosInstance.delete(`/admin-api/users/${id}`);
    // return data.detail; // Assume this returns success obj
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};
