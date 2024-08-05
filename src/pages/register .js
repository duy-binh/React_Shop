import React from 'react';
// import { Link } from 'react-router-dom';
import ResgiterForm from '../compoments/ResgiterForm';
import { register } from '../services/AuthServices';
const Login = () => {
    const handleResgiter = async (user) => {
        if (user.password !== user.rePassword) {
            alert('Mật khẩu nhập lại không đúng.');
            return console.log('Mat khau khong trung khop');;
        } else {
            if (
                user.name &&
                user.email &&
                user.password &&
                user.rePassword
            ) {
                try {
                    const res = await register(user);
                    console.log(res);
                    let jsonData = JSON.stringify(res);
                    alert('Đăng ký thành công!');
                    console.log(jsonData);
                    localStorage.setItem("register", jsonData);
                    // navigate ('/')
                    window.location.href = "/";
                } catch (error) {
                    console.log('Error deleting products: ', error);
                    alert('Dang ky thanh cong');
                }
            } else {
                alert('Vui lòng điền đầy đien thông tin');
                return console.log('Khong hop le');
            }
        };
    }
        return (
            <div className="card mx-auto shadow-5-strong bg-body-tertiary m-5" style={{ maxWidth: '700px' }}>
                <div className="card-body py-5 px-md-5">
                    <div className="row d-flex justify-content-center align-items-center">
                        <ResgiterForm onResgiter={handleResgiter} />
                    </div>
                </div>
            </div>
        );
    }
export default Login;
