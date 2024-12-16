import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const initialState = {
    ten_thuoc: "",
    id_loai_thuoc: "", 
    so_luong: "",
    don_vi: "",
    gia: "",
    hinh_anh: "",
    ngay_nhap: "",
};

export default function Editthuoc() {
    const [state, setState] = useState(initialState);
    const [file, setFile] = useState(null);
    const { ten_thuoc, id_loai_thuoc, so_luong, don_vi, gia, hinh_anh, ngay_nhap } = state;
    const { id_thuoc_vat_tu } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/getTVTid/${id_thuoc_vat_tu}`)
            .then((resp) => setState({ ...resp.data[0] }))
            .catch((err) => toast.error(err.response.data));
    }, [id_thuoc_vat_tu]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
        setState({ ...state, hinh_anh: `/images/${file.name}` });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formattedDate = new Date(ngay_nhap).toISOString().split('T')[0];

        if (!ten_thuoc || !id_loai_thuoc || !so_luong || !don_vi || !gia || !hinh_anh || !ngay_nhap) {
            toast.error("Vui lòng nhập đầy đủ thông tin");
        } else {
            if (window.confirm("Bạn có muốn cập nhật thông tin?")) {
                axios.put(`http://localhost:5000/api/updateTVT/${id_thuoc_vat_tu}`, {
                    ten_thuoc, id_loai_thuoc, so_luong, don_vi, gia, hinh_anh, ngay_nhap: formattedDate
                })
                .then(() => {
                    setState(initialState);
                    toast.success("Cập nhật thuốc vật tư thành công!");
                    setTimeout(() => navigate("/IndexTVT"), 500);
                })
                .catch((err) => toast.error(err.response.data));
            }
        }
    };

    return (
        <div>
            <h3 className="mb-0">Cập nhật thuốc vật tư</h3>
            <hr />
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="row">
                    <div className="col mb-3">
                        <label className="form-label">Tên thuốc</label>
                        <input type="text" name="ten_thuoc" className="form-control" onChange={handleInputChange} placeholder="Tên thuốc" value={ten_thuoc || ""} />
                    </div>
                    <div className="col mb-3">
                        <label className="form-label">Loại thuốc</label>
                        <input type="number" name="id_loai_thuoc" className="form-control" onChange={handleInputChange} placeholder="ID loại thuốc" value={id_loai_thuoc || ""} />
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-3">
                        <label className="form-label">Số lượng</label>
                        <input type="number" name="so_luong" className="form-control" onChange={handleInputChange} placeholder="Số lượng" value={so_luong || ""} />
                    </div>
                    <div className="col mb-3">
                        <label className="form-label">Đơn vị</label>
                        <input type="text" name="don_vi" className="form-control" onChange={handleInputChange} placeholder="Đơn vị" value={don_vi || ""} />
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-3">
                        <label className="form-label">Giá</label>
                        <input type="number" step="0.01" name="gia" className="form-control" onChange={handleInputChange} placeholder="Giá" value={gia || ""} />
                    </div>
                    <div className="col mb-3">
                        <label className="form-label">Ngày nhập</label>
                        <input type="date" name="ngay_nhap" className="form-control" onChange={handleInputChange} value={ngay_nhap || ""} />
                    </div>
                </div>
                <div className="row">
                    <img style={{ borderRadius: '10px', marginLeft: '10px' }} src={hinh_anh} width='150' height='180' className="img img-responsive" alt={ten_thuoc} />
                    <div className="col mb-3">
                        <label className="form-label">Ảnh thuốc</label>
                        <input type="file" name="hinh_anh" className="form-control" onChange={handleFileChange} placeholder="Ảnh thuốc" />
                    </div>
                </div>
                <div className="row">
                    <div className="d-grid">
                        <button style={{ marginLeft: '10px', marginTop: '30px' }} className="btn btn-warning">Cập nhật</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
