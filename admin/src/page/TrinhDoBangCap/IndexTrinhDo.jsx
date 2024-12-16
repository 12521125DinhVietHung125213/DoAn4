import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast, Flip } from 'react-toastify';

export default function IndexTrinhDo() {
    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/getalltrinhdo");
        setData(response.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleSearch = async (e) => {
        const searchTerm = e.target.value;
        if (!searchTerm) {
            loadData();
        } else {
            try {
                const response = await axios.get(`http://localhost:5000/api/searchtrinhdo/${searchTerm}`);
                setData(response.data);
            } catch (error) {
                console.error("Error searching data", error);
            }
        }
    };

    const deleteTrinhDo = (id_bang_cap) => {
        if (window.confirm("Bạn có muốn xóa trình độ này không?")) {
            axios.delete(`http://localhost:5000/api/deletetrinhdo/${id_bang_cap}`);
            toast.success('Xóa trình độ thành công!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Flip,
            });
            setTimeout(() => loadData(), 500);
        }
    };

    return (
        <div className="card shadow mb-4">
            <div className="d-flex align-items-center justify-content-between card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Dữ Liệu Trình Độ</h6>
                <Link to="/Createtrinhdobs" className="btn btn-primary">Thêm Trình Độ</Link>
            </div>
            <div className="d-flex align-items-center card-header">
                <form className="d-none d-sm-inline-block form-inline mr-auto my-2 my-md-0 mw-100 navbar-search">
                    <div className="input-group">
                        <label htmlFor="">Tìm kiếm :</label>
                        <input 
                            style={{ marginLeft: '5px' }} 
                            type="text" 
                            onChange={handleSearch} 
                            className="form-control form-control-sm" 
                            placeholder="Nhập dữ liệu tìm kiếm" 
                            aria-label="Search" 
                            aria-describedby="basic-addon2" 
                        />
                    </div>
                </form>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên Bằng Cấp</th>
                                <th>Chi Tiết</th>
                                <th>Sửa</th>
                                <th>Xóa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={item.id_bang_cap}>
                                    <td>{index + 1}</td>
                                    <td>{item.ten_bang_cap}</td>
                                    <td>
                                        <Link to={`/Viewtrinhdobs/${item.id_bang_cap}`} type="button" className="btn btn-primary">Chi Tiết</Link>
                                        
                                    </td>
                                    <td>

                                        <Link to={`/Updatetrinhdobs/${item.id_bang_cap}`} type="button" className="btn btn-warning">Sửa</Link>
                                    </td>
                                    <td>
                                        <button 
                                            type="button" 
                                            onClick={() => deleteTrinhDo(item.id_bang_cap)} 
                                            className="btn btn-danger"
                                        >
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
