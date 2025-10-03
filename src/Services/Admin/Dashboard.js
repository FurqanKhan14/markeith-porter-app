import axiosInstance from '../../Config/axiosConfig';
import { dashboardChartDataOne, statsData, userChartDataFormatted, earningChartDataFormatted } from '../../Config/data';
import { buildFormData } from '../../Utils/Utils';

// GET CARD
export const getDashboardData = async (params) => {
  try {
    // Mock data for stats cards according to the image
    const data = statsData;
    return data;
    // If you want to use real API, uncomment the following:
    // const { data } = await axiosInstance.get('/admin-api/account/home', {
    //   params,
    // });
    // return data.detail;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};

// GET USER CHART
export const getUserChart = async (params) => {
  try {
    // Return mock chart data for users in cashBalanceData format
    return userChartDataFormatted;
    
    // If you want to use real API, uncomment the following:
    // const { data } = await axiosInstance.get(`/admin-api/charts/user?role=user&type=${params}`);
    // return data.detail;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};

// GET EARNING CHART
export const getEarningChart = async (params) => {
  try {
    // Return mock chart data for earnings in cashBalanceData format
    return earningChartDataFormatted;
    
    // If you want to use real API, uncomment the following:
    // const { data } = await axiosInstance.get(`/admin-api/charts/payment?type=${params}`);
    // return data.detail;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};

