import { createContext, useState, useEffect, useContext } from 'react';
//text một context mới
const ShoppingContext = createContext();
// tạo Hook để sd các Context trong các component 
// Hook này sẽ trả về gtri Context hiện tại
export const useShoppingContext = () => useContext(ShoppingContext);
// Component Provider cung cấp dữ liệu cho các component con
export const ShoppingContextProvider = ({ children }) => {
    // lưu trữ ds sp trong giỏ hàng, lấy từ LocalStorage
    const [CartItems, setCartItems] = useState(() => {
        const jsonCartData = localStorage.getItem('shopping_cart');
        return jsonCartData ? JSON.parse(jsonCartData) : [];
    });

    useEffect(() => {
        localStorage.setItem('shopping_cart', JSON.stringify(CartItems));
    }, [CartItems]);
    //Tính sl sp trong Cart
    const cartQuantity = CartItems.reduce((quantity, item) => item.quantity + quantity, 0);
    // Tính toán tổng tiền trong cart
    const totalPrice = CartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    // tăng sl sản phẩm 
    const upQuantity = (id) => {
        const currenCartItem = CartItems.find(item => item.id === id);
        if (currenCartItem) {
            const newItems = CartItems.map(item => {
                if (item.id === id) {
                    return { ...item, quantity: item.quantity + 1 };
                } else {
                    return item;
                }
            });
            setCartItems(newItems);
        }
    }
    const downQuantity = (id) => {
        const currenCartItem = CartItems.find(item => item.id === id);
        if (currenCartItem) {
            if (currenCartItem.quantity === 1) {
                removeCartItem(id);
            } else {
                const newItems = CartItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 };
                    } else {
                        return item;
                    }
                });
                setCartItems(newItems);
            }

        }
    }
    // addcartItem
    const addCartItem = (product) => {
        const currenCartItem = CartItems.find(item => item.id === product.id);
        if (currenCartItem) {
            const newItems = CartItems.map(item => {
                if (item.id === product.id) {
                    return {...item, quantity: item.quantity + 1 };
                } else {
                    return item;
                }
            });
            setCartItems(newItems);
        } else {
            const newItem ={...product, quantity: 1 };
            setCartItems([...CartItems, newItem]);
        }
        console.log(CartItems);
        // alert('Đã thêm sản phẩm vào giỏ')
    }
    // hàm xóa cart
    const removeCartItem = (id) =>{
        const newItems = CartItems.filter(item => item.id!== id);
        setCartItems(newItems);
    }
    // Hàm xóa toàn bỏ giỏ hàng
    const clearCart = () => {
        setCartItems([]); 
        window.location.href="/";
    };
    // component provider của Context 
    return (
        <ShoppingContext.Provider value={{
            CartItems,
            cartQuantity,
            totalPrice,
            upQuantity,
            downQuantity,
            addCartItem,
            removeCartItem,
            clearCart
        }}>
            {children}
        </ShoppingContext.Provider>
    );
 };
export default ShoppingContext;  // comment này đi để sử dụng useContext