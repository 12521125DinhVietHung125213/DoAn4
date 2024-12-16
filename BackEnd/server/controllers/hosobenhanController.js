const Patient = require('../model/hosobenhan'); // Adjust the path if necessary

// API to get patient information and their medical records based on id_benh_nhan
exports.getPatientAndMedicalRecords = (req, res) => {
    const { id_benh_nhan } = req.params;
    Patient.getPatientAndMedicalRecordsById(id_benh_nhan, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }

        if (!result || result.length === 0) {
            return res.status(404).send({ message: "Patient not found" });
        }

        // Separate patient data from medical records
        const patientInfo = {
            id_benh_nhan: result[0].id_benh_nhan,
            ho_ten: result[0].ho_ten,
            ngay_sinh: result[0].ngay_sinh,
            gioi_tinh: result[0].gioi_tinh,
            dia_chi: result[0].dia_chi,
            so_dien_thoai: result[0].so_dien_thoai,
            // Add other patient fields as needed
        };

        // Extract medical records
        const medicalRecords = result.map(row => ({
            id_ho_so: row.id_ho_so,
            ngay_lap: row.ngay_lap,
            chan_doan: row.chan_doan,
            tien_su_benh : row.tien_su_benh,
            phuong_phap_dieu_tri : row.phuong_phap_dieu_tri,
            ghi_chu: row.ghi_chu,
            trieu_chung:row.trieu_chung,
            // Add other medical record fields as needed
        }));

        // Combine into one object
        res.send({
            patientInfo,
            medicalRecords,
        });
    });
};


// Lấy tất cả hồ sơ bệnh án
exports.getAllBenhAn = (req, res) => {
    Patient.getAll((err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result);
    });
};

// Lấy hồ sơ bệnh án theo ID
exports.getBenhAnById = (req, res) => {
    const { id_ho_so } = req.params;
    Patient.getById(id_ho_so, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result);
    });
};

// Tạo hồ sơ bệnh án mới
exports.createBenhAn = (req, res) => {
    const benhanData = req.body;
    Patient.create(benhanData, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send("Hồ sơ bệnh án được tạo thành công");
    });
};

// Cập nhật hồ sơ bệnh án
exports.updateBenhAn = (req, res) => {
    const { id_ho_so } = req.params;
    const benhanData = req.body;
    Patient.update(id_ho_so, benhanData, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send("Hồ sơ bệnh án được cập nhật thành công");
    });
};

// Xóa hồ sơ bệnh án
exports.deleteBenhAn = (req, res) => {
    const { id_ho_so } = req.params;
    Patient.delete(id_ho_so, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send("Hồ sơ bệnh án đã bị xóa");
    });
};

// Tìm kiếm hồ sơ bệnh án theo tên bệnh nhân
exports.searchBenhAnByBenhNhan = (req, res) => {
    const { id_benh_nhan } = req.params; // Lấy ID bệnh nhân từ URL params
    Patient.searchByBenhNhan(id_benh_nhan, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result);
    });
};

// Lấy hồ sơ bệnh án theo ngày lập
exports.getBenhAnByNgayLap = (req, res) => {
    const { ngay_lap } = req.params; // Lấy ngày lập từ URL params
    Patient.getByNgayLap(ngay_lap, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result);
    });
};

exports.searchCustomerByName = (req, res) => {
    const { searchTerm } = req.params; // Lấy search term từ URL params
    Patient.searchByName(searchTerm, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send(result);
    });
};

