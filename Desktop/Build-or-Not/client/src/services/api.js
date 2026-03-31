import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const apiClient = axios.create({
  baseURL: API_URL,
});

let authToken = localStorage.getItem('buildornot_token');

export const setAuthToken = (token) => {
  authToken = token;
};

apiClient.interceptors.request.use((config) => {
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

function getErrorMessage(error, fallbackMessage) {
  return error.response?.data?.error || error.message || fallbackMessage;
}

export const signupUser = async ({ name, email, password }) => {
  try {
    const response = await apiClient.post('/auth/signup', { name, email, password });
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'Signup failed. Please try again.'));
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'Login failed. Please try again.'));
  }
};

export const analyzeIdea = async (idea, industry = '') => {
  try {
    const response = await apiClient.post('/analyze', { idea, industry });

    if (response.data && response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data?.error || 'Failed to analyze idea. Please try again.');
    }
  } catch (error) {
    const errorMsg = getErrorMessage(error, 'Network error occurred.');
    throw new Error(errorMsg);
  }
};
