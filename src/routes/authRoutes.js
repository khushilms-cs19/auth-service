const router = require('express').Router();
const authController = require('../controllers/authController');

const { validate, schemas, REQ_PARAMTERS } = require('../middleware/validator');

router.post('/register', validate(schemas.user, REQ_PARAMTERS.BODY), authController.createUser);
router.post('/login', validate(schemas.user, REQ_PARAMTERS.BODY), authController.login);
router.post('/validate', validate(schemas.validate, REQ_PARAMTERS.BODY), authController.validateToken);
module.exports = router;
