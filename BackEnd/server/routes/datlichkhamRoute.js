const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/datlichkhamController');

// Route for adding an appointment
router.post('/api/addAppointment', appointmentController.addAppointment);

module.exports = router;
