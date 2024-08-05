import React from 'react'
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <div>
       <footer>
       <div className="container">
    <footer className="py-3 my-4">
      <ul className="nav justify-content-center border-bottom pb-3 mb-3">
        <li className="nav-item"><Link to='/' className="nav-link px-2 text-muted">TRANG CHỦ</Link></li>
        <li className="nav-item"><Link to='/' className="nav-link px-2 text-muted">GIỚI THIỆU</Link></li>
        <li className="nav-item"><Link to='/' className="nav-link px-2 text-muted">CỬA HÀNG</Link></li>
        <li className="nav-item"><Link to='/' className="nav-link px-2 text-muted">LIÊN HỆ & HỖ TRỢ</Link></li>
      </ul>
      <p className="text-center text-muted">© 2024 By Duy Binh</p>
    </footer>
  </div>
  </footer>
    </div>
  )
}

export default Footer
