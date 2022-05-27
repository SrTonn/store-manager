const express = require('express');
const {
  getProducts,
  createProducts,
  updateProducts,
} = require('../controllers/productsController');
const { productsValidation } = require('../middlewares');

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProducts);
router.post('/', productsValidation, createProducts);
router.put('/:id', productsValidation, updateProducts);

module.exports = router;
