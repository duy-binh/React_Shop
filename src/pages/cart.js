import React from 'react';
import { Link } from 'react-router-dom';
import { useShoppingContext } from '../context/shoppingContext';

const Cart = () => {
  const { CartItems, totalPrice, upQuantity, downQuantity, removeCartItem, clearCart } = useShoppingContext();

  return (
    <section className="h-100 h-custom" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12">
            <div className="card card-registration card-registration-2">
              <div className="card-body p-0">
                <div className="row g-0">
                  <div className="col-lg-8">
                    <div className="p-5">
                      <div className="d-flex justify-content-between align-items-center mb-5">
                        <h1 className="fw-bold mb-0">GIỎ HÀNG</h1>
                      </div>
                      <hr className="my-4" />

                      {CartItems.length === 0 ? (
                        <p className="text-center">Giỏ hàng của bạn đang trống.</p>
                      ) : (
                        CartItems.map(item => (
                          <div className="row mb-4 d-flex justify-content-between align-items-center" key={item.id}>
                            <div className="col-md-2 col-lg-2 col-xl-2">
                              <img
                                src={`../img/products/${item.img}`} // Corrected image source
                                className="img-fluid rounded-3" alt={item.name} />
                            </div>
                            <div className="col-md-3 col-lg-3 col-xl-3">
                              <h6 className="text-muted">{item.name}</h6>
                              <h6 className="mb-0">{item.price} Đ</h6>
                            </div>
                            <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                              <button className="btn btn-danger" onClick={() => downQuantity(item.id)}>
                                -
                              </button>

                              <input
                                min="0"
                                name="quantity"
                                value={item.quantity}
                                type="number"
                                className="form-control form-control-sm px-1"
                                readOnly
                              />
                              <button className="btn btn-danger" onClick={() => upQuantity(item.id)}>
                                +
                              </button>

                            </div>
                            <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                              <h6 className="mb-0">{item.quantity * item.price} Đ</h6>
                            </div>
                            <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                              <button className="btn btn-danger" onClick={() => removeCartItem(item.id)}>Xóa<i className="fas fa-times"></i></button>
                            </div>
                          </div>
                        ))
                      )}

                      <hr className="my-4" />
                      <div className="pt-5">
                        <h6 className="mb-0">
                          <Link to="/products" className="text-body">Quay lại cửa hàng</Link>
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 bg-body-tertiary">
                    <div className="p-5">
                      <h3 className="fw-bold mb-5 mt-2 pt-1">THÔNG TIN</h3>
                      <hr className="my-4" />
                      <div className="d-flex justify-content-between mb-4">
                        <h5 className="text-uppercase">Tổng</h5>
                        <h5>{totalPrice} Đ</h5>
                      </div>
                      <hr className="my-4" />

                      <div className="d-flex justify-content-between mb-5">
                        <h5 className="text-uppercase">Thành Tiền</h5>
                        <h5>{totalPrice} Đ</h5>
                      </div>
                      <button type="button" className="btn btn-dark btn-block btn-lg" onClick={() => clearCart()}>Thanh Toán</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;
