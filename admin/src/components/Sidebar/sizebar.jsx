import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Sizebar() {
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleMenu = (menuName) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  return (
    <Fragment>
      <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
        <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink"></i>
          </div>
          <div className="sidebar-brand-text mx-3">Quản Lý</div>
        </a>

        <hr className="sidebar-divider my-0" />
        <li className="nav-item">
          <Link className="nav-link" to="/">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Thống kê</span>
          </Link>
        </li>
        <hr className="sidebar-divider" />

        {/* Dịch Vụ Y Tế Collapse Menu */}
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            onClick={() => toggleMenu('medicalServices')}
            href="#!"
          >
            <i className="fas fa-calendar"></i>
            <span>Dịch Vụ Y Tế</span>
          </a>
          <div
            className={`collapse ${activeMenu === 'medicalServices' ? 'show' : ''}`}
            aria-labelledby="headingMedicalServices"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <Link className="collapse-item" to="/Indexgdv">Gói dịch vụ</Link>
              <Link className="collapse-item" to="/IndexTVT">Vật tư y tế</Link>
            </div>
          </div>
        </li>

        {/* Lịch Khám */}
        <li className="nav-item">
          <Link className="nav-link" to="/Indexlichkham">
            <i className="far fa-calendar-check"></i>
            <span>Lịch Khám</span>
          </Link>
        </li>

         {/* Phòng khám */}
         <li className="nav-item">
          <Link className="nav-link" to="/IndexPhongKham">
            <i className="fas fa-hospital"></i>
            <span>Phòng khám</span>
          </Link>
        </li>

        {/* Quản Lý Nhân Sự Collapse Menu */}
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            onClick={() => toggleMenu('personnelManagement')}
            href="#!"
          >
            <i className="fas fa-user-check"></i>
            <span>Quản Lý Nhân Sự</span>
          </a>
          <div
            className={`collapse ${activeMenu === 'personnelManagement' ? 'show' : ''}`}
            aria-labelledby="headingPersonnelManagement"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <Link className="collapse-item" to="/IndexBacSi">Bác sĩ</Link>
              <Link className="collapse-item" to="/Indexdm">Khoa</Link>
              <Link className="collapse-item" to="/Indextrinhdobs">Trình độ bác sĩ</Link>
            </div>
          </div>
        </li>

        {/* Hồ Sơ Bệnh Nhân Collapse Menu */}
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            onClick={() => toggleMenu('patientRecords')}
            href="#!"
          >
            <i className="fas fa-user-friends"></i>
            <span>Hồ Sơ Bệnh Nhân</span>
          </a>
          <div
            className={`collapse ${activeMenu === 'patientRecords' ? 'show' : ''}`}
            aria-labelledby="headingPatientRecords"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <Link className="collapse-item" to="/Indexbenhnhan">Bệnh nhân</Link>
              <Link className="collapse-item" to="/Indexhosobenhan">Hồ sơ khám bệnh</Link>
            </div>
          </div>
        </li>

        {/* Kho Vận Collapse Menu */}
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            onClick={() => toggleMenu('inventory')}
            href="#!"
          >
            <i className="fas fa-truck"></i>
            <span>Kho Vận</span>
          </a>
          <div
            className={`collapse ${activeMenu === 'inventory' ? 'show' : ''}`}
            aria-labelledby="headingInventory"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <Link className="collapse-item" to="/Indexkhohang">Kho hàng</Link>
              <Link className="collapse-item" to="/Indexhoadonnhap">Hóa đơn nhập</Link>
            </div>
          </div>
        </li>

        {/* Tài Khoản và Cài Đặt */}
        <li className="nav-item">
          <Link className="nav-link" to="/Indextaikhoan">
            <i className="fas fa-fw fa-cog"></i>
            <span>Tài khoản</span>
          </Link>
        </li>

        <li className="nav-item">
          <a
            className="nav-link collapsed"
            onClick={() => toggleMenu('settings')}
            href="#!"
          >
            <i className="fas fa-fw fa-wrench"></i>
            <span>Cài đặt</span>
          </a>
          <div
            className={`collapse ${activeMenu === 'settings' ? 'show' : ''}`}
            aria-labelledby="headingUtilities"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <Link className="collapse-item" to="/slider">Slider</Link>
              <Link className="collapse-item" to="/qlyblog">Blog</Link>
            </div>
          </div>
        </li>

        <hr className="sidebar-divider" />

        <div className="text-center d-none d-md-inline">
          <button className="rounded-circle border-0" id="sidebarToggle"></button>
        </div>
      </ul>
    </Fragment>
  );
}
