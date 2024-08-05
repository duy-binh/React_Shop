import React from 'react';
const CategoryTable = ({ category, onEdit, onDeLete }) => {
    console.log(category);
    return (
        <React.Fragment>
            <table className="table align-middle p-5 bg-white">
                <thead>
                    <tr className='bg-danger-subtle'>
                        <th scope="col">TÊN</th>
                        <th scope="col">THAO TÁC</th>
                    </tr>
                </thead>
                <tbody>
                    {category.map(item => (
                        <tr key={item.id} className="align-items-center">
                            <td>{item.name}</td>
                            <td className="text-center">
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
    );
};

export default CategoryTable;
