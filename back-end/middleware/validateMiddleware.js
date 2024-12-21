const { check, validationResult } = require("express-validator");

exports.validationAppointment = [
    check("user_id").isInt().withMessage("UserId must be a valid integer"),
    check("service_id").isInt().withMessage("ServiceId must be a valid integer"),
    check("appointmentDate").isISO8601().withMessage("Appointment date must be valid"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];