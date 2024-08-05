import React from 'react';
// import { Link } from 'react-router-dom';
import LoginForm from '../compoments/LoginForm';
// import ResgiterForm from '../compoments/ResgiterForm';
import { login} from '../services/AuthServices';
const Login = () => {

    const handleLogin = async (user) => {
        if (user.name && user.password) {
            try {
                const res = await login(user);
                console.log(res);
                alert('Đăng Nhập Thành Công')
                let jsonData = JSON.stringify(res);
                // console.log(jsonData);
                localStorage.setItem("login", jsonData);
                // navigate ('/')
                window.location.href = "/";
                
            } catch (error) {
                console.error('Error fetching products: ', error);
                alert('Tên đăng nhập hoặc mật khẩu không chính xác.');
            }
        }
    };
//     const handleLogin = async (user) => {
//     if (user.name && user.password) {
//         try {
//             const res = await login(user);
//             console.log('Login response:', res);
            
//             if (res && res.data) {
//                 let jsonData = JSON.stringify(res.data);
//                 localStorage.setItem("login", jsonData);
//                 alert('Đăng Nhập Thành Công');
//                 // navigate('/')
//                 window.location.href = "/";
//             } else {
//                 console.error('Response or data is undefined:', res);
//                 alert('Không có dữ liệu phản hồi từ máy chủ.');
//             }
//         } catch (error) {
//             console.error('Error fetching products: ', error);
//             alert('Tên đăng nhập hoặc mật khẩu không chính xác.');
//         }
//     }
// };

        return (
            <div className="card mx-auto shadow-5-strong bg-body-tertiary m-5" style={{ maxWidth: '700px' }}>
                <div className="card-body py-5 px-md-5">
                    <div className="row d-flex justify-content-center align-items-center">
                        <LoginForm onLogin={handleLogin} />
                    </div>
                </div>
            </div>
        );
    }
export default Login;
