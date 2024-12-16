import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast, Flip } from 'react-toastify';

export default function IndexBacSi() {
    const [data, setData] = useState([]);
    const [dmKhoaList, setDmKhoaList] = useState([]);

    const loadData = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/getallbs");
            setData(response.data);
        } catch (error) {
            console.error("Error fetching bác sĩ data:", error);
        }
    };

    const loadDmKhoa = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/getalldmkhoa");
            setDmKhoaList(response.data);
        } catch (error) {
            console.error("Error fetching danh mục khoa data:", error);
        }
    };

    useEffect(() => {
        loadData();
        loadDmKhoa();
    }, []);

    const handleSearch = async (e) => {
        const searchTerm = e.target.value;
        if (!searchTerm) {
            loadData();
        } else {
            try {
                const response = await axios.get(`http://localhost:5000/api/searchbacsi/${searchTerm}`);
                setData(response.data);
            } catch (error) {
                console.error("Error searching data", error);
            }
        }
    };

    const deleteNV = (id_bac_si) => {
        if (window.confirm("Bạn có muốn xóa nhân viên này không?")) {
            axios.delete(`http://localhost:5000/api/deletebacsi/${id_bac_si}`)
                .then(() => {
                    toast.success('Xóa nhân viên thành công!', {
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
                    loadData();
                })
                .catch((err) => console.error("Error deleting bác sĩ:", err));
        }
    };

    const getTenKhoaById = (id_khoa) => {
        const khoa = dmKhoaList.find(k => k.id_khoa === id_khoa);
        return khoa ? khoa.ten_khoa : "N/A";
    };

    return (
        <div className="card shadow mb-4">
            <div className="d-flex align-items-center justify-content-between card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Dữ Liệu Bác Sĩ</h6>
                <Link to="/CreateBacSi" className="btn btn-primary">Thêm Bác Sĩ</Link>
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
                            placeholder="nhập dữ liệu tìm kiếm"
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
                                <th>Hình Ảnh</th>
                                <th>Tên bác sĩ</th>
                                <th>Chuyên Khoa</th>
                                <th>Chi tiết</th>
                                <th>Sửa</th>
                                <th>Xóa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={item.id_bac_si}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <img
                                            style={{ borderRadius: '5px' }}
                                            src={item.hinh_anh_bs}
                                            width='60'
                                            height='60'
                                            className="img img-responsive"
                                            alt="Bác sĩ"
                                        />
                                    </td>
                                    <td>{item.ho_ten}</td>
                                    <td>{getTenKhoaById(item.id_khoa)}</td>
                                    <td>
                                        <Link to={`/ViewBacSi/${item.id_bac_si}`} type="button" className="btn btn-primary">
                                            Chi Tiết
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={`/UpdateBacSi/${item.id_bac_si}`} className="btn btn-warning">
                                            Sửa
                                        </Link>
                                    </td>
                                    <td>
                                        <button
                                            type='button'
                                            onClick={() => deleteNV(item.id_bac_si)}
                                            className='btn btn-danger'>
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
