const db = require('../config/config');

const Appointment = {
    addAppointment: (appointmentData, callback) => {
        const { 
            id_benh_nhan, id_bac_si, id_phong_kham,ngay_dat_lich, ngay_kham, gio_kham, ghi_chu, 
            ho_ten_bn, sdt_bn, dia_chi_bn, ngay_sinh, chuyen_khoa ,trang_thai,gioi_tinh
        } = appointmentData;

        const insertAppointmentQuery = `
            INSERT INTO lich_kham (id_benh_nhan, id_bac_si, id_phong_kham,ngay_dat_lich, ngay_kham, gio_kham, ghi_chu, 
                                   ho_ten_bn, sdt_bn, dia_chi_bn, ngay_sinh, chuyen_khoa,trang_thai,gioi_tinh)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?)
        `;

        db.getConnection((err, connection) => {
            if (err) {
                return callback(err);
            }

            connection.beginTransaction((err) => {
                if (err) {
                    connection.release();
                    return callback(err);
                }

                connection.query(
                    insertAppointmentQuery,
                    [id_benh_nhan, id_bac_si, id_phong_kham,ngay_dat_lich, ngay_kham, gio_kham, ghi_chu, ho_ten_bn, sdt_bn, dia_chi_bn, ngay_sinh, chuyen_khoa,trang_thai,gioi_tinh],
                    (err, result) => {
                        if (err) {
                            return connection.rollback(() => {
                                connection.release();
                                callback(err);
                            });
                        }

                        const appointmentId = result.insertId;

                        // If you have additional appointment details, add them here with similar logic
                        // Otherwise, commit the transaction

                        connection.commit((err) => {
                            if (err) {
                                return connection.rollback(() => {
                                    connection.release();
                                    callback(err);
                                });
                            }

                            connection.release();
                            callback(null, "Appointment scheduled successfully");
                        });
                    }
                );
            });
        });
    }
};

module.exports = Appointment;
