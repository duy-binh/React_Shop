import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getProducts, getProductsByQuery } from '../services/ProductsServices';
import { useShoppingContext } from '../context/shoppingContext';
const Shop = () => {
    const {addCartItem} = useShoppingContext();
    const [searchParams] = useSearchParams();
    const getQueryParam = (param) => {
        return searchParams.get(param);
    };
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND'
        }).format(amount);
      };
    const category = getQueryParam("category");
    console.log(category);
    const keyword = getQueryParam("keyword");
    console.log(keyword);
    const [product, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let fetchedProducts = [];
                if(category) {
                    fetchedProducts = await getProductsByQuery({ category: category });
                } else if (keyword) {
                    fetchedProducts = await getProductsByQuery({ keyword: keyword });
                } else {
                    fetchedProducts = await getProducts();
                }
                // luu tru ds sp 
                setProducts(fetchedProducts);
            } catch (error) {
                console.error('Error fetching products: ', error);
            }
        };

        fetchProducts();
    }
    
    , [category,keyword]);

    return (
        <React.Fragment>
            <div>       
                <br />
                <center><h2>SẢN PHẨM</h2></center>
                <div className="container2 p-3">
                    <div className="row1 bg p-3">
                        {product.map(item => (
                            <div className="box" key={item.id}>
                                <div className="zoom-effect">
                                    <Link to={`/products/${item.id}`}><img src={`../img/products/${item.img}`} alt={item.name} className="w-100" /></Link>
                                </div>
                                <h2 className="text">{item.name}</h2>
                                <span className="price">{formatCurrency(item.price)}</span><br />
                                <button className="btn btn-outline-danger"  onClick={( () => addCartItem(item) )}>THÊM VÀO GIỎ</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Shop;
