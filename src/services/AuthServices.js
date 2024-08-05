import axios from "axios";

const API_URL = 'http://localhost:5000';

export const CheckLogin = () => {
  let jsonData = localStorage.getItem('login');
  if (jsonData) {
    return JSON.parse(jsonData);
  }
  return false;
}

export const CheckAdmin = () => {
  let jsonData = localStorage.getItem('login');
  // console.log(jsonData);
  if (jsonData) {
    // const user = JSON.parse(jsonData);
    // if (user.admin === true) {
    //   return user;
    // }
    if(jsonData) {
      if(JSON.parse(jsonData).name === 'admin') {
        return JSON.parse(jsonData);
      }
    }
    console.log();
  }
  return false;
}
// Login
export const login = async (body) => {
  try {
    const response = await axios.post(`${API_URL}/login`, body);
    return response.data; 
  } catch (error) {
    console.error('Error logging in: ', error);
    throw error;
  }
};

// Đăng ký
export const register = async (body) => {
  try {
    const response = await axios.post(`${API_URL}/register`, body);
    return response.data; 
  } catch (error) {
    console.error('Error registering user: ', error);
    throw error;
  }
};
