const { validationResult, body } = require('express-validator');

const validateForm = [
    body().notEmpty().escape(),
    (req, res, next) => {
        console.log(req.body);
        const errors = validationResult(req);
        console.log(errors);
        if (errors) {
            return res.status(400).json({ errors: errors.array() });
        }
        next(); // Lanjut ke controller jika validasi lolos
    },
];

module.exports = validateForm;