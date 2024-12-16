const Bill = require('../model/hoadonlichkham');

exports.getAllBill = (req, res) => {

    Bill.getAll((err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result);
    });
};

exports.getBillById = (req, res) => {
    const { id_lich_kham } = req.params;
    Bill.getById(id_lich_kham, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result);
    });
};

exports.deleteBill = (req, res) => {

    const { id_lich_kham } = req.params;

    Bill.delete(id_lich_kham, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send("Bill deleted successfully");
    });
};

exports.updateBill = (req, res) => {
    const { id_lich_kham } = req.params;
    const billData = req.body;
    Bill.update(id_lich_kham, billData, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send("Update bill");
    });
};

exports.updatePriceBill = (req, res) => {
    const { id_lich_kham } = req.params;
    const billPriceData = req.body;
    Bill.updatePrice(id_lich_kham, billPriceData, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send("Update price bill");
    });
};

// Hàm mới để tìm kiếm gần đúng theo tên sản phẩm
exports.searchBillByName = (req, res) => {
    
    const { searchTerm } = req.params; // Lấy search term từ URL params
    Bill.searchByName(searchTerm, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result);
    });
};