import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/ProductsServices';
import { useShoppingContext } from '../context/shoppingContext';
const Home = (_props) => {
    const [products, setProducts] = useState([]);
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };
    const {addCartItem} = useShoppingContext();
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const fetchedProducts = await getProducts();
                setProducts(fetchedProducts);
            } catch (error) {
                console.error('Error fetching products: ', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <React.Fragment>
            <div>
                <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active" data-bs-interval="10000">
                            <img src="../img/banner/bn1.jpg" className="d-block w-100" alt="" />
                        </div>
                    </div>
                </div>
                <br />
                <center><h2>SẢN PHẨM</h2></center>
                <hr />
                <div className="container2 p-3">
                    <div className="row1 bg p-3">
                        {products.map(item => (
                            <div className="box" key={item.id}>
                                <div className="zoom-effect">
                                    <Link to={`/products/${item.id}`}><img src={`../img/products/${item.img}`} alt={item.name} className="w-100" /></Link>
                                </div>
                                <h2 className="text">{item.name}</h2>
                                <span className="price">{formatCurrency(item.price)}</span><br />
                                <button className="btn btn-outline-danger" onClick={( () => addCartItem(item) )}>THÊM VÀO GIỎ</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Home;
