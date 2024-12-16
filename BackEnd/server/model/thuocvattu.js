const db = require('../config/config');

const ThuocVatTu = {
    getAll: (callback) => {
        const sqlGet = "SELECT * FROM thuoc_vat_tu";
        db.query(sqlGet, (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },
    getById: (id_thuoc_vat_tu, callback) => {
        const sqlGet = "SELECT * FROM thuoc_vat_tu WHERE id_thuoc_vat_tu = ?";
        db.query(sqlGet, id_thuoc_vat_tu, (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },
    create: (thuocData, callback) => {
        const { ten_thuoc, id_loai_thuoc, so_luong, don_vi, gia, ngay_nhap, hinh_anh } = thuocData;
        const sqlInsert = "INSERT INTO thuoc_vat_tu (ten_thuoc, id_loai_thuoc, so_luong, don_vi, gia, ngay_nhap, hinh_anh) VALUES (?, ?, ?, ?, ?, ?, ?)";
        db.query(sqlInsert, [ten_thuoc, id_loai_thuoc, so_luong, don_vi, gia, ngay_nhap, hinh_anh], (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },
    update: (id_thuoc_vat_tu, thuocData, callback) => {
        const { ten_thuoc, id_loai_thuoc, so_luong, don_vi, gia, hinh_anh } = thuocData;
        const sqlUpdate = "UPDATE thuoc_vat_tu SET ten_thuoc = ?, id_loai_thuoc = ?, so_luong = ?, don_vi = ?, gia = ?,  hinh_anh = ? WHERE id_thuoc_vat_tu = ?";
        db.query(sqlUpdate, [ten_thuoc, id_loai_thuoc, so_luong, don_vi, gia, hinh_anh, id_thuoc_vat_tu], (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },
    delete: (id_thuoc_vat_tu, callback) => {
        const sqlDelete = "DELETE FROM thuoc_vat_tu WHERE id_thuoc_vat_tu = ?";
        db.query(sqlDelete, id_thuoc_vat_tu, (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    },
    // Search function with partial matching
    searchByName: (searchTerm, callback) => {
        const sqlSearch = "SELECT * FROM thuoc_vat_tu WHERE ten_thuoc LIKE ?";
        const formattedSearchTerm = `%${searchTerm}%`; // For partial matching
        db.query(sqlSearch, [formattedSearchTerm], (error, result) => {
            if (error) {
                return callback(error);
            }
            callback(null, result);
        });
    }
};

module.exports = ThuocVatTu;
