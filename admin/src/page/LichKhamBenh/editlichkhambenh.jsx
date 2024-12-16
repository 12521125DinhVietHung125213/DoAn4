import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const initialState = {
    ho_ten_bn: "",
    ngay_dat_lich: "",
    tong_tien: "",
    trang_thai: "",
    dia_chi_bn: "",
    ghi_chu: "",
    sdt_bn: "",
    ngay_kham: "",
    id_bac_si: "",
    id_phong_kham: "",
    chuyen_khoa: "",
    phong_kham:"",
    gio_kham:"",
};

export default function EditLichKhamBenh() {
    const [state, setState] = useState(initialState);
    const [dsBacSi, setDsBacSi] = useState([]);
    const [dsKhoa, setDsKhoa] = useState([]);
    const [dsPhong , setDsPhong]= useState([]);

    const { ho_ten_bn, ngay_dat_lich, trang_thai, dia_chi_bn, ghi_chu, sdt_bn, ngay_kham, id_bac_si, id_phong_kham, chuyen_khoa,gio_kham,tong_tien } = state;
    const { id_lich_kham } = useParams();
    const navigate = useNavigate();

    // Lấy thông tin lịch khám và danh sách bác sĩ theo khoa ban đầu
    useEffect(() => {
        axios.get(`http://localhost:5000/api/getlk/${id_lich_kham}`)
            .then((resp) => {
                const data = resp.data?.[0]; // Sử dụng optional chaining để tránh lỗi khi data undefined
                if (data) {
                    setState(data);
                    if (data.chuyen_khoa) {
                        fetchDoctorsByKhoa(data.chuyen_khoa);
                    }
                    if(data.chuyen_khoa){
                        fetchRoomByKhoa(data.chuyen_khoa);
                    }
                }
            })
            .catch(() => toast.error("Không thể lấy thông tin lịch khám"));
    }, [id_lich_kham]);

    // Lấy danh sách khoa
    useEffect(() => {
        axios.get('http://localhost:5000/api/getalldmkhoa')
            .then((resp) => setDsKhoa(resp.data))
            .catch(() => toast.error("Không thể lấy danh sách khoa"));
    }, []);

    // Lấy danh sách bác sĩ theo id_khoa
    const fetchDoctorsByKhoa = (id_khoa) => {
        axios.get(`http://localhost:5000/api/getdoctors/${id_khoa}`)
            .then((resp) => setDsBacSi(resp.data))
            .catch(() => toast.error("Không thể lấy danh sách bác sĩ"));
    };

       // Lấy danh sách phòng theo id_khoa
     const fetchRoomByKhoa = (id_khoa) => {
        axios.get(`http://localhost:5000/api/getphongkhambydepartment/${id_khoa}`)
            .then((resp) => setDsPhong(resp.data))
            .catch(() => toast.error("Không thể lấy danh sách phòng"));
    };

    // Xử lý thay đổi chọn chuyên khoa
    const handleKhoaChange = (e) => {
        const selectedKhoa = e.target.value;
        setState({ ...state, chuyen_khoa: selectedKhoa });
        fetchDoctorsByKhoa(selectedKhoa); // Lấy danh sách bác sĩ theo chuyên khoa
        fetchRoomByKhoa(selectedKhoa);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!trang_thai) {
            toast.error("Vui lòng nhập đầy đủ thông tin");
        } else {
            if (window.confirm("Bạn có muốn cập nhật thông tin?")) {
                axios.put(`http://localhost:5000/api/updatelk/${id_lich_kham}`, { trang_thai ,gio_kham , ngay_kham ,chuyen_khoa ,id_phong_kham,id_bac_si})
                    .then(() => {
                        setState({ trang_thai: "",gio_kham:"",ngay_kham:"",chuyen_khoa:"",phong_kham:"",id_bac_si:"" });
                        toast.success("Cập nhật lịch khám thành công!");
                        setTimeout(() => navigate("/Indexlichkham"), 500);
                    })
                    .catch((err) => toast.error(err.response.data));
            }
        }
    }
    console.log( trang_thai ,gio_kham , ngay_kham ,chuyen_khoa ,id_phong_kham,id_bac_si);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/getalllk");
                const data = await response.json(); 

                const serviceUsed = data.some(item => item.id_lich_kham === state.id_lich_kham);

                setState(prevState => ({
                    ...prevState,
                    dich_vu: serviceUsed ? "Khách hàng đã sử dụng dịch vụ khám" : "Khách hàng chưa sử dụng dịch vụ khám"
                }));
            } catch (error) {
                console.error("Error fetching services:", error);
            }
        };

        if (state.id_lich_kham) fetchServices(); 
    }, [state.id_lich_kham]);

    const formatCurrency = (number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
    }; 
    const convertTimeFormat = (time) => {
        if (!time) {
            console.error("Time is undefined or null");
            return ""; // Hoặc giá trị mặc định nếu time không tồn tại
        }
        
        // Đảm bảo time là chuỗi trước khi gọi split
        const timeString = String(time);
        const [hours, minutes] = timeString.split(":");
        
        // Thêm xử lý logic nếu cần
        return `${hours}:${minutes}`;
    };
    const date = new Date(ngay_kham);
    const formattedDate = date.toLocaleDateString('en-GB'); 

    // console.log(chuyen_khoa,id_phong_kham,id_bac_si)
    // console.log(dsPhong)
    // console.log(dsKhoa)
    // console.log(dsBacSi)
    // console.log(state)

    return (
        <div>
            <div className='d-flex  align-items-center'>
            <Link to={'/indexlichkham'}>  <i className="fas fa-arrow-circle-left" style={{ fontSize: '24px', color: 'blue', marginRight: '8px' , marginTop:'8px'}}></i></Link>
            <h3 className="mb-0">Cập nhật lịch khám</h3>
            </div>
            <hr />
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="row">
                    <div className="col mb-3">
                        <label className="form-label">Ngày đặt khám</label>
                        <input type="date" name="ngay_dat_lich" className="form-control" onChange={handleInputChange} placeholder="Ngày đặt khám" value={ngay_dat_lich?.slice(0, 10) || ""} />
                    </div>
                    <div className="col mb-3">
                        <label className="form-label">Ngày khám {formattedDate}</label>
                        <input type="date" name="ngay_kham" className="form-control" onChange={handleInputChange} placeholder="Ngày khám" value={ngay_kham || ""} />
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-3">
                        <label className="form-label">Giờ khám: {convertTimeFormat(gio_kham)}</label>
                        <select onChange={handleInputChange} value={gio_kham} className='form-control'>
                            <option value="">Chọn giờ khám</option>
                            <option value="8:00">8:00 - Sáng</option>
                            <option value="8:30">8:30</option>
                            <option value="9:00">9:00</option>
                            <option value="9:30">9:30</option>
                            <option value="10:00">10:00</option>
                            <option value="10:30">10:30</option>
                            <option value="11:00">11:00</option>
                            <option value="11:30">11:30</option>
                            <option value="13:30">13:30 - Chiều</option>
                            <option value="14:00">14:00</option>
                            <option value="14:30">14:30</option>
                            <option value="15:00">15:00</option>
                            <option value="15:30">15:30</option>
                            <option value="16:00">16:00</option>
                            <option value="16:30">16:30</option>
                        </select>
                    </div>
                    <div className="col mb-3">
                        <label className="form-label">Tổng tiền</label>
                        <input type="text" name="tong_tien" className="form-control" onChange={handleInputChange} placeholder="Ngày khám" value={formatCurrency(tong_tien) || ""} />
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-3">
                        <label className="form-label">Tên bệnh nhân</label>
                        <input type="text" name="ho_ten_bn" className="form-control" onChange={handleInputChange} placeholder="Tên bệnh nhân" value={ho_ten_bn || ""} />
                    </div>
                    <div className="col mb-3">
                        <label className="form-label">Số điện thoại</label>
                        <input type="text" name="sdt_bn" className="form-control" onChange={handleInputChange} placeholder="Số điện thoại" value={sdt_bn || ""} />
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-3">
                        <label className="form-label">Địa chỉ</label>
                        <input type="text" name="dia_chi_bn" className="form-control" onChange={handleInputChange} placeholder="Địa chỉ" value={dia_chi_bn || ""} />
                    </div>
                    <div className="col mb-3">
                        <label className="form-label">Trạng thái lịch khám</label>
                        <select name="trang_thai" className="form-control" onChange={handleInputChange} value={trang_thai}>
                            <option value="1">Chưa Duyệt</option>
                            <option value="2">Đã Duyệt</option>
                            <option value="3">Đang sắp xếp lịch</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-3">
                        <label className="form-label">Chuyên khoa khám bệnh</label>
                        <select name="chuyen_khoa" className="form-control" onChange={handleKhoaChange} value={chuyen_khoa}>
                        <option value="" disabled>Sắp xếp khoa khám bệnh</option>
                            {dsKhoa.map((khoa) => (
                                <option key={khoa.id_khoa} value={khoa.id_khoa}>
                                    {khoa.ten_khoa}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col mb-3">
                        <label className="form-label">Phòng khám</label>
                        <select name="phong_kham" className="form-control" onChange={handleInputChange} value={id_phong_kham}>
                        <option value="" disabled>Sắp xếp phòng khám</option>
                        {dsPhong.map((phongkham) => (
                                <option key={phongkham.id_phong_kham} value={phongkham.id_phong_kham}>
                                    Phòng số: {phongkham.so_phong}({phongkham.ten_phong_kham})
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-3">
                        <label className="form-label">Bác sĩ</label>
                        <select name="id_bac_si" className="form-control" onChange={handleInputChange} value={id_bac_si}>
                        <option value="" disabled>Sắp xếp bác sĩ khám bệnh</option>
                            {dsBacSi.map((bacSi) => (
                                
                                <option key={bacSi.id_bac_si} value={bacSi.id_bac_si}>
                                    {bacSi.ho_ten}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col mb-3">
                        <label className="form-label">Dịch vụ</label>
                        <Link to={`/Viewctlk/${id_lich_kham}`}><input type="text" name="dich_vu" className="form-control" onChange={handleInputChange} placeholder="Dịch vụ sử dụng"  value={ state.dich_vu || ""} /></Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-3">
                        <label className="form-label">Ghi chú</label>
                        <input type="text" name="ghi_chu" className="form-control" onChange={handleInputChange} placeholder="Ghi chú" value={ghi_chu || ""} />
                    </div>
                </div>
                <div className="row">
                    <div className="d-grid">
                        <button style={{ marginLeft: '10px', marginTop: '30px' }} className="btn btn-warning">Cập nhật</button>
                    </div>
                    <div className="d-grid">
                        <button style={{ marginLeft: '10px', marginTop: '30px' }} className="btn btn-warning">In Đơn</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
