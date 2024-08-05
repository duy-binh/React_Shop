import axios from "axios";

const API_URL = 'http://localhost:5000/products';
//Hàm lấy danh sách sản phẩm từ API
export const getProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching products: ', error);
    throw error;
  }
};
//Hàm lấy 1 sản phẩm từ API
export const getProduct = async (productId) => {
  try {
    const response = await axios.get(`${API_URL}/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products: ', error);
    throw error;
  }
};

export const getProductsByQuery = async (params) => {
  try {
    let query = '';
    if (params.keyword) {
      query = `?keyword=${params.keyword}`;
    } else if (params.category) {
      query = `?category=${params.category}`;
    }
    const response = await axios.get(`${API_URL}${query}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products: ', error);
    throw error;
  }
};

//Hàm lưu sp mới vào API
export const saveProduct = async (product) => {
  try {
    const response = await axios.post(API_URL, product);
    return response.data;
  } catch (error) {
    console.log('Error saving product', error);
    throw error;
  }
}

//Hàm xóa sp mới vào API
export const deleteProduct = async (productID) => {
  try {
    const response = await axios.delete(`${API_URL}/${productID}`);
    return response.data;
  } catch (error) {
    console.log('Error saving product', error);
    throw error;
  }
}

//Hàm lưu sp mới vào API
export const updateProduct = async (productID, updateProduct) => {
  try {
    const response = await axios.put(`${API_URL}/${productID}`,updateProduct);
    return response.data;
  } catch (error) {
    console.log('Error saving product', error);
    throw error;
  }
}