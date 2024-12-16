const db = require('../config/config');

const Bill = {

    getAll: (callback) => {
        const sqlGet = "SELECT * FROM lich_kham";
        db.query(sqlGet, (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },

    getById: (ma_don_hang, callback) => {
        const sqlGet = "SELECT * FROM lich_kham WHERE id_lich_kham = ?";
        db.query(sqlGet, [ma_don_hang], (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },

    update: (id_lich_kham, billData, callback) => {
        const {trang_thai ,gio_kham , ngay_kham , chuyen_khoa , id_bac_si , id_phong_kham} = billData;
        const sqlUpdate = "update lich_kham set trang_thai=? ,gio_kham=?, ngay_kham=? ,chuyen_khoa=? ,id_bac_si=?, id_phong_kham=? where id_lich_kham = ?";
        db.query(sqlUpdate, [trang_thai,gio_kham,ngay_kham,chuyen_khoa,id_bac_si,id_phong_kham,id_lich_kham], (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },

    updatePrice: (id_lich_kham, billPriceData, callback) => {
        const {tong_tien} = billPriceData;
        const sqlUpdate = "update lich_kham set tong_tien=? where id_lich_kham = ?";
        db.query(sqlUpdate, [tong_tien,id_lich_kham], (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },

    delete: (id_lich_kham, callback) => {
        const sqlDelete = "DELETE FROM lich_kham WHERE id_lich_kham = ?";
        db.query(sqlDelete, [id_lich_kham], (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },
     // Thêm hàm tìm kiếm gần đúng
     searchByName: (searchTerm, callback) => {
        const sqlSearch = "SELECT * FROM don_hang WHERE ten_khach LIKE ?";
        const formattedSearchTerm = `%${searchTerm}%`; // Tìm kiếm gần đúng
        db.query(sqlSearch, [formattedSearchTerm], (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    }

};

module.exports = Bill;