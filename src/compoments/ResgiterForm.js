import React, { useState } from 'react'
// import { Link } from 'react-router-dom';
const ResgiterForm = ({ onResgiter }) => {
    const [formData, setFormData] = useState([]);
    console.log(formData);
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(e.target);
        setFormData((FormData) => ({ ...FormData, [name]: value }));
    };

    const handleSubmmit = (e) => {
        e.preventDefault();
        onResgiter(formData);
    };
    return (
        <div>
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-lg-10">
                    <h2 className="fw-bold mb-5 text-center">Đăng Ký</h2>
                    <form onSubmit={handleSubmmit}>
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="name">Họ Và Tên</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="VD: Nguyen Van A"
                                className="form-control"
                                autoComplete="name"
                            />
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="email">Email</label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="VD: nguyenvana@gmail.com"
                                className="form-control"
                                autoComplete="email"
                            />
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="password">Mật Khẩu</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="VD: mật khẩu của bạn"
                                className="form-control"
                                autoComplete="new-password"
                            />
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="rePassword">Nhập lại Mật Khẩu</label>
                            <input
                                type="password"
                                id="rePassword"
                                name="rePassword"
                                value={formData.rePassword}
                                onChange={handleChange}
                                placeholder="VD: mật khẩu của bạn"
                                className="form-control"
                                autoComplete="new-password"
                            />
                        </div>
                        <button type="submit" className="btn btn-secondary btn-block mb-4">
                            Tạo Tài Khoản
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResgiterForm ;
