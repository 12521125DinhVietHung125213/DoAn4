import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../until/userContext';
import { toast } from 'react-toastify';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    phone: '',
    dateOfBirth: '',
    fullName: '',
    customerID: '',
    gender: '',
    nationality: 'VIET NAM (Việt Nam)',
    city: '',
    district: '',
    ward: '',
    address: '',
  });
  const {user} = useUser();
  const [errors, setErrors] = useState({ fullName: '', phone: '' });

  const navigate = useNavigate(); // Sử dụng useNavigate thay cho useHistory

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateInput(name , value)
  };
  console.log(formData.gender)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const appointmentData = JSON.parse(localStorage.getItem('appointmentData')); // Retrieve appointment data

    const fullAddress = `${formData.address}, ${formData.ward}, ${formData.district}, ${formData.city}`;

    const completeData = {
      id_benh_nhan: user.id, // Lấy thông tin bệnh nhân từ appointmentData
      id_bac_si: appointmentData.selectedDoctor, // Lấy thông tin bác sĩ từ appointmentData
      id_phong_kham: 1, // Lấy thông tin phòng khám từ appointmentData
      id_dich_vu: null, // Lấy thông tin dịch vụ từ appointmentData
      ngay_dat_lich:new Date().toISOString().split('T')[0],  // Lấy ngày hôm nay và định dạng: YYYY-MM-DD
      ngay_kham: appointmentData.appointmentDate, // Lấy thông tin ngày khám từ appointmentData
      gio_kham: appointmentData.appointmentTime, // Lấy thông tin giờ khám từ appointmentData
      ghi_chu: appointmentData.healthCondition, // Ghi chú cố định, bạn có thể thay đổi nếu cần
      ho_ten_bn: formData.fullName, // Họ tên bệnh nhân
      sdt_bn: formData.phone, // Số điện thoại bệnh nhân
      dia_chi_bn: fullAddress, // Địa chỉ bệnh nhân
      ngay_sinh: formData.dateOfBirth, // Ngày sinh
      chuyen_khoa: appointmentData.selectedSpecialty ,// Lấy thông tin chuyên khoa từ appointmentData,
      trang_thai:1,
      gioi_tinh:formData.gender,
    };

    // Log data to console to check if all required fields are filled
    console.log('Complete Data:', completeData);

    const requiredFields = ['sdt_bn', 'ngay_sinh', 'ho_ten_bn', 'dia_chi_bn', 'id_bac_si'];
    const missingFields = requiredFields.filter(field => !completeData[field]);

    if (missingFields.length > 0) {
      console.log('Missing fields:', missingFields);
      
      return;
    }

    // Xác nhận trước khi đặt lịch
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn đặt lịch không?");
    if (!isConfirmed) return; // Dừng nếu người dùng không đồng ý

    try {
      const response = await fetch('http://localhost:5000/api/addAppointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(completeData),
      });

      if (!response.ok) {
        const errorMessage = await response.text(); // Lấy thông điệp lỗi từ server
        throw new Error(`Failed to create appointment: ${errorMessage}`);
      }
      
      console.log('Appointment successfully created');
      toast.success(`Bạn đã đặt lịch thành công !`);

      // Sử dụng navigate để chuyển hướng sau khi thành công
      navigate('/datlich'); // Chuyển hướng đến trang xác nhận (thay đổi đường dẫn nếu cần)
    } catch (error) {
      console.error('Error submitting appointment:', error);
      alert("Có lỗi xảy ra khi đặt lịch. Vui lòng thử lại."); // Thông báo lỗi
    }
  };

  const validateInput = (name, value) => {
    let error = '';

    if (name === 'fullName') {
        const textRegex = /^[\p{L}\s]*$/u; // Accepts all Unicode letters and spaces, including Vietnamese
        if (!textRegex.test(value.trim()) && value.trim() !== '') {
          error = 'Họ tên phải chứa các kí tự tiếng việt!';
        }
    }  else if (name === 'phone') {
        const phoneRegex = /^0\d{9}$/; // Allows exactly 10 digits starting with 0
        if (value.trim() !== '' && !phoneRegex.test(value.replace(/\s/g, ''))) {
          error = 'Số điện thoại phải bắt đầu bằng 0 và có 10 số!';
        }
      }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  return (
    <div className="form-container-xn">
      <h2>ĐĂNG KÝ KHÁM BỆNH</h2>
      <p>Vui lòng nhập thông tin</p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group-xn">
          <label htmlFor="phone">* Số điện thoại</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>

        <div className="form-group-xn">
          <label htmlFor="dateOfBirth">* Ngày sinh</label>
          <input
          style={{width:'540px'}}
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
           
        </div>

        <div className="form-group-xn">
          <label htmlFor="fullName">* Họ và tên</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          {errors.fullName && <span className="error-message">{errors.fullName}</span>}
        </div>

        <div className="form-group-xn">
          <label>* Giới tính</label>
          <select  onChange={handleChange} 
                                    value={formData.gender} name="gender">
                                    <option value="">Chọn giới tính</option>
                                    <option value="1">Nam</option>
                                    <option value="2">Nữ</option>
          </select>
        </div>

        <div className="form-group-xn">
          <label>* Quốc tịch</label>
          <select
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            required
          >
            <option value="VIET NAM (Việt Nam)">VIET NAM (Việt Nam)</option>
            <option value="KHÁC">KHÁC</option>
          </select>
        </div>

        {/* Thêm phần chọn địa chỉ bằng thẻ select */}
        <div className="form-group-xn">
          <label htmlFor="city">* Thành phố</label>
          <select
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          >
            <option value="">Chọn thành phố</option>
            <option value="Hà Nội">Hà Nội</option>
            <option value="Hồ Chí Minh">Hồ Chí Minh</option>
            <option value="Đà Nẵng">Đà Nẵng</option>
            <option value="Cần Thơ">Cần Thơ</option>
            {/* Thêm các thành phố khác nếu cần */}
          </select>
        </div>

        <div className="form-group-xn">
          <label htmlFor="district">* Quận/Huyện</label>
          <select
            id="district"
            name="district"
            value={formData.district}
            onChange={handleChange}
            required
          >
            <option value="">Chọn quận/huyện</option>
            <option value="Ba Đình">Ba Đình</option>
            <option value="Hoàn Kiếm">Hoàn Kiếm</option>
            <option value="Tân Bình">Tân Bình</option>
            <option value="Bình Thạnh">Bình Thạnh</option>
            {/* Thêm các quận/huyện khác nếu cần */}
          </select>
        </div>

        <div className="form-group-xn">
          <label htmlFor="ward">* Xã/Phường</label>
          <select
            id="ward"
            name="ward"
            value={formData.ward}
            onChange={handleChange}
            required
          >
            <option value="">Chọn xã/phường</option>
            <option value="Trúc Bạch">Trúc Bạch</option>
            <option value="Cửa Đông">Cửa Đông</option>
            <option value="Phường 1">Phường 1</option>
            <option value="Phường 2">Phường 2</option>
            {/* Thêm các xã/phường khác nếu cần */}
          </select>
        </div>

        <div className="form-group-xn">
          <label htmlFor="address">* Địa chỉ cụ thể</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn-submit-xn">Đặt lịch</button>
      </form>
    </div>
  );
}

export default RegistrationForm;
