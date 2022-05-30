const express = require('express');
const { getSales, createSales } = require('../controllers/salesController');
const { salesValidation } = require('../middlewares');

const router = express.Router();

router.get('/', getSales);
router.get('/:id', getSales);
router.post('/', salesValidation, createSales);

module.exports = router;
