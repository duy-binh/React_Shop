import React from 'react';
import { Field, reduxForm } from 'redux-form';

// Hàm validate để kiểm tra dữ liệu nhập vào
const validate = formValues => {
    const errors = {};
    if (!formValues.name) {
        errors.name = "Bạn cần nhập tên danh mục";
    }
    return errors;
};
// Component props
// handleSubmit: xử lý form, cung cấp bởi Redux
// pristine: Boolean xác định trạng thái form (chưa thay đổi)
// submitting: xét xem trạng thái submit
// initialValues: Object chứa các giá trị ban đầu của Form
let CategoryForm = ({ handleSubmit, pristine, reset, submitting, onSave, onCancel, initialValues }) => {
    console.log(initialValues);
    // Hàm gọi khi form được submit
    const submitForm = (values) => {
        onSave(values);
    };

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit(submitForm)}>
                <div className="mb-3">
                    <label className="form-label">Tên Danh Mục:</label>
                    <Field
                        name="name"
                        component="input"
                        type="text"
                        className="form-control"
                        placeholder="Tên Danh Mục"
                    />
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                    <button
                        type="submit"
                        className="btn btn-primary me-md-2"
                        disabled={pristine || submitting}
                    >
                        Lưu
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={onCancel}
                    >
                        Hủy
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={reset}
                        disabled={pristine || submitting}
                    >
                        Xóa Giá Trị
                    </button>
                </div>
            </form>
        </div>
    );
};

// Kết nối component với Redux-Form
CategoryForm = reduxForm({
    form: 'categoryForm',
    validate
})(CategoryForm);

export default CategoryForm;
