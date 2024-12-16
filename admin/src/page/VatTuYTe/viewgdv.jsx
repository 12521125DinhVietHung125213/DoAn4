import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function ViewThuocVatTu() {
    const formatCurrency = (number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
    };

    const [thuocVatTu, setData] = useState({});

    const { id_thuoc_vat_tu } = useParams(); // Change variable name for clarity

    useEffect(() => {
        axios.get(`http://localhost:5000/api/getTVTid/${id_thuoc_vat_tu}`)
            .then((resp) => setData({ ...resp.data[0] }));
    }, [id_thuoc_vat_tu]);

    return (
        <div>
            <h3 className="mb-0">Thông tin thuốc/vật tư: {thuocVatTu.ten_thuoc}</h3>
            <hr />

            <div className="row">
                <img style={{ borderRadius: '10px', marginLeft: '10px' }} src={thuocVatTu.hinh_anh} width='150' height='180' className="img img-responsive" alt={thuocVatTu.ten_thuoc} />
                <div className="col mb-3">
                    <label className="form-label">Mã thuốc/vật tư</label>
                    <input type="text" name="id_thuoc_vat_tu" className="form-control" placeholder="Mã thuốc/vật tư" value={id_thuoc_vat_tu} readOnly />
                </div>
                <div className="col mb-3">
                    <label className="form-label">Giá</label>
                    <input type="text" name="gia" className="form-control" placeholder="Giá" value={formatCurrency(thuocVatTu.gia)} readOnly />
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col mb-3">
                    <label className="form-label">Số lượng</label>
                    <input type="text" name="so_luong" className="form-control" placeholder="Số lượng" value={thuocVatTu.so_luong} readOnly />
                </div>
                <div className="col mb-3">
                    <label className="form-label">Đơn vị</label>
                    <input type="text" name="don_vi" className="form-control" placeholder="Đơn vị" value={thuocVatTu.don_vi} readOnly />
                </div>
            </div>
            <div className="row">
                <div className="col mb-3">
                    <label className="form-label">Loại thuốc</label>
                    <input type="text" name="id_loai_thuoc" className="form-control" placeholder="Loại thuốc" value={thuocVatTu.id_loai_thuoc} readOnly />
                </div>
                <div className="col mb-3">
                    <label className="form-label">Ngày nhập</label>
                    <input type="text" name="ngay_nhap" className="form-control" placeholder="Ngày nhập" value={thuocVatTu.ngay_nhap} readOnly />
                </div>
            </div>
        </div>
    );
}
