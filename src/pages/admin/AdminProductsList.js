import React, { useEffect, useState } from 'react';
import { deleteProduct, getProducts, saveProduct, updateProduct } from '../../services/ProductsServices';
import ProductsTable from '../../compoments/ProductsTable';
import ProductForm from '../../compoments/ProductForm';
const AdminProductsList = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    console.log(products)
    console.log('Khởi Chạy', editingProduct);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const fetchedProducts = await getProducts();
                setProducts(fetchedProducts);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách sản phẩm: ', error);
            }
        };

        fetchProducts();
    }, []);
    // Hàm thêm sp mới
    const HandleNewProduct = () => {
        setEditingProduct({ id: null, name: "", price: "", img: "", description: "", category: "" });
        console.log('add new product', editingProduct);
    };
    // Hàm xử lý sửa sp
    const handleEdit = (product) => {
        setEditingProduct(product);
        console.log('Edit product', editingProduct);
    };
    // Hàm xử lý xóa sp
    const handleDelete = async (id) => {
        try {
            await deleteProduct(id);
            setProducts(products.filter((product) => product.id !== id));
        } catch (error) {
            console.error("Error deleting product", error);
        }
    };

    //Hàm xử lý lưu thông tin sp 
    const HandleSave = async (product) => {
        if (product.id) {
            try {
                await updateProduct(product.id, product);
                //cập nhật lại state products 
                setProducts(products.map((p) => (p.id = product.id ? product : p)));

                window.location.href = "/AdminProductsList";
            }
            catch (error) {
                console.error("Error adding product", error);
            }
        }
        else {
            try {
                const newProduct = await saveProduct(product);
                setProducts([...products, newProduct]);
                window.location.href = "/AdminProductsList";
            } catch (error) {
                console.error("Error adding product", error);
            }
        }
    }
    return (
        <React.Fragment>
            <button onClick={HandleNewProduct} className="btn btn-primary float-end me-3 m-1">Thêm Sản Phẩm</button><br></br>
            {editingProduct && (
                <ProductForm
                    product={editingProduct}
                    onSave={HandleSave}
                    onCancel={() => setEditingProduct(null)}
                />
            )}
            <div className="container d-flex justify-content-center my-4">

                <ProductsTable
                    products={products}
                    onEdit={handleEdit}
                    onDeLete={handleDelete}
                />
            </div>
        </React.Fragment>
    );
};

export default AdminProductsList;
