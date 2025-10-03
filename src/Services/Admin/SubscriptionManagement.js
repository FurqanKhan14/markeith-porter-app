import axiosInstance from '../../Config/axiosConfig';
import { buildFormData } from '../../Utils/Utils';
import { subscriptionPlansData, subscriptionLogsData } from '../../Config/data';


// GET SUBSCRIPTION LISTING
export const getSubscriptionListing = async (params) => {
  // console.log(params , 'params');
  try {
    const data = subscriptionLogsData;
    // const { data } = await axiosInstance.get('/admin-api/subscriptions', {
    //   params,
    // });
    return data.detail; // Assume this returns the listing object
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};

// GET SUBSCRIPTION PLANS LISTING
export const getSubscriptionPlansListing = async (params) => {
  
  try {
    const data = subscriptionPlansData;
    // const { data } = await axiosInstance.get('/admin-api/subscription-plans', {
    //   params,
    // });
    return data.detail; // Assume this returns the listing object
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};

// VIEW SUBSCRIPTION PLAN
export const viewSubscriptionPlan = async (id) => {
  try {
    const data = subscriptionPlansData.detail.data.find(plan => plan.id === Number(id));
    return data; // Return with data property to match your component

    // const { data } = await axiosInstance.get(`/admin-api/subscription-plans/${id}`);
    // return data.detail; // Assume this returns success obj
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};

export const updateSubscriptionPlanStatus = async (id, status) => {
  try {
    console.log('Updating status for ID:', id);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));
    console.log('Status updated successfully', status);
    
    // Return mock success response instead of making actual API call
    return { 
      message: 'Status updated successfully', 
      status: 'success' 
    };
    
    // Commented out actual API call
    // const response = await axiosInstance.post(`/admin-api/users/${id}/status, {status}`);
    // const {
    //   data: { message, status },
    // } = response;
    // return { message, status };

  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};

// UPDATE SUBSCRIPTION PLAN
export const updateSubscriptionPlan = async (id, formData) => {
  try {
    const { data } = await axiosInstance.put(`/admin-api/subscription-plans/${id}`, formData);
    return data.detail; // Assume this returns success obj
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};

// INACTIVE SUBSCRIPTION PLAN
export const inactiveSubscriptionPlan = async (id) => {
  try {
    const response = await axiosInstance.post(`/admin-api/subscription-plans/${id}/inactive`);
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

// ACTIVE SUBSCRIPTION PLAN
export const activeSubscriptionPlan = async (id) => {
  try {
    const response = await axiosInstance.post(`/admin-api/subscription-plans/${id}/active`);
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

// CREATE SUBSCRIPTION PLAN
export const createSubscriptionPlan = async (formData) => {
  try {
    const { data } = await axiosInstance.post('/admin-api/subscription-plans', formData);
    return data.detail; // Assume this returns success obj
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
}; 