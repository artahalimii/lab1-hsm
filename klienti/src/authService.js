import axios from 'axios';

const API_BASE_URL = 'http://localhost:5038/api/authentication';

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { username, password });
    if (response.status === 200) {
      const { token, role } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      return { success: true, role };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error('Error during login:', error);
    return { success: false };
  }
  
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
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

export const getToken = () => {
  return localStorage.getItem('token');
};

export const getAuthHeader = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Utility function to decode and verify the token
export const decodeToken = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const decoded = JSON.parse(jsonPayload);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      // Token has expired
      return null;
    }

    return decoded;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};
