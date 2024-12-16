const express = require('express');
const router = express.Router();
const thuocVatTuController = require('../controllers/thuocvattuController'); // Đổi tên controller cho phù hợp

// Route để lấy tất cả thuốc/vật tư
router.get('/api/getallTVT', thuocVatTuController.getAllThuocVatTu);

// Route để lấy thông tin thuốc/vật tư theo ID
router.get('/api/getTVTid/:id_thuoc_vat_tu', thuocVatTuController.getThuocVatTuById);

// Route để tạo mới thuốc/vật tư
router.post('/api/createTVT', thuocVatTuController.createThuocVatTu);

// Route để cập nhật thuốc/vật tư theo ID
router.put('/api/updateTVT/:id_thuoc_vat_tu', thuocVatTuController.updateThuocVatTu);

// Route để xóa thuốc/vật tư theo ID
router.delete('/api/deleteTVT/:id_thuoc_vat_tu', thuocVatTuController.deleteThuocVatTu);

// Route để tìm kiếm thuốc/vật tư theo tên
router.get('/api/searchTVT/:searchTerm', thuocVatTuController.searchThuocVatTuByName);

module.exports = router;
