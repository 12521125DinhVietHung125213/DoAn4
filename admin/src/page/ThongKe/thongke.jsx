import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Thongke() {
  const [tongSoBacSi, setTongSoBacSi] = useState(0);
  const [soLuongChuaXuLy, setSoLuongChuaXuLy] = useState(0);
  const [tongSoBenhNhanTrongThang, setTongSoBenhNhanTrongThang] = useState(0);
  const [soCaKhamHangNgay, setSoCaKhamHangNgay] = useState(0);

  // Lấy tháng và năm hiện tại
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const currentDate = new Date().toISOString().slice(0, 10);

  const fetchTongSoBacSi = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/getallbs');
      setTongSoBacSi(response.data.length);
    } catch (error) {
      console.error("Lỗi khi lấy tổng số bác sĩ:", error);
    }
  };

  const fetchSoLuongChuaXuLy = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/getalllichkham');
      const danhSachLichKham = response.data;
      const countChuaXuLy = danhSachLichKham.filter(lich => lich.trang_thai === 1).length;
      setSoLuongChuaXuLy(countChuaXuLy);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu lịch khám:", error);
    }
  };

  const fetchTongSoBenhNhanTrongThang = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/getallbenhnhan');
      const benhNhanTrongThang = response.data.filter(benhnhan => {
        const ngayVaoKham = new Date(benhnhan.ngay_vao_kham);
        return (
          ngayVaoKham.getMonth() === currentMonth &&
          ngayVaoKham.getFullYear() === currentYear
        );
      });
      setTongSoBenhNhanTrongThang(benhNhanTrongThang.length);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu bệnh nhân:", error);
    }
  };

  const fetchSoCaKhamHangNgay = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/getalllichkham');
      const danhSachLichKham = response.data;
  
      // Lấy ngày hiện tại với định dạng YYYY-MM-DD
      const currentDate = new Date().toISOString().slice(0, 10);
      console.log("Ngày hiện tại:", currentDate);
  
      // Lọc và đếm số ca khám trong ngày hiện tại
      const soCaKhamHomNay = danhSachLichKham.filter(lich => {
        const ngayKham = new Date(lich.ngay_kham).toISOString().slice(0, 10); 
        console.log("Ngày khám:", ngayKham);  // Kiểm tra xem ngayKham có đúng định dạng không
        return ngayKham === currentDate;
      }).length;
  
      setSoCaKhamHangNgay(soCaKhamHomNay);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu ca khám hàng ngày:", error);
    }
  };

  useEffect(() => {
    fetchTongSoBacSi();
    fetchSoLuongChuaXuLy();
    fetchTongSoBenhNhanTrongThang();
    fetchSoCaKhamHangNgay();
  }, []);

  return (
    <div>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Thống kê bệnh viện</h1>
        <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
          <i className="fas fa-download fa-sm text-white-50"></i> In báo cáo
        </a>
      </div>

      <div className="row">
        {/* Tổng số bệnh nhân trong tháng */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Tổng số bệnh nhân (Tháng này)
                  </div>
                  <Link to={'/Indexbenhnhan'}>

                  <div className="h5 mb-0 font-weight-bold text-gray-800">{tongSoBenhNhanTrongThang} bệnh nhân</div>
                  </Link>
                  
                </div>
                <div className="col-auto">
                  <i className="fas fa-user-injured fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tổng số bác sĩ */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    Tổng số bác sĩ
                  </div>
                  <Link to={'/IndexBacSi'}>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{tongSoBacSi} bác sĩ</div>
                  </Link>
                  
                </div>
                <div className="col-auto">
                  <i className="fas fa-user-md fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Số ca khám hàng ngày */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-info shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                    Số ca khám bệnh (Hàng ngày)
                  </div>
                  <Link to={'/indexlichkham'}>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{soCaKhamHangNgay} ca</div>
                  </Link>
                </div>
                <div className="col-auto">
                  <i className="fas fa-hospital fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Yêu cầu cần xử lý */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-warning shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                    Yêu cầu cần xử lý
                  </div>
                  <Link to={'/indexlichkham'}>

                  <div className="h5 mb-0 font-weight-bold text-gray-800">{soLuongChuaXuLy}</div>
                  </Link>
                </div>
                <div className="col-auto">
                  <i className="fas fa-exclamation-circle fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
