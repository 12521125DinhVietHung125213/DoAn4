import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Flip, toast } from 'react-toastify';

export default function Indexkhohang() {

    const [data ,setData] = useState([]);

    
    const loadData =  async() =>{
        const response = await axios.get("http://localhost:5000/api/getallkhohang");
        setData(response.data);
        };

        useEffect(()=>{
            loadData();
        },[]);

        const handleSearch = async (e) => {
            const searchTerm = e.target.value;
            if (!searchTerm) {
                loadData();
            } else {
                try {
                    const response = await axios.get(`http://localhost:5000/api/searchkhohang/${searchTerm}`);
                    setData(response.data);
                } catch (error) {
                    console.error("Error searching data", error);
                }
            }
        };
        

        const deleteKH = (id_kho) =>{
            if(window.confirm("Bạn có muốn xóa sản phẩm này không ?")){
                axios.delete(`http://localhost:5000/api/deletekhohang/${id_kho}`);
                toast.success('Xóa sản phẩm thành công !', {
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
    <div>
      <div class="card shadow mb-4">
        <div class="d-flex align-items-center justify-content-between card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Dữ Liệu Kho Hàng</h6>
            <Link to="/Createkhohang" class="btn btn-primary">Thêm kho hàng</Link>
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
                            <th>Ảnh sản phẩm</th>
                            <th>Tên sản phẩm</th>
                            <th>Ngày sản xuất</th>
                            <th>Số lượng</th>
                            <th>Chi tiết</th>
                            <th>Sửa</th>
                            <th>Xóa</th>

                        </tr>
                    </thead>

                    <tbody>
                        {data.map((item,index)=>{
                            return( 
                            <tr key={item.id_kho}>
                                <td>{index+1}</td>
                                <td><img style={{borderRadius: '5px'}} src={item.hinh_anh_vt} width='60' height='60' className="img img-responsive" /></td>
                                <td>{item.ten_thuoc_vat_tu}</td>
                                <td>{item.ngay_nhap.slice(0, 10)}</td>
                                <td>{item.so_luong}</td>
                                <td><Link to={`/Viewkhohang/${item.id_kho}`} type="button" class="btn btn-primary">Chi Tiết</Link></td>
                                <td><Link to={`/Updatekhohang/${item.id_kho}`} class="btn btn-warning">Sửa</Link></td>
                                <td>
                                        <button type='submit' onClick={() => deleteKH(item.id_kho)} class='btn btn-danger'>Xóa</button>
                                </td>
                            </tr>)
                        })}
                       
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    </div>
  )
}
