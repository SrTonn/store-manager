const express = require('express');
const { getProducts } = require('../controllers/productsController');

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProducts);

module.exports = router;
