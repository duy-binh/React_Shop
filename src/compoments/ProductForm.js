import React, { useEffect, useState } from 'react';
import { getCategorys } from '../services/CategorysServices';
const ProductForm = ({ product, onSave }) => {
  const [formData, setFormData] = useState({ ...product });
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const fetchedCategory = await getCategorys();
        setCategory(fetchedCategory);
      } catch (error) {
        console.error('Error fetching Category: ', error);
      }
    };

    fetchCategory();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="ProductName" className="form-label">Tên:</label>
          <input
            type="text"
            id="ProductName"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ProductCategory" className="form-label">Danh Mục:</label>
          <select
            id="ProductCategory"
            name="category"
            className="form-control"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Chọn danh mục</option> {/* Thêm lựa chọn mặc định */}
            {category.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="ProductPrice" className="form-label">Giá:</label>
          <input
            type="number"
            id="ProductPrice"
            name="price"
            className="form-control"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ProductImg" className="form-label">Hình Ảnh URL:</label>
          <input
            type="text"
            id="ProductImg"
            name="img"
            className="form-control"
            value={formData.img}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ProductDesc" className="form-label">Mô Tả:</label>
          <input
            type="text"
            id="ProductDesc"
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="d-grid gap-2 d-md-flex justify-content-md-start">
          <button type="submit" className="btn btn-primary me-md-2">Thêm Sản Phẩm</button>
          <button type="button" className="btn btn-secondary" onClick={() => {/* Logic hủy bỏ ở đây */}}>Hủy</button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
