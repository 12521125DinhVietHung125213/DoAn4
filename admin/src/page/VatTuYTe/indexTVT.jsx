import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast, Flip } from 'react-toastify';

export default function IndexThuocVatTu() {
    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/getallTVT");
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
                const response = await axios.get(`http://localhost:5000/api/searchTVT/${searchTerm}`);
                setData(response.data);
            } catch (error) {
                console.error("Error searching data", error);
            }
        }
    };

    const deleteThuocVatTu = (id_thuoc_vat_tu) => {
        if (window.confirm("Bạn có muốn xóa thuốc/vật tư này không?")) {
            axios.delete(`http://localhost:5000/api/deleteTVT/${id_thuoc_vat_tu}`)
                .then(() => {
                    toast.success('Xóa thuốc/vật tư thành công!', {
                        position: "top-right",
                        autoClose: 500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Flip,
                    });
                    setTimeout(() => loadData(), 500);
                })
                .catch(error => console.error("Error deleting data", error));
        }
    }

    return (
        <div className="card shadow mb-4">
            <div className="d-flex align-items-center justify-content-between card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Dữ Liệu Thuốc/Vật Tư</h6>
                <Link to="/CreateTVT" className="btn btn-primary">Thêm thuốc/vật tư</Link>
            </div>
            <div className="d-flex align-items-center card-header">
                <form className="d-none d-sm-inline-block form-inline mr-auto my-2 my-md-0 mw-100 navbar-search">
                    <div className="input-group">
                        <label htmlFor="">Tìm kiếm:</label>
                        <input
                            style={{ marginLeft: '5px' }}
                            onChange={handleSearch}
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="Nhập tên thuốc/vật tư"
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
                                <th>Hình ảnh</th>
                                <th>Tên thuốc/vật tư</th>
                                <th>Số lượng</th>
                                <th>Đơn vị</th>
                                <th>Chi tiết</th>
                                <th>Sửa</th>
                                <th>Xóa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => {
                                return (
                                    <tr key={item.id_thuoc_vat_tu}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <img
                                                style={{ borderRadius: '5px' }}
                                                src={item.hinh_anh}
                                                width='60'
                                                height='60'
                                                alt="Hình ảnh thuốc/vật tư"
                                            />
                                        </td>
                                        <td>{item.ten_thuoc}</td>
                                        <td>{item.so_luong}</td>
                                        <td>{item.don_vi}</td>
                                        <td>
                                            <Link to={`/ViewTVT/${item.id_thuoc_vat_tu}`} className="btn btn-primary">Chi Tiết</Link>
                                        </td>
                                        <td>
                                            <Link to={`/UpdateTVT/${item.id_thuoc_vat_tu}`} className="btn btn-warning">Sửa</Link>
                                        </td>
                                        <td>
                                            <button
                                                type='button'
                                                onClick={() => deleteThuocVatTu(item.id_thuoc_vat_tu)}
                                                className='btn btn-danger'
                                            >
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
