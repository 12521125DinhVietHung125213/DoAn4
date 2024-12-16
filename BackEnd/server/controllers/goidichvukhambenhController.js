const Service = require('../model/goidichvukhambenh');

exports.getAllServices = (req, res) => {
    const page = req.query.page
    const pageSize = req.query.pageSize || 10


    Service.getAll({page, pageSize}, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }

        console.log(result);
        res.send(page ?result[0] :result);
    });
};

exports.getServiceById = (req, res) => {
    const { id_dich_vu } = req.params;
    Service.getById(id_dich_vu, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result);
    });
};

exports.createService = (req, res) => {
    const ServiceData = req.body;
    Service.create(ServiceData, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send("Service added successfully");
    });
};

exports.updateService = (req, res) => {
    const { id_dich_vu } = req.params;
    const ServiceData = req.body;
    Service.update(id_dich_vu, ServiceData, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send("Service updated successfully");
    });
};

exports.deleteService = (req, res) => {
    const { id_dich_vu } = req.params;
    Service.delete(id_dich_vu, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send("Service deleted successfully");
    });
};

exports.searchServiceByName = (req, res) => {
    const { searchTerm } = req.params; 
    Service.searchByName(searchTerm, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result);
    });
};

exports.searchServiceByPriceAndName = (req, res) => {
    const { minPrice, maxPrice, name } = req.query;

    // Gọi hàm tìm kiếm và chắc chắn rằng callback là một hàm
    Service.searchByPriceAndName(minPrice, maxPrice, name, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result); // Trả kết quả nếu không có lỗi
    });
};



