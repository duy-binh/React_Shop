import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCategorys } from '../services/CategorysServices';
import { CheckLogin, CheckAdmin } from '../services/AuthServices';
import { useShoppingContext } from '../context/shoppingContext';
const Header = (_props) => {
    //States lu tru ds dm API
    const [categorys, setCategory] = useState([]);
    const [keyword, setKeyword] = useState([]);
    const [isLogin, setIsLogin] = useState([]);
    const [isADMIN, setIsADMIN] = useState([]);
    const navigate = useNavigate();
    const {cartQuantity}= useShoppingContext();
    // Hook useEffect dc sd de goi  API lay ds dm khi dc component render
    useEffect(() => {
        const fetchedCategorys = async () => {
            try {
                const fetchedCategorys = await getCategorys();
                // Luu tru ds dm tu response vao states
                setCategory(fetchedCategorys);
            }
            catch (error) {
                console.error('Error fetching Categorys: ', error);
            }
        };
        //de lay du lieu khi component dc render
        fetchedCategorys();
        const checkIsLogin = CheckLogin();
        const checkIsAdmin = CheckAdmin();
        setIsLogin(checkIsLogin);
        setIsADMIN(checkIsAdmin);
    }, []);
    const onLogout = () => {
        localStorage.clear();
        // navigat('/')
        window.location.href = '/';
    }
    const onSearch = () => {
        if (keyword.trim()) {
            navigate(`/products?keyword=${keyword}`)
        }
    };
    return (
        <div>
            <header className="p-3 bg-white text-muted">
                <div className="container">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <Link to="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                            <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
                                <use xlinkHref="#bootstrap" />
                            </svg>
                        </Link>

                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li><Link to="/" className="nav-link px-2 text-muted">TRANG CHỦ</Link></li>
                            <li className="nav-item dropdown">
                                <Link to='/products' className="nav-link dropdown-toggle px-2 text-muted" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    CỬA HÀNG
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    {categorys.map((item) => (
                                        <li key={item.id}>
                                            <Link to={`/products?category=${item.id}`} className="dropdown-item">{item.name}</Link>
                                        </li>
                                    ))}

                                </ul>

                            </li>
                            <li><Link to="/about" className="nav-link px-2 text-muted">GIỚI THIỆU</Link></li>
                        </ul>

                        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                            <div className="input-group">
                                <input
                                    type="text"
                                    name="keyword"
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    className="form-control form-control-dark"
                                    aria-label="Search" />
                                <button className="btn btn-outline-warning" onClick={onSearch}  >
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 26 26">
                                        <path d="M 10 0.1875 C 4.578125 0.1875 0.1875 4.578125 0.1875 10 C 0.1875 15.421875 4.578125 19.8125 10 19.8125 C 12.289063 19.8125 14.394531 19.003906 16.0625 17.6875 L 16.9375 18.5625 C 16.570313 19.253906 16.699219 20.136719 17.28125 20.71875 L 21.875 25.34375 C 22.589844 26.058594 23.753906 26.058594 24.46875 25.34375 L 25.34375 24.46875 C 26.058594 23.753906 26.058594 22.589844 25.34375 21.875 L 20.71875 17.28125 C 20.132813 16.695313 19.253906 16.59375 18.5625 16.96875 L 17.6875 16.09375 C 19.011719 14.421875 19.8125 12.300781 19.8125 10 C 19.8125 4.578125 15.421875 0.1875 10 0.1875 Z M 10 2 C 14.417969 2 18 5.582031 18 10 C 18 14.417969 14.417969 18 10 18 C 5.582031 18 2 14.417969 2 10 C 2 5.582031 5.582031 2 10 2 Z M 4.9375 7.46875 C 4.421875 8.304688 4.125 9.289063 4.125 10.34375 C 4.125 13.371094 6.566406 15.8125 9.59375 15.8125 C 10.761719 15.8125 11.859375 15.433594 12.75 14.8125 C 12.511719 14.839844 12.246094 14.84375 12 14.84375 C 8.085938 14.84375 4.9375 11.695313 4.9375 7.78125 C 4.9375 7.675781 4.933594 7.574219 4.9375 7.46875 Z"></path>
                                    </svg>
                                </button>
                            </div>
                        </form>

                        <div className="text-end">
                            {isLogin && (
                                <>
                                    <b className='me-2'>
                                        Xin Chào! {isLogin.name}
                                    </b>
                                </>
                            )}
                            {!isLogin && (
                                <>
                                    <button className="btn btn-secondary me-2">
                                        <Link to="/login" className="nav-link px-2">Đăng Nhập</Link>
                                    </button>
                                    <button className="btn btn-warning">
                                        <Link to="/register" className="nav-link px-2">Đăng Ký</Link>
                                    </button>
                                </>
                            )}
                            {isADMIN && (
                                <>
                                    <button type="button" className="btn btn-secondary dropdown me-2">
                                        <Link to='/' className="nav-link dropdown-toggle px-2 text-white" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Quản Lý
                                        </Link>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <li>
                                                <Link to="/AdminCategoryList" className="dropdown-item">Quản Lý Danh Mục</Link>
                                                <Link to="/AdminProductsList" className="dropdown-item">Quản Lý Sản Phẩm</Link>
                                            </li>
                                        </ul>

                                    </button>
                                </>
                            )}
                            {isLogin && (
                                <>
                                    <button type="button" className="btn btn-warning">
                                        <Link onClick={onLogout} className="nav-link px-2">Đăng Xuất</Link>
                                    </button>
                                </>
                            )}

                            {/* <button type="button" className="btn btn-secondary me-2">
                                <Link to="/login" className="nav-link px-2">Đăng Nhập</Link>
                            </button>
                            <button type="button" className="btn btn-warning">
                                <Link to="/register" className="nav-link px-2">Đăng Ký</Link>
                            </button> */}
                            <Link to="/cart" className="text-black text-decoration-none ms-3 position-relative">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                                </svg>
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {cartQuantity}
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Header;
