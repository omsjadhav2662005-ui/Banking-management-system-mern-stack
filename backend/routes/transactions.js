const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { transferMoney, getTransactionHistory } = require('../controllers/transactionController');

router.use(auth);

router.post('/transfer', transferMoney);
router.get('/history/:accountId', getTransactionHistory);

module.exports = router;