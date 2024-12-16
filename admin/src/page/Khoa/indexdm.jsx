import React, { Fragment, useEffect, useState } from 'react';
import axios from "axios"; 
import{toast , Flip} from "react-toastify"
import { Link } from 'react-router-dom';

export default function Indexdm() {

        const [data , setData] = useState([]);

        const loadData = async() =>{
                const response = await axios.get("http://localhost:5000/api/getalldmkhoa");
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
                    const response = await axios.get(`http://localhost:5000/api/searchdmkhoa/${searchTerm}`);
                    setData(response.data);
                } catch (error) {
                    console.error("Error searching data", error);
                }
            }
        };

        const deleteDM = (id_khoa) =>{
            if(window.confirm("Bạn có muốn xóa danh mục này không ?")){
                axios.delete(`http://localhost:5000/api/deletedmkhoa/${id_khoa}`);
                toast.success('Xóa danh mục thành công !', {
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

    <Fragment>
    <div className="card shadow mb-4">
            <div className="d-flex align-items-center justify-content-between card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Dữ Liệu Khoa</h6>
                <Link to="/Themdm" className="btn btn-primary">Thêm Khoa</Link>
            </div>
            <div className="d-flex align-items-center  card-header ">
            <form className="d-none d-sm-inline-block form-inline mr-auto my-2 my-md-0 mw-100 navbar-search">
                    <div className="input-group">
                        <label htmlFor="">Tìm kiếm :</label>
                        <input style={{marginLeft:'5px'}}type="text" onChange={handleSearch} className="form-control form-control-sm" placeholder="nhập dữ liệu tìm kiếm" aria-label="Search" aria-describedby="basic-addon2"/>
                    </div>
                </form>
            </div>
            
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên Khoa</th>
                                <th>Mô tả</th>
                                <th>Chi Tiết</th>
                                <th>Sửa</th>
                                <th>Xóa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item,index)=>{
                                return(
                                    
                                <tr key={item.id_khoa}>
                                    <td>{index+1}</td>
                                    <td>{item.ten_khoa}</td>
                                    <td>{item.mo_ta}</td>
                                    <td><Link to={`/Viewdm/${item.id_khoa}`} type="button" class="btn btn-primary">Chi Tiết</Link></td>
                                    <td><Link to={`/Updatedm/${item.id_khoa}`} class="btn btn-warning">Sửa</Link></td>
                                    <td><button  className="btn btn-danger" onClick={() => deleteDM(item.id_khoa) } >Xóa</button></td>
                                </tr>
                                )
                            })}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </Fragment>
    );
}
