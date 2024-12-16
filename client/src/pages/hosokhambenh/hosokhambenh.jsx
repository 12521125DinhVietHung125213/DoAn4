import React, { useState, useEffect } from 'react';
import { useUser } from '../../until/userContext';

const MedicalChart = () => {
  const [patientInfo, setPatientInfo] = useState({});
  const [medicalRecords, setMedicalRecords] = useState([]);
  const { user } = useUser(); // Lấy thông tin người dùng từ context

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.getMonth() + 1; // Tháng từ 0 đến 11
    const year = date.getFullYear();

    const monthNames = [
      "tháng 1", "tháng 2", "tháng 3", "tháng 4", 
      "tháng 5", "tháng 6", "tháng 7", "tháng 8", 
      "tháng 9", "tháng 10", "tháng 11", "tháng 12"
    ];

    return `${day} ${monthNames[month - 1]} năm ${year}`;
  };

  useEffect(() => {
    const fetchMedicalRecords = async () => {
      try {
        // Sử dụng id người dùng từ context trong URL API
        const response = await fetch(`http://localhost:5000/patient/${user.id}/medical-records`);
        const data = await response.json();
        
        setPatientInfo(data.patientInfo);
        setMedicalRecords(data.medicalRecords);
      } catch (error) {
        console.error('Error fetching medical records:', error);
      }
    };

    if (user && user.id) { // Kiểm tra xem user và user.id có tồn tại không
      fetchMedicalRecords();
    }
  }, [user]); // Chạy lại effect khi user thay đổi

  return (
    <div className="medical-chart">
      <div className="clinic-header">
        <img 
          src="../Images/Untitled-1.png" 
          alt="Clinic Logo" 
          style={{
            width: '90px',
            height: '60px',
            marginRight: '15px',
            borderRadius: '50%', // nếu bạn muốn logo hình tròn
          }}
        />
        <h1 className="clinic-name">Phòng khám đa khoa Phố Nối</h1>
      </div>

      <h2 className="title">Hồ Sơ Khám Bệnh</h2>
      
      <div className="section">
        <h3>Thông tin bệnh nhân</h3>
        <div className="row">
          <label>Họ và tên:</label>
          <input type="text" value={patientInfo.ho_ten || ''} readOnly />
        </div>
        <div className="row">
          <label>Số điện thoại:</label>
          <input type="text" value={patientInfo.so_dien_thoai || ''} readOnly />
        </div>
        <div className="row">
          <label>Thông tin bảo hiểm:</label>
          <input type="text" value={'Bảo hiểm y tế DKPN'} readOnly />
        </div>
        <div className="row">
          <label>Giới tính:</label>
          <input type="text" value={patientInfo.gioi_tinh || ''} readOnly />
        </div>
        <div className="row">
          <label>Ngày sinh:</label>
          <input type="text" value={formatDate(patientInfo.ngay_sinh) || ''} readOnly />
        </div>
        <div className="row">
          <label>Quê quán:</label>
          <input type="text" value={patientInfo.dia_chi || ''} readOnly />
        </div>
        <div className="row">
          <label>Tình trạng sức khỏe hiện tại:</label>
          <input type="text" value={'Bệnh nhân có biểu hiện ho nhẹ'} readOnly />
        </div>
      </div>

      <div className="section">
        <h3>Ngày khám: {medicalRecords.length > 0 ? formatDate(medicalRecords[0].ngay_lap) : ''}</h3>
      </div>
      <div className="section">
        <h3>Triệu chứng / lý do khám</h3>
        <textarea 
          placeholder="Chưa có thông tin"
          value={medicalRecords.length > 0 ? medicalRecords[0].trieu_chung : ''} 
          readOnly
        ></textarea>
      </div>

      <div className="section">
        <h3>Tiền sử bệnh</h3>
        <textarea 
          placeholder="Chưa có thông tin"
          value={medicalRecords.length > 0 ? medicalRecords[0].tien_su_benh : ''} 
          readOnly
        ></textarea>
      </div>
      <div className="section">
        <h3>Chẩn đoán</h3>
        <textarea 
          placeholder="Chưa có thông tin"
          value={medicalRecords.length > 0 ? medicalRecords[0].chan_doan : ''} 
          readOnly
        ></textarea>
      </div>
      <div className="section">
        <h3>Phương pháp điều trị</h3>
        <textarea 
          placeholder="Chưa có thông tin"
          value={medicalRecords.length > 0 ? medicalRecords[0].phuong_phap_dieu_tri : ''} 
          readOnly
        ></textarea>
      </div>
      <div className="section">
        <h3>Ghi chú</h3>
        <textarea 
          placeholder="Chưa có thông tin"
          value={medicalRecords.length > 0 ? medicalRecords[0].ghi_chu : ''} 
          readOnly
        ></textarea>
      </div>
    </div>
  );
};

export default MedicalChart;
