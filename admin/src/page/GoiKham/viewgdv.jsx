import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function Viewgdv() {
    const formatCurrency = (number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
    };

    const [dichVu, setData] = useState({});
    const [khoa, setKhoa] = useState({});  // State lưu thông tin khoa

    const { id_dich_vu } = useParams(); // Tham số lấy từ URL

    useEffect(() => {
        // Lấy thông tin dịch vụ
        axios.get(`http://localhost:5000/api/getgdvid/${id_dich_vu}`)
            .then((resp) => {
                setData({ ...resp.data[0] });
                
                // Sau khi có id_khoa, gọi API để lấy thông tin khoa
                const idKhoa = resp.data[0].id_khoa;
                if (idKhoa) {
                    axios.get(`http://localhost:5000/api/getdmkhoa/${idKhoa}`)
                        .then((khoaResp) => setKhoa(khoaResp.data[0]))
                        .catch((error) => console.error('Lỗi lấy thông tin khoa:', error));
                }
            })
            .catch((error) => console.error('Lỗi lấy thông tin dịch vụ:', error));
    }, [id_dich_vu]);
    console.log(khoa)

    return (
        <div>
            <h3 className="mb-0">Thông tin dịch vụ: {dichVu.ten_dich_vu}</h3>
            <hr />

            <div className="row">
                <img style={{ borderRadius: '10px', marginLeft: '10px' }} src={dichVu.hinh_anh_dv} width='150' height='180' className="img img-responsive" alt={dichVu.ten_dich_vu} />
                <div className="col mb-3">
                    <label className="form-label">Mã dịch vụ</label>
                    <input type="text" name="id_dich_vu" className="form-control" placeholder="Mã dịch vụ" value={id_dich_vu} readOnly />
                </div>
                <div className="col mb-3">
                    <label className="form-label">Giá</label>
                    <input type="text" name="gia" className="form-control" placeholder="Giá" value={formatCurrency(dichVu.gia)} readOnly />
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col mb-3">
                    <label className="form-label">Thông số 1</label>
                    <input type="text" name="thong_so_1" className="form-control" placeholder="Thông số 1" value={dichVu.thong_so_1} readOnly />
                </div>
                <div className="col mb-3">
                    <label className="form-label">Thông số 2</label>
                    <input type="text" name="thong_so_2" className="form-control" placeholder="Thông số 2" value={dichVu.thong_so_2} readOnly />
                </div>
            </div>

            <div className="row">
                <div className="col mb-3">
                    <label className="form-label">Mô tả</label>
                    <textarea className="form-control" name="mo_ta" placeholder="Mô tả" value={dichVu.mo_ta} readOnly></textarea>
                </div>
                    <div className="col mb-3">
                        <label className="form-label">Khoa</label>
                        <input type="text" name="ten_khoa" className="form-control" placeholder="Khoa" value={khoa.ten_khoa} readOnly />
                    </div>
            </div>

        </div>
    );
}
