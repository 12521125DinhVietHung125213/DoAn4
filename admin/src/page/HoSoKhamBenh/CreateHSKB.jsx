import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const initialState = {
    id_benh_nhan: "",
    chan_doan: "",
    phuong_phap_dieu_tri: "",
    ghi_chu: "",
    ngay_lap: "",
    tien_su_benh: "",
    trieu_chung: ""
};

export default function CreateHoSoBenhAn() {
    const [state, setState] = useState(initialState);
    const { id_benh_nhan, chan_doan, phuong_phap_dieu_tri, ghi_chu, ngay_lap, tien_su_benh, trieu_chung } = state;

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!id_benh_nhan || !chan_doan || !phuong_phap_dieu_tri || !ngay_lap || !trieu_chung) {
            toast.error("Vui lòng nhập đầy đủ thông tin");
        } else {
            axios.post("http://localhost:5000/api/createhosobenhan", {
                id_benh_nhan, chan_doan, phuong_phap_dieu_tri, ghi_chu, ngay_lap, tien_su_benh, trieu_chung
            }).then(() => {
                setState(initialState);
                toast.success("Thêm hồ sơ bệnh án thành công!");
                setTimeout(() => navigate("/IndexHoSoBenhAn"), 500);
            }).catch((err) => toast.error(err.response.data));
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    return (
        <div>
            <h3 className="mb-0">Thêm Hồ Sơ Bệnh Án</h3>
            <hr />
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <div className="col">
                        <input type="number" name="id_benh_nhan" onChange={handleInputChange} value={id_benh_nhan} className="form-control" placeholder="ID Bệnh Nhân" />
                    </div>
                    <div className="col">
                        <input type="date" name="ngay_lap" onChange={handleInputChange} value={ngay_lap} className="form-control" placeholder="Ngày Lập" />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <input type="text" name="chan_doan" onChange={handleInputChange} value={chan_doan} className="form-control" placeholder="Chẩn Đoán" />
                    </div>
                    <div className="col">
                        <input type="text" name="phuong_phap_dieu_tri" onChange={handleInputChange} value={phuong_phap_dieu_tri} className="form-control" placeholder="Phương Pháp Điều Trị" />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <textarea name="ghi_chu" onChange={handleInputChange} value={ghi_chu} className="form-control" placeholder="Ghi Chú" />
                    </div>
                    <div className="col">
                        <textarea name="tien_su_benh" onChange={handleInputChange} value={tien_su_benh} className="form-control" placeholder="Tiền Sử Bệnh" />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <textarea name="trieu_chung" onChange={handleInputChange} value={trieu_chung} className="form-control" placeholder="Triệu Chứng" />
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
