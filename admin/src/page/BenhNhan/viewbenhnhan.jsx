import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ViewBenhNhan() {
  const [benhNhan, setData] = useState({});
  const { id_benh_nhan } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/getbenhnhan/${id_benh_nhan}`)
      .then((resp) => setData({ ...resp.data[0] }));
  }, [id_benh_nhan]);

  const date = new Date(benhNhan.ngay_sinh);

  const formattedDate = date.toLocaleDateString('en-GB');

  return (
    <div>
      <h3 className="mb-0">Thông tin Bệnh Nhân</h3>
      <hr />
      <div className="row">
      <img style={{ borderRadius: '10px', marginLeft: '10px' }} src={benhNhan.hinh_anh_bn} width='150' height='180' className="img img-responsive"  />
        <div className="col mb-3">
          <label className="form-label">Họ và Tên</label>
          <input type="text" name="ho_ten" className="form-control" placeholder="Họ và Tên" value={benhNhan.ho_ten || ''} readOnly />
        </div>
      </div>

      <div className="row">
        <div className="col mb-3">
          <label className="form-label">Ngày Sinh</label>
          <input type="text" name="ngay_sinh" className="form-control" placeholder="Ngày Sinh" value={formattedDate || ''} readOnly />
        </div>
        <div className="col mb-3">
          <label className="form-label">Giới Tính</label>
          <input type="text" name="gioi_tinh" className="form-control" placeholder="Giới Tính" value={benhNhan.gioi_tinh === 2 ? 'Nữ' : benhNhan.gioi_tinh === 1 ? 'Nam' : ''} readOnly />
        </div>
      </div>

      <div className="row">
        <div className="col mb-3">
          <label className="form-label">Số điện thoại</label>
          <input type="text" name="so_dien_thoai" className="form-control" placeholder="Số điện thoại" value={benhNhan.so_dien_thoai || ''} readOnly />
        </div>
        <div className="col mb-3">
          <label className="form-label">Email</label>
          <input type="text" name="email" className="form-control" placeholder="Email" value={benhNhan.email || ''} readOnly />
        </div>
      </div>

      <div className="row">
        <div className="col mb-3">
          <label className="form-label">Địa chỉ</label>
          <input type="text" name="dia_chi" className="form-control" placeholder="Địa chỉ" value={benhNhan.dia_chi || ''} readOnly />
        </div>
        <div className="col mb-3">
          <label className="form-label">CMND</label>
          <input type="text" name="cmnd" className="form-control" placeholder="CMND" value={benhNhan.cmnd || ''} readOnly />
        </div>
      </div>
    </div>
  );
}
