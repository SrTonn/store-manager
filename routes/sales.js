const express = require('express');
const { getSales, createSales, updateSales } = require('../controllers/salesController');
const { salesValidation } = require('../middlewares');

const router = express.Router();

router.get('/', getSales);
router.get('/:id', getSales);
router.post('/', salesValidation, createSales);
router.put('/:id', salesValidation, updateSales);

module.exports = router;
