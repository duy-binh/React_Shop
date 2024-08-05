import React, { useState } from 'react'
import { Link } from 'react-router-dom';
const LoginForm = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [formData, setFormData] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target);
    console.log(`${name} - ${value}`);
    setFormData((FormData) => ({ ...FormData, [name]: value }));
  };
  const handleSubmmit = (e) => {
    e.preventDefault();
    onLogin(formData);
  };
  return (
    <div>
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-lg-10">
          <h2 className="fw-bold mb-5 text-center">Đăng Nhập</h2>
          <form onSubmit={handleSubmmit}>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="id">Tên Đăng Nhập</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                formcontrolname="name"                
                placeholder='Input and UserName'
                className="form-control" />
            </div>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="password">Mật khẩu</label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  formcontrolname="password"
                  placeholder='Input and Password'
                  className="form-control"
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                <i class="icon-copy bi bi-eye-fill"></i>
                  <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                </button>
              </div>
            </div>
            <button type="submit" className="btn btn-secondary btn-block mb-4">
              Đăng Nhập
            </button>
            <p className="text-center mb-0 px-2">
              Chưa có tài khoản? <Link to="/register" className='text-decoration-none'>Đăng ký ngay</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
