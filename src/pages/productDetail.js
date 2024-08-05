import React, { useEffect, useState } from 'react'
import { getProduct } from '../services/ProductsServices';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await getProduct(id);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error('Lỗi khi tải sản phẩm: ', error);
      }
    };
    fetchProduct();
  }, [id]);


  if (!product) {
    return <div>loading...</div>;
  }
  return (
    <React.Fragment>
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-6 d-flex justify-content-center">
            <img src={`../img/products/${product.img}`} alt={product.name} className="w-400" />
          </div>
          <div className="col-lg-6">
            <h2 className="fw-bold">{product.name}</h2>
            <p className="text-muted">{product.category}</p>
            <h3 className="my-4">{product.price} Đ</h3>

            <div className="d-flex gap-3 mb-4">
              <input type="number" className="form-control" defaultValue="1" min="1" max="10" style={{ maxWidth: '80px' }} />
              <button className="btn btn-outline-danger" type="button">THÊM VÀO GIỎ HÀNG</button>
            </div>
            <h3 className="fw-bold">GIỚI THIỆU SẢN PHẨM</h3>
            <p className="text-muted">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ProductDetail;