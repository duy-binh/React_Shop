import React from 'react'

const ProductsTable = ({ products , onEdit, onDeLete}) => {
    return (
        <React.Fragment>
            <table className="table align-middle p-5 bg-white">
                <thead>
                    <tr className='bg-danger-subtle'>
                        <th scope="col">TÊN</th>
                        <th scope="col">GIÁ</th>
                        <th scope="col">HÌNH ẢNH</th>
                        <th scope="col">THÔNG TIN</th>
                        <th scope="col">THAO TÁC</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(item => (
                        <tr key={item.id} className="align-items-center">
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>
                                <img
                                    src={`../img/products/${item.img}`}
                                    alt={item.name}
                                    className="img-fluid rounded-3"
                                    width="200" // Kích thước có thể thay đổi theo nhu cầu
                                    height="200"
                                />
                            </td>
                            <td>{item.description}</td>
                            <td colSpan="5" className="text-center"> {/* Đặt colSpan cho 5 cột */}
                                <div className="btn-group w-100">
                                    <button type="button" className="btn btn-outline-success w-50" onClick={() => onDeLete(item.id)}>XÓA</button>
                                    <button type="button" className="btn btn-outline-danger w-50" onClick={() => onEdit(item)}>SỬA</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default ProductsTable;
