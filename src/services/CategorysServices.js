import axios from "axios";

const API_URL = 'http://localhost:5000/category';
//Hàm lấy danh sách Danh muc từ API
export const getCategorys = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching categorys: ', error);
    throw error;
  }
};
//Hàm lưu sp mới vào API
export const saveCategory = async (category) => {
  try {
    const response = await axios.post(API_URL, category);
    return response.data;
  } catch (error) {
    console.log('Error saving category', error);
    throw error;
  }
}

//Hàm xóa sp mới vào API
export const deleteCategory = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.log('Error saving category', error);
    throw error;
  }
}

//Hàm lưu sp mới vào API
export const updateCategory = async (id, updatecategory) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`,updatecategory);
    return response.data;
  } catch (error) {
    console.log('Error saving category', error);
    throw error;
  }
}