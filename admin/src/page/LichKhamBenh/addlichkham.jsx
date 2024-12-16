import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const initialState = {
   id_benh_nhan: "",
   id_bac_si: "",
   id_phong_kham: "",
   ngay_kham: "",
   gio_kham: "",
   ghi_chu: "",
   ho_ten_bn: "",
   sdt_bn: "",
   dia_chi_bn: "",
   ngay_sinh: "",
   chuyen_khoa: "",
   trang_thai: "",
   ngay_dat_lich: "",
   tong_tien: ""
};

export default function CreateLichKham() {
    const [state, setState] = useState(initialState);
    const [khoaOptions, setKhoaOptions] = useState([]);
    const [bacSiOptions, setBacSiOptions] = useState([]);
    const [phongKhamOptions, setPhongKhamOptions] = useState([]);
    const { id_benh_nhan, id_bac_si, id_phong_kham, ngay_kham, gio_kham, ghi_chu, ho_ten_bn, sdt_bn, dia_chi_bn, ngay_sinh, chuyen_khoa, trang_thai, ngay_dat_lich, tong_tien } = state;
    
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const khoaRes = await axios.get("http://localhost:5000/api/getalldmkhoa");
                setKhoaOptions(khoaRes.data);
                const bacSiRes = await axios.get("http://localhost:5000/api/getallbs");
                setBacSiOptions(bacSiRes.data);
                const phongKhamRes = await axios.get("http://localhost:5000/api/getallphongkham");
                setPhongKhamOptions(phongKhamRes.data);
            } catch (error) {
                toast.error("Lỗi khi lấy dữ liệu");
            }
        };
        fetchOptions();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!id_benh_nhan || !id_bac_si || !id_phong_kham || !ngay_kham || !gio_kham || !ho_ten_bn || !sdt_bn || !dia_chi_bn || !ngay_sinh || !chuyen_khoa || !trang_thai || !ngay_dat_lich || !tong_tien) {
            toast.error("Vui lòng nhập đủ thông tin");
        } else {
            axios.post("http://localhost:5000/api/createlichkham", {
                id_benh_nhan,
                id_bac_si,
                id_phong_kham,
                ngay_kham,
                gio_kham,
                ghi_chu,
                ho_ten_bn,
                sdt_bn,
                dia_chi_bn,
                ngay_sinh,
                chuyen_khoa,
                trang_thai,
                ngay_dat_lich,
                tong_tien
            })
            .then(() => {
                setState(initialState);
                toast.success("Thêm lịch khám thành công!");
                setTimeout(() => navigate("/IndexLichKham"), 500);
            })
            .catch((err) => toast.error(err.response.data));
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    return (
        <div>
            <h3 className="mb-0">Thêm lịch khám</h3>
            <hr />
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <div className="col">
                        <input type="text" name="ho_ten_bn" onChange={handleInputChange} value={ho_ten_bn} className="form-control" placeholder="Họ tên bệnh nhân" />
                    </div>
                    <div className="col">
                        <input type="text" name="sdt_bn" onChange={handleInputChange} value={sdt_bn} className="form-control" placeholder="Số điện thoại" />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <input type="text" name="dia_chi_bn" onChange={handleInputChange} value={dia_chi_bn} className="form-control" placeholder="Địa chỉ bệnh nhân" />
                    </div>
                    <div className="col">
                        <input type="date" name="ngay_sinh" onChange={handleInputChange} value={ngay_sinh} className="form-control" placeholder="Ngày sinh" />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <select name="chuyen_khoa" onChange={handleInputChange} value={chuyen_khoa} className="form-control">
                            <option value="">Chọn khoa</option>
                            {khoaOptions.map(khoa => (
                                <option key={khoa.id_khoa} value={khoa.id_khoa}>{khoa.ten_khoa}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col">
                        <select name="id_bac_si" onChange={handleInputChange} value={id_bac_si} className="form-control">
                            <option value="">Chọn bác sĩ</option>
                            {bacSiOptions.map(bacSi => (
                                <option key={bacSi.id_bac_si} value={bacSi.id_bac_si}>{bacSi.ho_ten}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <select name="id_phong_kham" onChange={handleInputChange} value={id_phong_kham} className="form-control">
                            <option value="">Chọn phòng khám</option>
                            {phongKhamOptions.map(phong => (
                                <option key={phong.id_phong_kham} value={phong.id_phong_kham}>{phong.ten_phong_kham}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col">
                        <input type="date" name="ngay_kham" onChange={handleInputChange} value={ngay_kham} className="form-control" placeholder="Ngày khám" />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <input type="time" name="gio_kham" onChange={handleInputChange} value={gio_kham} className="form-control" placeholder="Giờ khám" />
                    </div>
                    <div className="col">
                        <input type="date" name="ngay_dat_lich" onChange={handleInputChange} value={ngay_dat_lich} className="form-control" placeholder="Ngày đặt lịch" />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <input type="number" name="tong_tien" onChange={handleInputChange} value={tong_tien} className="form-control" placeholder="Tổng tiền" />
                    </div>
                    <div className="col">
                        <select name="trang_thai" onChange={handleInputChange} value={trang_thai} className="form-control">
                            <option value="">Chọn trạng thái</option>
                            <option value="1">Đã xử lý</option>
                            <option value="0">Chưa xử lý</option>
                        </select>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <textarea name="ghi_chu" onChange={handleInputChange} value={ghi_chu} className="form-control" placeholder="Ghi chú"></textarea>
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
