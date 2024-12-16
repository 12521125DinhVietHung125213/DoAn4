import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Flip, toast } from 'react-toastify';

export default function Indexlichkhambenh() {
    const formatCurrency = (number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
    };  
    
    const [data , setData] = useState([]);

    const loadData =  async() =>{
        const response = await axios.get("http://localhost:5000/api/getalllichkham");
        setData(response.data);
};

        useEffect(()=>{
            loadData();
        },[]);

        const handleSearch = async (e) => {
            const searchTerm = e.target.value;
            try {
                const response = await axios.get(`http://localhost:5000/api/searchhd/${searchTerm}`);
                setData(response.data);
            } catch (error) {
                console.error("Error searching data", error);
            }
        };


        const deleteLK = (id_lich_kham) =>{
            if(window.confirm("Bạn có muốn xóa danh mục này không ?")){
                axios.delete(`http://localhost:5000/api/deletelichkham/${id_lich_kham}`);
                toast.success('Xóa lịch khám bệnh thành công !', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Flip,
                    });
                setTimeout(()=>loadData(),500);
            }
        }

  return (
    <div class="card shadow mb-4">
    <div class="d-flex align-items-center justify-content-between card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">Dữ Liệu Lịch Khám</h6>
        
        <Link to={'/addlichkham'} class="btn btn-primary">Thêm lịch khám </Link>
    </div>
    <div className="d-flex align-items-center  card-header ">
            <form className="d-none d-sm-inline-block form-inline mr-auto my-2 my-md-0 mw-100 navbar-search">
                    <div className="input-group">
                        <label htmlFor="">Tìm kiếm :</label>
                        <input style={{marginLeft:'5px'}}type="text" onChange={handleSearch} className="form-control form-control-sm" placeholder="nhập dữ liệu tìm kiếm" aria-label="Search" aria-describedby="basic-addon2"/>
                    </div>
                </form>
            </div>
    <div class="card-body">
        <div class="table-responsive">
            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên KH</th>
                        <th>Ngày đặt</th>
                        {/* <th>Tổng tiền</th> */}
                        {/* <th>Địa chỉ</th>
                        <th>Ghi chú</th> */}
                        <th>Trạng thái</th>
                        <th>Chi tiết</th>
                        <th>Duyệt</th>
                        <th>Xóa</th>

                    </tr>
                </thead>

                <tbody>
                {data.map((item,index)=>{
                    return(   
                    <tr key={item.id_lich_kham}>
                        <td>{index+1}</td>
                        <td>{item.ho_ten_bn}</td>
                        <td>{new Date(item.ngay_dat_lich).toLocaleDateString('en-GB')}</td>
                        <td>
                        {parseInt(item.trang_thai) === 1 
                        ? "Chưa duyệt" 
                        : parseInt(item.trang_thai) === 2 
                        ? "Đã duyệt" 
                        : parseInt(item.trang_thai) === 3 
                        ? "Đang sắp xếp lịch" 
                        : "Trạng thái không xác định"}

                        </td>

                        <td><Link to={`/Viewctlk/${item.id_lich_kham}`} type="button" class="btn btn-primary">Xem</Link></td>
                        <td><Link to={`/Updatelk/${item.id_lich_kham}`} type="button" class="btn btn-warning">Duyệt</Link></td>
                        <td>
                                <button type='submit' onClick={()=> deleteLK(item.id_lich_kham)} class='btn btn-danger'>Xóa</button>
                    
                        </td>

                    </tr>)
                })}
                </tbody>
            </table>
        </div>
    </div>
</div>
  )
}
