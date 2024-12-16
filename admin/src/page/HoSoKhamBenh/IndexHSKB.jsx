import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast, Flip } from 'react-toastify';

export default function IndexHoSoBenhAn() {
    const [data, setData] = useState([]);
    const [benhNhanData, setBenhNhanData] = useState({});

    const loadHoSoData = async () => {
        const response = await axios.get("http://localhost:5000/api/getallhosobenhan");
        setData(response.data);
    };

    const loadBenhNhanData = async () => {
        const response = await axios.get("http://localhost:5000/api/getallbenhnhan");
        const benhNhanMap = response.data.reduce((acc, benhNhan) => {
            acc[benhNhan.id_benh_nhan] = benhNhan.ho_ten;
            return acc;
        }, {});
        setBenhNhanData(benhNhanMap);
    };

    useEffect(() => {
        loadHoSoData();
        loadBenhNhanData();
    }, []);

    const handleSearch = async (e) => {
        const searchTerm = e.target.value;
        if (!searchTerm) {
            loadHoSoData();
        } else {
            try {
                const response = await axios.get(`http://localhost:5000/api/searchhosobenhan/${searchTerm}`);
                setData(response.data);
            } catch (error) {
                console.error("Error searching data", error);
            }
        }
    };



    const deleteHBA = (id_ho_so) => {
        if (window.confirm("Bạn có muốn xóa hồ sơ bệnh án này không?")) {
            axios.delete(`http://localhost:5000/api/deletehosobenhan/${id_ho_so}`)
            .then(() => {
                toast.success('Xóa hồ sơ bệnh án thành công!', {
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
                setTimeout(() => loadHoSoData(), 500);
            })
            .catch((error) => toast.error("Xóa hồ sơ bệnh án thất bại!"));
        }
    };

    return (
        <div className="card shadow mb-4">
            <div className="d-flex align-items-center justify-content-between card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Dữ Liệu Hồ Sơ Bệnh Án</h6>
                <Link to="/CreateHoSoBenhAn" className="btn btn-primary">Thêm Hồ Sơ Bệnh Án</Link>
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
                                <th>Tên Bệnh Nhân</th>
                                <th>Ngày Lập</th>
                                <th>Chẩn Đoán</th>
                                <th>Chi Tiết</th>
                                <th>Sửa</th>
                                <th>Xóa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={item.id_ho_so}>
                                    <td>{index + 1}</td>
                                    {/* Lấy tên bệnh nhân từ benhNhanData */}
                                    <td>{benhNhanData[item.id_benh_nhan] || "Không có tên"}</td>
                                    <td>{new Date(item.ngay_lap).toLocaleDateString('en-GB')}</td>
                                    <td>{item.chan_doan}</td>
                                    <td>
                                        <Link to={`/Viewhosobenhan/${item.id_ho_so}`} className="btn btn-primary">
                                            Chi Tiết
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={`/Updatehosobenhan/${item.id_ho_so}`} className="btn btn-warning">
                                            Sửa
                                        </Link>
                                    </td>
                                    <td>
                                        <button
                                            type="button"
                                            onClick={() => deleteHBA(item.id_ho_so)}
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
