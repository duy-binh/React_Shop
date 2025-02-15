import React from 'react';

const About = () => {
  return (
    <div>
    <br></br>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h2>Chào mừng đến với thế giới truyện</h2>
          <p>Khám phá những câu chuyện hấp dẫn và thú vị nhất!</p>
          <a href="/products" className="btn btn-light">Xem Ngay</a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-5">
        <div className="container">
          <h2>Về Chúng Tôi</h2>
          <p>Chúng tôi cung cấp một bộ sưu tập đa dạng các thể loại truyện từ lãng mạn, phiêu lưu cho đến huyền bí. Với đội ngũ biên tập viên chuyên nghiệp, chúng tôi cam kết mang đến những tác phẩm chất lượng nhất đến tay độc giả.</p>
        </div>
      </section>

      {/* Genres Section */}
      <section id="genres" className="py-5 bg-light">
        <div className="container">
          <h2>Các Thể Loại Truyện</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="card mb-4">
                <img src="https://product.hstatic.net/200000343865/product/nhung-cau-chuyen-lang-man-2_8c4fbdc672f84659828d3d426468be91.jpg" className="card-img-top" alt="Lãng Mạn" />
                <div className="card-body">
                  <h5 className="card-title">Lãng Mạn</h5>
                  <p className="card-text">Khám phá những câu chuyện tình yêu ngọt ngào.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4">
                <img src="https://bizweb.dktcdn.net/100/370/339/products/23.jpg?v=1579082382580" className="card-img-top" alt="Cổ Tích" />
                <div className="card-body">
                  <h5 className="card-title">Cổ Tích</h5>
                  <p className="card-text">Những cuộc phiêu lưu đầy ý nghĩa.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4">
                <img src="https://upload.wikimedia.org/wikipedia/vi/b/b7/Doraemon1.jpg" className="card-img-top" alt="Kinh Dị" />
                <div className="card-body">
                  <h5 className="card-title">Kinh Dị</h5>
                  <p className="card-text">Những câu chuyện khiến bạn phải rùng mình.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-5">
        <div className="container">
          <h2>Liên Hệ</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Họ Tên</label>
              <input type="text" className="form-control" id="name" required />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" required />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">Tin Nhắn</label>
              <textarea className="form-control" id="message" rows="3" required></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Gửi</button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default About;
