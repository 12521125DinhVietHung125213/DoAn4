const express = require('express');
const router = express.Router();
const billController = require('../controllers/hoadonlichkhamController');

router.get('/api/getalllichkham', billController.getAllBill);
router.delete('/api/deletelichkham/:id_lich_kham', billController.deleteBill);
router.get('/api/getlk/:id_lich_kham', billController.getBillById);
router.get('/api/searchhd/:searchTerm', billController.searchBillByName);
router.put('/api/updatelk/:id_lich_kham', billController.updateBill);
router.put('/api/updatepricelk/:id_lich_kham', billController.updatePriceBill);
module.exports = router;