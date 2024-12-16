const Appointment = require('../model/datlichkham');

exports.addAppointment = (req, res) => {
    
    const appointmentData = req.body; // Retrieve data from the request body

    Appointment.addAppointment(appointmentData, (err,message ) => {
        if (err) {
            return res.status(500).send({ message: "Error creating appointment", error: err });
        }
        res.status(200).send({ message: 'Appointment scheduled successfully'});
    });
};
