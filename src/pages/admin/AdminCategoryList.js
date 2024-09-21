import React, { useEffect, useState } from 'react';
import { deleteCategory, getCategorys, saveCategory, updateCategory } from '../../services/CategorysServices';
import CategoryTable from '../../compoments/CategoryTable';
import CategoryForm from '../../compoments/CategoryForm';
const AdminCategoryList = () => {
    const [category, setCategorys] = useState([]);
    const [editingCategory, setEditingCategory] = useState(null);
    console.log(category)
    useEffect(() => {
        const fetchCategorys = async () => {
            try {
                const fetchedCategorys = await getCategorys();
                setCategorys(fetchedCategorys);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách Danh Mục: ', error);
            }
        };
        fetchCategorys();
    }, [editingCategory]);
    // Hàm thêm Danh Mục mới
    const HandleNewCategory = () => {
        setEditingCategory({ id: null, name: "" });
        console.log('add new Category', editingCategory);
    };
    //Hàm Hủy
    const handleCancel = () => {
        setEditingCategory(null);
        console.log('cancel Category', editingCategory);
    };
    // Hàm xử lý sửa Danh Mục
    const handleEdit = (Category) => {
        setEditingCategory(Category);
        console.log('Edit Category', editingCategory);
    };
    // Hàm xử lý xóa Danh Mục
    const handleDelete = async (id) => {
        try {
            await deleteCategory(id);
            setCategorys(category.filter((Category) => Category.id !== id));
        } catch (error) {
            console.error("Error deleting Category", error);
        }
    };
    const handleSave = async (cate) => {
        try {
            if (cate.id) {
                // Cập nhật danh mục hiện có
                await updateCategory(cate.id, cate);
                // Cập nhật lại state của danh mục
                setCategorys(category.map((c) => (c.id === cate.id ? cate : c)));
            } else {
                // Thêm danh mục mới
                const newCategory = await saveCategory(cate);
                setCategorys([...category, newCategory]);
                window.location.href = "/AdminCategoryList";
            }
        } catch (error) {
            console.error("Lỗi khi lưu danh mục:", error);
        }
        // Đặt editingCategory về null sau khi lưu
        setEditingCategory(null);
    };

    return (
        <React.Fragment>
            <button onClick={HandleNewCategory} className="btn btn-primary float-end me-3 m-1">Thêm Danh Mục</button><br></br>
            {editingCategory && (
                <CategoryForm
                    initialValues={editingCategory}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            )}
            <div className="container d-flex justify-content-center my-4">
                <CategoryTable
                    category={category}
                    onEdit={handleEdit}
                    onDeLete={handleDelete}
                />
            </div>
        </React.Fragment>
    );
};

export default AdminCategoryList;
