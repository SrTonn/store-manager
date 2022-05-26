const express = require('express');
const { getSales } = require('../controllers/salesController');

const router = express.Router();

router.get('/', getSales);
router.get('/:id', getSales);

module.exports = router;
