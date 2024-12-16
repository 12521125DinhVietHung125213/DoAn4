const db = require('../config/config'); // Adjust the path if necessary

const Patient = {
    // Function to get patient and medical records based on id_benh_nhan
    getPatientAndMedicalRecordsById: (id_benh_nhan, callback) => {
        const sqlQuery = `
            SELECT bn.id_benh_nhan, bn.ho_ten, bn.ngay_sinh, bn.gioi_tinh, bn.dia_chi, bn.so_dien_thoai,
                   hsba.id_ho_so, hsba.ngay_lap, hsba.chan_doan, hsba.ghi_chu , hsba.phuong_phap_dieu_tri , hsba.tien_su_benh , hsba.trieu_chung
            FROM benh_nhan bn
            LEFT JOIN ho_so_benh_an hsba ON bn.id_benh_nhan = hsba.id_benh_nhan
            WHERE bn.id_benh_nhan = ?
        `;
        db.query(sqlQuery, [id_benh_nhan], (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },

    getAll: (callback) => {
        const sqlGet = "SELECT * FROM ho_so_benh_an";
        db.query(sqlGet, (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },
    
    // Lấy hồ sơ bệnh án theo ID
    getById: (id_ho_so, callback) => {
        const sqlGet = "SELECT * FROM ho_so_benh_an WHERE id_ho_so = ?";
        db.query(sqlGet, id_ho_so, (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },
    
    // Tạo mới hồ sơ bệnh án
    create: (hoSoBenhAnData, callback) => {
        const { id_benh_nhan, chan_doan, phuong_phap_dieu_tri, ghi_chu, ngay_lap, tien_su_benh, trieu_chung } = hoSoBenhAnData;
        const sqlInsert = `
            INSERT INTO ho_so_benh_an (
                id_benh_nhan, chan_doan, phuong_phap_dieu_tri, ghi_chu, ngay_lap, tien_su_benh, trieu_chung
            ) VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        db.query(sqlInsert, [id_benh_nhan, chan_doan, phuong_phap_dieu_tri, ghi_chu, ngay_lap, tien_su_benh, trieu_chung], (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },

    // Cập nhật hồ sơ bệnh án
    update: (id_ho_so, hoSoBenhAnData, callback) => {
        const { id_benh_nhan, chan_doan, phuong_phap_dieu_tri, ghi_chu, ngay_lap, tien_su_benh, trieu_chung } = hoSoBenhAnData;
        const sqlUpdate = `
            UPDATE ho_so_benh_an 
            SET id_benh_nhan = ?, chan_doan = ?, phuong_phap_dieu_tri = ?, ghi_chu = ?, ngay_lap = ?, tien_su_benh = ?, trieu_chung = ? 
            WHERE id_ho_so = ?
        `;
        db.query(sqlUpdate, [id_benh_nhan, chan_doan, phuong_phap_dieu_tri, ghi_chu, ngay_lap, tien_su_benh, trieu_chung, id_ho_so], (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },

    // Xóa hồ sơ bệnh án
    delete: (id_ho_so, callback) => {
        const sqlDelete = "DELETE FROM ho_so_benh_an WHERE id_ho_so = ?";
        db.query(sqlDelete, id_ho_so, (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },

    // Tìm kiếm hồ sơ bệnh án theo ID bệnh nhân
    searchByBenhNhan: (id_benh_nhan, callback) => {
        const sqlSearch = "SELECT * FROM ho_so_benh_an WHERE id_benh_nhan = ?";
        db.query(sqlSearch, [id_benh_nhan], (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },

    // Lấy hồ sơ bệnh án theo ngày lập
    getByNgayLap: (ngay_lap, callback) => {
        const sqlGetByNgayLap = "SELECT * FROM ho_so_benh_an WHERE ngay_lap = ?";
        db.query(sqlGetByNgayLap, [ngay_lap], (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },

    searchByName: (searchTerm, callback) => {
        const sqlSearch = "SELECT * FROM benh_nhan WHERE ho_ten LIKE ?";
        const formattedSearchTerm = `%${searchTerm}%`; // Tìm kiếm gần đúng
        db.query(sqlSearch, [formattedSearchTerm], (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    }
};

module.exports = Patient;
