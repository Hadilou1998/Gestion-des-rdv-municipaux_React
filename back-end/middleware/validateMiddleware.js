const { check, validationResult } = require("express-validator");

exports.validationAppointment = [
    check("service_id").isInt().withMessage("ServiceId must be a valid integer"),
    check("appointment_date").isISO8601().withMessage("Appointment date must be valid"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];