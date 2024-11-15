import axios from "axios";

export const api = axios.create({
    baseURL: "https://cloudzilla-file-storage.onrender.com",
    withCredentials: true
})

export const asyncWrapper = async (apiCall) => {
  try {
    const response = await apiCall();
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 2xx
      throw new Error(error.response.data.message || 'An error occurred');
    } else if (error.request) {
      // Request was made, but no response received
      throw new Error('No response from server');
    } else {
      // Something else happened
      throw new Error(error.message);
    }
  }
};