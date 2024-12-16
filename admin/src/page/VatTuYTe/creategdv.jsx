import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const initialState = {
    ten_thuoc: "",
    gia: "",
    so_luong: "",
    don_vi: "",
    id_loai_thuoc: "",
    ngay_nhap: "",
    hinh_anh: ""
}

export default function CreateThuoc() {

    const [state, setState] = useState(initialState);

    const { ten_thuoc, gia, so_luong, don_vi, id_loai_thuoc, ngay_nhap, hinh_anh } = state;

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!ten_thuoc || !gia || !so_luong || !don_vi || !id_loai_thuoc || !ngay_nhap || !hinh_anh) {
            toast.error("Vui lòng nhập đủ thông tin");
        } else {
            axios.post("http://localhost:5000/api/createTVT", {
                ten_thuoc, gia, so_luong, don_vi, id_loai_thuoc, ngay_nhap, hinh_anh
            }).then(() => {
                setState({
                    ten_thuoc: "", gia: "", so_luong: "", don_vi: "", id_loai_thuoc: "", ngay_nhap: "", hinh_anh: ""
                });
            }).catch((err) => toast.error(err.response.data));
            toast.success("Thêm thuốc thành công!");
            setTimeout(() => navigate("/IndexTVT"), 500);
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setState({ ...state, hinh_anh: `/images/${file.name}` });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    }

    return (
        <div>
            <h3 className="mb-0">Thêm thuốc vào kho</h3>
            <hr />
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="row mb-3">
                    <div className="col">
                        <input type="text" name="ten_thuoc" onChange={handleInputChange} value={ten_thuoc} className="form-control" placeholder="Tên thuốc" />
                    </div>
                    <div className="col">
                        <input type="text" name="gia" onChange={handleInputChange} value={gia} className="form-control" placeholder="Giá" />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <input type="text" name="so_luong" onChange={handleInputChange} value={so_luong} className="form-control" placeholder="Số lượng" />
                    </div>
                    <div className="col">
                        <input type="text" name="don_vi" onChange={handleInputChange} value={don_vi} className="form-control" placeholder="Đơn vị" />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <input type="text" name="id_loai_thuoc" onChange={handleInputChange} value={id_loai_thuoc} className="form-control" placeholder="ID loại thuốc" />
                    </div>
                    <div className="col">
                        <input type="date" name="ngay_nhap" onChange={handleInputChange} value={ngay_nhap} className="form-control" placeholder="Ngày nhập" />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <input type="file" name="hinh_anh" onChange={handleFileChange} className="form-control" placeholder="Hình ảnh thuốc" />
                    </div>
                </div>
                
                <div className="row">
                    <div className="d-grid">
                        <button style={{ marginLeft: '10px' }} type="submit" className="btn btn-primary">Thêm</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
