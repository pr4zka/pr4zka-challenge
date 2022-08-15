const {validationResult} = require('express-validator')

const validatorResult = (req, res, next) => {
    try {
        validationResult(req).throw()
        return next()
    } catch (err) {
        res.status(403)
        res.send(err); // Mandar un array con los errores
    }
}

module.exports = validatorResult;