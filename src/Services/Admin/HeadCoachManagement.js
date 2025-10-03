import axiosInstance from '../../Config/axiosConfig.js';
import { buildFormData } from '../../Utils/Utils.jsx';
import { assistantCoachData, headCoachManagementData, rosterData, subscriptionCoachData, totalEventsData } from '../../Config/data.jsx';

// GET HEAD COACH LISTING
export const getHeadCoachListing = async (params) => {
  try {
    const data  = headCoachManagementData;
    return data.detail; // Assume this returns the listing object
    // const { data } = await axiosInstance.get('/admin-api/head-coaches', {
    //   params,
    // });
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};

// UPDATE HEAD COACH STATUS
export const updateHeadCoachStatus = async (id) => {
  try {
    console.log('Updating head coach status for ID:', id);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));
    console.log('Head coach status updated successfully');
    
    // Return mock success response instead of making actual API call
    return { 
      message: 'Head coach status updated successfully', 
      status: 'success' 
    };
    
    // Commented out actual API call
    // const response = await axiosInstance.post(`/admin-api/head-coaches/${id}/status`);
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

// VIEW HEAD COACH DETAILS
export const viewHeadCoach = async (id) => {
  try {
    // console.log('Fetching head coach details for ID:', id);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    const data  = headCoachManagementData.detail.data.find(u => u.id === Number(id));
    return data;

    
    // Commented out actual API call
    // const { data } = await axiosInstance.get(`/admin-api/head-coaches/${id}`);
    // return data.detail;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};

// GET ASSISTANT COACH LISTING
export const getAssistantCoachListing = async (params) => {
  try {
    console.log('Fetching assistant coach listing with params:', params);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    const data  = assistantCoachData;
    return data.detail;
    
    // Commented out actual API call
    // const { data } = await axiosInstance.get('/admin-api/assistant-coaches', {
    //   params,
    // });
    // return data.detail;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};

// VIEW ASSISTANT COACH DETAILS
export const viewAssistantCoach = async (id) => {
  try {
    console.log('Fetching assistant coach details for ID:', id);
    console.log('Available assistant coaches:', assistantCoachData.detail.data);
    
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // Mock data - replace with actual API call
    const data = assistantCoachData.detail.data.find(u => u.id === Number(id));
    console.log('Found assistant coach data:', data);
    
    if (!data) {
      console.log('Assistant coach not found for ID:', id);
      console.log('Available IDs:', assistantCoachData.detail.data.map(u => u.id));
      throw new Error(`Assistant coach with ID ${id} not found`);
    }
    
    return data;
    
    // Commented out actual API call
    // const { data } = await axiosInstance.get(`/admin-api/assistant-coaches/${id}`);
    // return data.detail;
  } catch (error) {
    console.error('Error in viewAssistantCoach:', error);
    throw error.response
      ? error.response.data
      : { message: error.message || 'Unknown error occurred' };
  }
};

// GET TOTAL EVENTS LISTING
export const getEventsListing = async (params) => {
  try {
    console.log('Fetching total events listing with params:', params);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    // Mock data - replace with actual API call
    const data  = totalEventsData;
    return data.detail;
    
    // Commented out actual API call
    // const { data } = await axiosInstance.get('/admin-api/events', {
    //   params,
    // });
    // return data.detail;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};

// VIEW TOTAL EVENTS DETAILS
export const viewEvents = async (id) => {
  try {
    console.log('Fetching event details for ID:', id);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // Mock data - replace with actual API call
    const data = totalEventsData.detail.data.find(u => u.id === Number(id));
    console.log('Found event data:', data);

    if (!data) {
      console.log('Event not found for ID:', id);
      console.log('Available IDs:', totalEventsData.detail.data.map(u => u.id));
      throw new Error(`Event with ID ${id} not found`);
    }
    
    return data;
    
    // Commented out actual API call
    // const { data } = await axiosInstance.get(`/admin-api/events/${id}`);
    // return data.detail;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};
// EDIT EVENT (GET EVENT FOR EDITING)
export const editEvent = async (id) => {
  try {
    console.log('Fetching event for editing, ID:', id);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // Mock data - replace with actual API call
    const data = totalEventsData.detail.data.find(u => u.id === Number(id));
    console.log('Found event data:', data);
    return data;
    
    // Commented out actual API call
    // const { data } = await axiosInstance.get(`/admin-api/events/${id}/edit`);
    // return data.detail;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};

// UPDATE EVENT
export const updateEvent = async ({ id, eventData }) => {
  try {
    console.log('Updating event:', { id, eventData });
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Event updated successfully');
    
    // Return mock success response
    return { 
      message: 'Event updated successfully', 
      status: 'success',
      data: {
        id: id,
        ...eventData
      }
    };
    
    // Commented out actual API call
    // const response = await axiosInstance.put(`/admin-api/events/${id}`, eventData);
    // return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};



// GET SUBSCRIPTION LISTING
export const getSubscriptionListing = async (params) => {
  try {
    console.log('Fetching subscription listing with params:', params);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    // Mock data - replace with actual API call
    const data  = subscriptionCoachData;
    return data.detail;

    
    // Commented out actual API call
    // const { data } = await axiosInstance.get('/admin-api/subscriptions', {
    //   params,
    // });
    // return data.detail;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};

// GET ROSTER LISTING
export const getRosterListing = async (params) => {
  try {
    console.log('Fetching roster listing with params:', params);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    const data  = rosterData;
    return data.detail;
    
    // Commented out actual API call
    // const { data } = await axiosInstance.get('/admin-api/rosters', {
    //   params,
    // });
    // return data.detail;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};

// VIEW ROSTER DETAILS (Individual Student)
export const viewRoster = async (id) => {
  try {
    console.log('Fetching roster details for ID:', id);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // Mock data - replace with actual API call
    const data = rosterData.detail.data.find(u => u.id === Number(id));
    console.log('Found roster data:', data);
    
    if (!data) {
      console.log('Roster not found for ID:', id);
      console.log('Available IDs:', rosterData.detail.data.map(u => u.id));
      throw new Error(`Student with ID ${id} not found`);
    }
    
    return data;
    
    // Commented out actual API call
    // const { data } = await axiosInstance.get(`/admin-api/rosters/${id}`);
    // return data.detail;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};






