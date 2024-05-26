import axios from 'axios';

const API_BASE_URL = 'http://localhost:5038/api/authentication';

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { username, password });
    if (response.status === 200) {
      const { token, role } = response.data;
      localStorage.setItem('token', token);
      return { success: true, role };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error('Error during login:', error);
    return { success: false };
  }
};

export const register = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, { username, email, password });
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error during registration:', error);
    return false;
  }
};
