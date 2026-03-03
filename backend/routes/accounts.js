const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getMyAccounts,
  getAccountById,
  deposit
} = require('../controllers/accountController');

router.use(auth);

router.get('/', getMyAccounts);
router.get('/:id', getAccountById);
router.post('/deposit', deposit);

module.exports = router;