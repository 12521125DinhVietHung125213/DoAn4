import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../../until/userContext';

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
// Loading component
const Loading = () => (
    <div className="loading">
        <p>Đang tải dữ liệu...</p>
    </div>
);

// Error component
const Error = ({ message }) => (
    <div className="error">
        <p style={{ color: 'red' }}>{message}</p>
    </div>
);

// Main component
export default function OrderCart() {
    const { user } = useUser();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Load data from API${user.id}
    const loadData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/orderDetailsByCustomer/${user.id}`);
            setOrders(response.data);
            setLoading(false);
        } catch (error) {
            setError('Hiện chưa có đơn hàng nào!');
            setLoading(false);
        }
    };

    // Format currency
    const formatCurrency = (number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
    };

    // Use effect to load data on component mount
    useEffect(() => {
        loadData();
    }, []);

    return (
        <Fragment>
            <div className="container-cart">
                
                
                {loading ? (
                    <Loading />
                ) : error ? (
                    <Error message={error} />
                ) : (
                    <div className='layout-order'>
                        {orders.map((order) => (
                            <div key={order.ma_don_hang} className="order-section">
                                <div className="address-details">
                                    <h3><i className=""></i> Thông tin cá nhân</h3>
                                    <div className="address-item">
                                        <label>Tên bệnh nhân:</label>
                                        <span>{order.ho_ten_bn}</span>
                                    </div>
                                    <div className="address-item">
                                        <label>Số điện thoại:</label>
                                        <span>{order.sdt_bn}</span>
                                    </div>
                                    <div className="address-item">
                                        <label>Địa chỉ chi tiết:</label>
                                        <span>{order.dia_chi_bn}</span>
                                    </div>
                                    <div className="address-item">
                                        <label>Trạng thái:</label>
                                        <span> <td>
                                        {parseInt(order.trang_thai) === 1 
                                            ? "Dịch vụ khám của bạn đang đợi xác nhận" 
                                            : parseInt(order.trang_thai) === 2 
                                            ? "Bác sĩ đã xắp xếp lịch khám cho bạn theo thông tin bên trên" 
                                            : "Bác sĩ đang xắp xếp lịch khám"}
                                        </td>
                                        </span>
                                    </div>
                                    <div className="address-item">
                                        <label>Ngày khám:</label>
                                        <span>{formatDate(order.ngay_kham)}</span>
                                    </div>
                                    <div className="address-item">
                                        <label>Giờ khám:</label>
                                        <span>8h30 Sáng</span>
                                    </div>
                                    <div className="address-item">
                                        <label>Bác sĩ khám bệnh:</label>
                                        <span>Bác sĩ Ngô Anh Tuấn </span>
                                    </div>
                                    <div className="address-item">
                                        <label>Phòng khám:</label>
                                        <span>(P01)Phòng khám tổng quát</span>
                                    </div>
                                </div>
                                <div className="product-table">
                                    {order.orderDetails.length > 0 ? (
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Tên dịch vụ khám</th>
                                                    <th>Ảnh dịch vụ khám</th>
                                                    <th>Số Lượng</th>
                                                    <th>Thành Tiền</th>
                                                    <th>Thao tác</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {order.orderDetails.map((item) => (
                                                    <tr key={item.ma_chi_tiet_don_hang}>
                                                        <td className="table-cart-1">{item.ten_dich_vu}</td>
                                                        <td>
                                                            <img 
                                                                src={item.hinh_anh_dv} 
                                                                className="product-image" 
                                                                alt="Product" 
                                                                loading="lazy" // Lazy load image
                                                            />
                                                        </td>
                                                        <td>{item.so_luong}</td>
                                                        <td>{formatCurrency(item.gia)}</td>
                                                        <td><i className="fas fa-pen"></i></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <div className="no-orders">
                                            <p>Không có đơn hàng nào được tìm thấy.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Fragment>
    );
}
